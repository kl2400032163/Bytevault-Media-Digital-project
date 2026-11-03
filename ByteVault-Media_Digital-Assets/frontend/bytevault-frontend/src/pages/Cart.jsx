import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { clearCart, getCart, removeFromCart } from "../utils/cart";
import { isLoggedIn } from "../utils/auth";

function Cart() {
    const navigate = useNavigate();
    const [items, setItems] = useState(getCart);
    const [error, setError] = useState("");
    const [purchasing, setPurchasing] = useState(false);

    useEffect(() => {
        const refreshCart = () => setItems(getCart());
        window.addEventListener("cart:changed", refreshCart);
        return () => window.removeEventListener("cart:changed", refreshCart);
    }, []);

    const total = items.reduce(
        (sum, product) => sum + Number(product.price || 0),
        0
    );

    const handleCheckout = async () => {
        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }

        const userId = localStorage.getItem("userId");
        if (!userId) {
            setError("User information is missing. Please log in again.");
            return;
        }

        const freeItems = items.filter((product) => Number(product.price || 0) === 0);
        const paidItems = items.filter((product) => Number(product.price || 0) > 0);

        if (paidItems.length > 0) {
            navigate("/payment/cart", { state: { products: items } });
            return;
        }

        setPurchasing(true);
        setError("");

        try {
            for (const product of freeItems) {
                await api.post("/api/orders/purchase", {
                    userId: Number(userId),
                    productId: Number(product.productId)
                });
            }

            clearCart();
            navigate("/orders");
        } catch (err) {
            setError(err.response?.data || "Some items could not be purchased.");
        } finally {
            setPurchasing(false);
        }
    };

    return (
        <div className="page cart-page">
            <div className="page-heading-row">
                <div>
                    <span className="section-label">YOUR COLLECTION</span>
                    <h1>Shopping cart</h1>
                    <p>Keep your digital tools together until you are ready to buy.</p>
                </div>
                <button className="secondary-btn" onClick={() => navigate("/products")}>
                    Continue browsing
                </button>
            </div>

            {items.length === 0 ? (
                <div className="empty-state">
                    <h2>Your cart is empty</h2>
                    <p>Add an ebook, open-source tool, or paid product from the marketplace.</p>
                    <button className="primary-btn" onClick={() => navigate("/products")}>
                        Explore products
                    </button>
                </div>
            ) : (
                <div className="cart-layout">
                    <div className="cart-items">
                        {items.map((product) => (
                            <article className="cart-item" key={product.productId}>
                                <div>
                                    <span className="product-type">{product.type || "DIGITAL"}</span>
                                    <h2>{product.name || "Untitled product"}</h2>
                                    <p>{Number(product.price) === 0 ? "Free and open source" : "Paid license"}</p>
                                </div>
                                <div className="cart-item-actions">
                                    <strong>₹{Number(product.price || 0).toFixed(2)}</strong>
                                    <button className="text-btn" onClick={() => removeFromCart(product.productId)}>
                                        Remove
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>

                    <aside className="cart-summary">
                        <span className="section-label">ORDER SUMMARY</span>
                        <div className="summary-row"><span>Items</span><strong>{items.length}</strong></div>
                        <div className="summary-row total-row"><span>Total</span><strong>₹{total.toFixed(2)}</strong></div>
                        <button className="primary-btn checkout-btn" onClick={handleCheckout} disabled={purchasing}>
                            {purchasing ? "Processing..." : "Buy now"}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </aside>
                </div>
            )}
        </div>
    );
}

export default Cart;