import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { addToCart } from "../utils/cart";
import { getProductAccess, getProductCategory } from "../utils/catalog";
import "./Products.css";

function Products() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [category, setCategory] = useState("All");
    const [access, setAccess] = useState("All");
    const [cartMessage, setCartMessage] = useState("");

    useEffect(() => {

        const loadProducts = async () => {

            try {

                const response = await api.get("/api/products");

                console.log("Products:", response.data);

                setProducts(
                    Array.isArray(response.data)
                        ? response.data.filter((product) => product?.productId && product?.name)
                        : []
                );

            } catch (err) {

                console.error(
                    "Product API Error:",
                    err
                );

                if (err.response) {

                    setError(
                        `Server error: ${err.response.status}`
                    );

                } else {

                    setError(
                        "Unable to connect to ByteVault Gateway."
                    );
                }

            } finally {

                setLoading(false);
            }
        };

        loadProducts();

    }, []);

    const categories = ["All", ...new Set(products.map(getProductCategory))];
    const visibleProducts = products.filter((product) => {
        const matchesCategory = category === "All" || getProductCategory(product) === category;
        const matchesAccess = access === "All" || getProductAccess(product) === access;
        return matchesCategory && matchesAccess;
    });

    const handleAddToCart = (product) => {
        const added = addToCart(product);
        setCartMessage(added ? `${product.name} added to your cart.` : "That product is already in your cart.");
        window.setTimeout(() => setCartMessage(""), 2500);
    };


    return (
        <div className="products-page">

            {/* ================= HERO ================= */}

            <section className="products-hero">

                <div className="products-hero-content">

                    <span className="page-badge">
                        BYTEVAULT MARKETPLACE
                    </span>

                    <h1>
                        Discover your next
                        <span>digital asset.</span>
                    </h1>

                    <p className="products-hero-description">
                        Explore software, e-books and other downloadable
                        digital products available through ByteVault Media.
                        Find the right digital asset and get instant access.
                    </p>

                </div>


                <div className="marketplace-stat">

                    <div className="marketplace-stat-icon">
                        ◈
                    </div>

                    <strong>
                        {products.length}
                    </strong>

                    <span>
                        Products Available
                    </span>

                </div>

            </section>


            {/* ================= CONTENT ================= */}

            <section className="products-content">

                <div className="product-section-header">

                    <div>

                        <span className="section-label">
                            AVAILABLE NOW
                        </span>

                        <h2>
                            Featured Digital Assets
                        </h2>

                        <p>
                            Browse our collection of downloadable products.
                        </p>

                    </div>

                </div>

                <div className="catalog-toolbar">
                    <div className="filter-group">
                        <span>Category</span>
                        {categories.map((option) => (
                            <button key={option} className={category === option ? "filter-btn active" : "filter-btn"} onClick={() => setCategory(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                    <div className="filter-group">
                        <span>Access</span>
                        {["All", "Open source", "Paid license"].map((option) => (
                            <button key={option} className={access === option ? "filter-btn active" : "filter-btn"} onClick={() => setAccess(option)}>
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {cartMessage && <div className="cart-toast">{cartMessage}</div>}


                {/* LOADING */}

                {loading && (

                    <div className="products-state">

                        <div className="loader"></div>

                        <p>
                            Loading digital products...
                        </p>

                    </div>

                )}


                {/* ERROR */}

                {!loading && error && (

                    <div className="products-error">

                        <div className="error-icon">
                            !
                        </div>

                        <div>

                            <h3>
                                Products could not be loaded
                            </h3>

                            <p>
                                {error}
                            </p>

                        </div>

                    </div>

                )}


                {/* EMPTY */}

                {!loading &&
                    !error &&
                    products.length === 0 && (

                        <div className="products-empty">

                            <div className="empty-icon">
                                ◈
                            </div>

                            <h2>
                                No products available yet
                            </h2>

                            <p>
                                Digital products added by the administrator
                                will appear here.
                            </p>

                        </div>

                    )}

                {!loading && !error && products.length > 0 && visibleProducts.length === 0 && (
                    <div className="products-empty filter-empty">
                        <h2>No products match these filters</h2>
                        <p>Try another category or access type.</p>
                    </div>
                )}


                {/* PRODUCTS */}

                {!loading &&
                    !error &&
                    visibleProducts.length > 0 && (

                        <div className="products-grid">

                            {visibleProducts.map((product) => (

                                <article
                                    className="product-card"
                                    key={product.productId}
                                >

                                    <div className="product-card-banner">

                                        <div className="product-icon">
                                            {product.type === "EBOOK"
                                                ? "▤"
                                                : "◉"}
                                        </div>

                                        <span className="product-type">
                                            {getProductCategory(product)}
                                        </span>

                                    </div>


                                    <div className="product-card-content">

                                        <h3>
                                            {product.name}
                                        </h3>

                                        <p className="product-description">
                                            {getProductAccess(product)} digital product available for instant delivery.
                                        </p>


                                        <div className="product-card-footer">

                                            <div>

                                                <div className="product-price-label">
                                                    Price
                                                </div>

                                                <div className="product-price">
                                                    ₹{Number(
                                                        product.price
                                                    ).toFixed(2)}
                                                </div>

                                            </div>


                                            <div className="product-actions">
                                                <button className="secondary-btn compact-btn" onClick={() => handleAddToCart(product)}>
                                                    Add to cart
                                                </button>
                                                <Link to={`/products/${product.productId}`} className="product-view-btn">
                                                    View →
                                                </Link>
                                            </div>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

            </section>

        </div>
    );
}

export default Products;