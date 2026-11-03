import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams
} from "react-router-dom";

import api from "../services/api";
import { isLoggedIn } from "../utils/auth";
import { addToCart } from "../utils/cart";
import {
    getDownloadUrl,
    getProductAccess,
    getProductCategory,
    getProductDetails
} from "../utils/catalog";

function ProductDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [purchasing, setPurchasing] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [cartMessage, setCartMessage] = useState("");
    const [downloadUrl, setDownloadUrl] = useState("");
    const [freePurchaseComplete, setFreePurchaseComplete] = useState(false);

    const handleAddToCart = () => {
        const added = addToCart(product);
        setCartMessage(added ? "Added to your cart." : "This product is already in your cart.");
    };

    useEffect(() => {

        const fetchProduct = async () => {

            try {

                const response = await api.get(
                    `/api/products/${id}`
                );

                setProduct(response.data);

            } catch {

                setError(
                    "Unable to load product."
                );

            } finally {
                setLoading(false);
            }
        };

        fetchProduct();

    }, [id]);

    const handlePurchase = async () => {

        if (!isLoggedIn()) {
            navigate("/login");
            return;
        }

        if (Number(product.price || 0) > 0) {
            navigate(`/payment/${product.productId}`);
            return;
        }

        setPurchasing(true);
        setError("");
        setMessage("");

        try {

            const userId = localStorage.getItem("userId");

            if (!userId) {
                setError(
                    "User information not available. Please login again."
                );
                return;
            }

            const response = await api.post(
                "/api/orders/purchase",
                {
                    userId: Number(userId),
                    productId: Number(id)
                }
            );

            if (
                response.data.purchaseStatus ===
                "SUCCESS"
            ) {

                setMessage("This product is free. Your download is ready.");
                setDownloadUrl(getDownloadUrl(product));
                setFreePurchaseComplete(true);

            }

        } catch (err) {

            setError(
                err.response?.data ||
                "Purchase failed."
            );

        } finally {
            setPurchasing(false);
        }
    };

    if (loading) {
        return (
            <div className="center">
                Loading...
            </div>
        );
    }

    if (!product) {
        return (
            <div className="center error">
                {error || "Product not found"}
            </div>
        );
    }

    const productDetails = getProductDetails(product);
    const isFree = Number(product.price || 0) === 0;

    return (
        <div className="product-details-page">
            <div className="details-hero">
                <div className="details-hero-copy">
                    <span className="details-eyebrow">BYTEVAULT MARKETPLACE / {getProductCategory(product)}</span>
                    <h1>{product.name}</h1>
                    <p className="details-lede">{productDetails.description}</p>
                    <div className="details-meta">
                        <span>{getProductAccess(product)}</span>
                        <span>Instant digital delivery</span>
                        <span>Secure checkout</span>
                    </div>
                </div>
                <div className="details-price-panel">
                    <span className="details-price-label">{isFree ? "ACCESS PRICE" : "LICENSE PRICE"}</span>
                    <strong>{isFree ? "Free" : `₹${Number(product.price).toFixed(2)}`}</strong>
                    <p>{isFree ? "No payment required" : "One-time purchase"}</p>
                    <div className="details-actions">
                        <button className="secondary-btn" onClick={handleAddToCart}>
                            Add to cart
                        </button>
                        <button className="primary-btn" onClick={handlePurchase} disabled={purchasing}>
                            {purchasing ? "Processing..." : isFree ? "Get it free" : "Buy now"}
                        </button>
                    </div>
                </div>
            </div>

            <div className="details-content-grid">
                <section className="details-content-section">
                    <span className="section-label">ABOUT THIS RESOURCE</span>
                    <h2>What you can do with it</h2>
                    <p>{productDetails.description}</p>
                    <div className="use-case-list">
                        {productDetails.uses.map((useCase) => (
                            <div className="use-case" key={useCase}>
                                <span>✓</span>
                                <strong>{useCase}</strong>
                            </div>
                        ))}
                    </div>
                </section>

                <aside className="details-info-card">
                    <span className="section-label">PRODUCT INFORMATION</span>
                    <div className="info-row"><span>Category</span><strong>{getProductCategory(product)}</strong></div>
                    <div className="info-row"><span>Access</span><strong>{getProductAccess(product)}</strong></div>
                    <div className="info-row"><span>Delivery</span><strong>Download link</strong></div>
                    <div className="info-row"><span>Product ID</span><strong>#{product.productId}</strong></div>
                </aside>
            </div>

            <div className="details-notice">
                <span className="notice-icon">↗</span>
                <div>
                    <strong>{isFree ? "Ready to download after free checkout" : "Download access after payment"}</strong>
                    <p>{isFree ? "Confirm your free order and the download link will appear here." : "Complete secure checkout and your download link will be available immediately."}</p>
                </div>
            </div>

            {cartMessage && <p className="success details-feedback">{cartMessage}</p>}
            {message && <p className="success details-feedback">{message}</p>}
            {freePurchaseComplete && downloadUrl && (
                <section className="secure-download-panel" aria-live="polite">
                    <div>
                        <span className="section-label">PURCHASE VERIFIED</span>
                        <h2>Your free download is ready</h2>
                        <p>This link is shown only after your free order was successfully recorded.</p>
                    </div>
                    <a className="download-link details-download" href={downloadUrl} target="_blank" rel="noopener noreferrer">
                        Download {product.name}
                    </a>
                </section>
            )}
            {error && <p className="error details-feedback">{error}</p>}
        </div>
    );
}

export default ProductDetails;