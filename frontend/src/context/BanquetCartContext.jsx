'use client';
import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

const initialState = {
    items: [],
    tableCount: 1,
    banquetType: null,
    services: [],
    eventDate: null,
    eventTime: null,
};

const BanquetCartContext = createContext(null);

function banquetCartReducer(state, action) {
    let newState;
    switch (action.type) {
        case 'ADD_ITEM':
            const exists = state.items.find(item => item.id === action.payload.id);
            if (exists) {
                newState = state;
            } else {
                newState = { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
            }
            break;
        case 'ADD_ITEMS':
            const existingIds = new Set(state.items.map(item => item.id));
            const itemsToAdd = action.payload
                .filter(item => !existingIds.has(item.id))
                .map(item => ({ ...item, quantity: 1 }));
            newState = itemsToAdd.length > 0
                ? { ...state, items: [...state.items, ...itemsToAdd] }
                : state;
            break;
        case 'REMOVE_ITEM':
            newState = { ...state, items: state.items.filter(item => item.id !== action.payload) };
            break;
        case 'REMOVE_ITEMS':
            const itemIdsToRemove = new Set(action.payload);
            newState = { ...state, items: state.items.filter(item => !itemIdsToRemove.has(item.id)) };
            break;
        case 'CLEAR_CART':
            newState = { ...initialState };
            break;
        case 'SET_TABLE_COUNT':
            newState = { ...state, tableCount: action.payload };
            break;
        case 'SET_BANQUET_TYPE':
            newState = { ...state, banquetType: action.payload };
            break;
        case 'TOGGLE_SERVICE':
            const serviceExists = state.services.find(s => s.id === action.payload.id);
            if (serviceExists) {
                newState = { ...state, services: state.services.filter(s => s.id !== action.payload.id) };
            } else {
                newState = { ...state, services: [...state.services, action.payload] };
            }
            break;
        case 'SET_EVENT_DATE':
            newState = { ...state, eventDate: action.payload };
            break;
        case 'SET_EVENT_TIME':
            newState = { ...state, eventTime: action.payload };
            break;
        case 'LOAD_STATE': {
            const savedItems = Array.isArray(action.payload?.items) ? action.payload.items : [];
            // Migrate the old, separate combo state into the single custom menu.
            const legacyComboItems = action.payload?.combo?.items?.map(item => ({
                id: item.menu_item_id || `legacy-combo-${action.payload.combo.id}-${item.id}`,
                name: item.menu_item_name || item.item_name,
                price: Number(item.menu_item_price) || 0,
                image_url: item.menu_item_image_url || null,
                quantity: 1,
            })) || [];
            const itemIds = new Set(savedItems.map(item => item.id));
            newState = {
                ...initialState,
                ...action.payload,
                combo: undefined,
                items: [...savedItems, ...legacyComboItems.filter(item => !itemIds.has(item.id))],
            };
            break;
        }
        default:
            newState = state;
    }
    
    if (action.type !== 'LOAD_STATE') {
        try {
            localStorage.setItem('banquetCart', JSON.stringify(newState));
        } catch (error) {
            console.error('Failed to save banquet cart to localStorage:', error);
        }
    }
    
    return newState;
}

export function BanquetCartProvider({ children }) {
    const [state, dispatch] = useReducer(banquetCartReducer, initialState);

    useEffect(() => {
        try {
            const savedState = localStorage.getItem('banquetCart');
            if (savedState) {
                dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
            }
        } catch (error) {
            console.error('Failed to load banquet cart from localStorage:', error);
        }
    }, []);

    const totalItems = state.items.length;
    
    const estimatedTotal = useMemo(() => {
        const menuTotalPerTable = state.items.reduce((total, item) => total + (Number(item.price) || 0), 0);
        const servicesTotal = state.services.reduce((total, service) => total + (Number(service.price) || 0), 0);
        return menuTotalPerTable * (state.tableCount || 1) + servicesTotal;
    }, [state.items, state.services, state.tableCount]);

    const value = {
        state,
        dispatch,
        totalItems,
        estimatedTotal
    };

    return (
        <BanquetCartContext.Provider value={value}>
            {children}
        </BanquetCartContext.Provider>
    );
}

export function useBanquetCart() {
    const context = useContext(BanquetCartContext);
    if (!context) {
        throw new Error('useBanquetCart must be used within a BanquetCartProvider');
    }
    return context;
}
