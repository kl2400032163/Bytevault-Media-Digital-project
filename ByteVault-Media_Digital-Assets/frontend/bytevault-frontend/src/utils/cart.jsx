const CART_KEY = "bytevault_cart";

function readCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY));
        return Array.isArray(savedCart) ? savedCart : [];
    } catch {
        return [];
    }
}

function notifyCartChanged() {
    window.dispatchEvent(new Event("cart:changed"));
}

export function getCart() {
    return readCart();
}

export function addToCart(product) {
    const cart = readCart();

    if (!cart.some((item) => item.productId === product.productId)) {
        cart.push(product);
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        notifyCartChanged();
        return true;
    }

    return false;
}

export function removeFromCart(productId) {
    const cart = readCart().filter((item) => item.productId !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    notifyCartChanged();
}

export function clearCart() {
    localStorage.removeItem(CART_KEY);
    notifyCartChanged();
}

export function getCartCount() {
    return readCart().length;
}