export const DEFAULT_DISH_IMAGE = '/images/dish-placeholder.svg';

/**
 * Returns the dish's image URL if configured in database,
 * otherwise returns the brand dish placeholder image.
 *
 * @param {Object} dish
 * @returns {string}
 */
export function getDishImage(dish) {
    return dish?.image_url || dish?.menu_item_image_url || DEFAULT_DISH_IMAGE;
}

/**
 * Formats a number or numeric string to Vietnamese Dong currency format (e.g. 150.000₫).
 *
 * @param {number|string} amount
 * @returns {string}
 */
export function formatCurrency(amount) {
    const num = Number(amount);
    if (isNaN(num) || num <= 0) return '0₫';
    return new Intl.NumberFormat('vi-VN').format(num) + '₫';
}
