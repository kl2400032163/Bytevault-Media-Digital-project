import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import { clearCart } from "../utils/cart";
import { getDownloadUrl } from "../utils/catalog";

function Payment() {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState(location.state?.products || []);
    const [loading, setLoading] = useState(id !== "cart");
    const [paying, setPaying] = useState(false);
    const [paid, setPaid] = useState(false);
    const [error, setError] = useState("");
    const [form, setForm] = useState({ cardName: "", cardNumber: "", expiry: "", cvv: "" });

    useEffect(() => {
        if (id === "cart") return;

        const loadProduct = async () => {
            try {
                const response = await api.get(`/api/products/${id}`);
                setProducts([response.data]);
            } catch {
                setError("Unable to load the product for payment.");
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const total = products.reduce(
        (sum, product) => sum + Number(product.price || 0),
        0
    );

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setError("User information is missing. Please log in again.");
            return;
        }

        setPaying(true);
        setError("");

        try {
            for (const product of products) {
                await api.post("/api/orders/purchase", {
                    userId: Number(userId),
                    productId: Number(product.productId)
                });
            }

            if (id === "cart") clearCart();
            setPaid(true);
        } catch (err) {
            setError(err.response?.data || "Payment could not be completed.");
        } finally {
            setPaying(false);
        }
    };

    if (loading) return <div className="center">Loading payment...</div>;

    if (!products.length) {
        return <div className="center error">No product selected for payment.</div>;
    }

    return (
        <div className="payment-page">
            <div className="payment-card">
                <span className="section-label">SECURE CHECKOUT</span>
                <h1>{paid ? "Payment successful" : "Complete your payment"}</h1>

                <div className="payment-summary">
                    {products.map((product) => (
                        <div className="summary-row" key={product.productId}>
                            <span>{product.name}</span>
                            <strong>₹{Number(product.price || 0).toFixed(2)}</strong>
                        </div>
                    ))}
                    <div className="summary-row total-row">
                        <span>Total</span>
                        <strong>₹{total.toFixed(2)}</strong>
                    </div>
                </div>

                {!paid ? (
                    <form className="payment-form" onSubmit={handlePayment}>
                        <p className="payment-note">Demo checkout: payment details are used only to validate this form and are never stored.</p>
                        <input name="cardName" value={form.cardName} onChange={handleChange} placeholder="Name on card" required />
                        <input name="cardNumber" value={form.cardNumber} onChange={handleChange} inputMode="numeric" pattern="[0-9 ]{12,19}" placeholder="Card number" required />
                        <div className="payment-fields">
                            <input name="expiry" value={form.expiry} onChange={handleChange} placeholder="MM/YY" required />
                            <input name="cvv" value={form.cvv} onChange={handleChange} inputMode="numeric" pattern="[0-9]{3,4}" placeholder="CVV" required />
                        </div>
                        <button className="primary-btn checkout-btn" type="submit" disabled={paying}>
                            {paying ? "Processing payment..." : `Pay ₹${total.toFixed(2)}`}
                        </button>
                        {error && <p className="error">{error}</p>}
                    </form>
                ) : (
                    <div className="download-panel">
                        <p>Your purchase is complete. Download your products below.</p>
                        {products.map((product) => (
                                <a className="download-link" href={getDownloadUrl(product)} target="_blank" rel="noreferrer" key={product.productId}>
                                Download {product.name}
                            </a>
                        ))}
                        <button className="secondary-btn" onClick={() => navigate("/orders")}>View my orders</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Payment;