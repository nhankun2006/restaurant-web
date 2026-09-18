'use client';
import { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

const initialState = {
    items: [],
    combo: null,
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
        case 'REMOVE_ITEM':
            newState = { ...state, items: state.items.filter(item => item.id !== action.payload) };
            break;
        case 'SET_COMBO':
            newState = { ...state, combo: action.payload };
            break;
        case 'CLEAR_COMBO':
            newState = { ...state, combo: null };
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
        case 'LOAD_STATE':
            newState = { ...state, ...action.payload };
            break;
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

    const totalItems = state.items.length + (state.combo?.items?.length || 0);
    
    const estimatedTotal = useMemo(() => {
        let total = 0;
        state.items.forEach(item => {
            total += Number(item.price) || 0;
        });
        if (state.combo) {
            total += Number(state.combo.price) || 0;
        }
        return total * (state.tableCount || 1);
    }, [state.items, state.combo, state.tableCount]);

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
