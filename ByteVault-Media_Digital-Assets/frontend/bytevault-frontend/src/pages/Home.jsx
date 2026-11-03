import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-page">

            {/* HERO */}
            <section className="hero-section">
                <div className="hero-content">

                    <div className="hero-badge">
                        DIGITAL ASSETS • SECURE DELIVERY • MICROSERVICES
                    </div>

                    <h1>
                        Your Digital Assets.
                        <span> Delivered Instantly.</span>
                    </h1>

                    <p>
                        ByteVault Media is a secure digital marketplace for
                        discovering, purchasing and accessing downloadable
                        digital products such as e-books, software and other
                        digital assets.
                    </p>

                    <div className="hero-buttons">
                        <Link to="/products" className="primary-btn">
                            Explore Products
                        </Link>

                        <Link to="/register" className="secondary-btn">
                            Create Account
                        </Link>
                    </div>

                </div>

                <div className="hero-visual">
                    <div className="vault-card">

                        <div className="vault-icon">
                            🔐
                        </div>

                        <h3>ByteVault</h3>

                        <p>Digital Asset Marketplace</p>

                        <div className="vault-status">
                            <span></span>
                            Secure Delivery Active
                        </div>

                    </div>
                </div>
            </section>


            {/* ABOUT */}
            <section className="about-section">

                <div className="section-heading">
                    <span>ABOUT BYTEVAULT</span>
                    <h2>A modern marketplace for digital assets</h2>
                    <p>
                        ByteVault provides a centralized platform where users
                        can browse digital products, securely purchase them
                        and access their purchased assets.
                    </p>
                </div>

                <div className="about-grid">

                    <div className="about-card">
                        <div className="about-number">01</div>
                        <h3>Discover</h3>
                        <p>
                            Browse a collection of downloadable digital
                            products from a single marketplace.
                        </p>
                    </div>

                    <div className="about-card">
                        <div className="about-number">02</div>
                        <h3>Purchase</h3>
                        <p>
                            Authenticate securely and purchase the digital
                            assets you need.
                        </p>
                    </div>

                    <div className="about-card">
                        <div className="about-number">03</div>
                        <h3>Access</h3>
                        <p>
                            Purchased assets can be delivered digitally
                            without physical inventory or shipping.
                        </p>
                    </div>

                </div>

            </section>


            {/* FEATURES */}
            <section className="features-section">

                <div className="section-heading">
                    <span>CORE FEATURES</span>
                    <h2>Everything needed for digital delivery</h2>
                </div>

                <div className="feature-grid">

                    <div className="feature-card">
                        <div className="feature-icon">🔐</div>
                        <h3>JWT Authentication</h3>
                        <p>
                            Secure authentication using JSON Web Tokens
                            protects user and administrative operations.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">⚡</div>
                        <h3>Instant Delivery</h3>
                        <p>
                            Digital products can be delivered immediately
                            after a successful purchase.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🛒</div>
                        <h3>Digital Marketplace</h3>
                        <p>
                            Users can browse products and purchase digital
                            assets through a centralized platform.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">🔎</div>
                        <h3>Product Discovery</h3>
                        <p>
                            Explore available digital products with their
                            type, price and download information.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">📦</div>
                        <h3>Order Management</h3>
                        <p>
                            Users can view their purchase history and order
                            information.
                        </p>
                    </div>

                    <div className="feature-card">
                        <div className="feature-icon">⚙️</div>
                        <h3>Microservices Architecture</h3>
                        <p>
                            Independent services improve modularity,
                            maintainability and scalability.
                        </p>
                    </div>

                </div>

            </section>


            {/* ADVANTAGES */}
            <section className="advantages-section">

                <div className="advantages-content">

                    <div className="section-heading left">
                        <span>WHY BYTEVAULT?</span>
                        <h2>Built for a digital-first marketplace</h2>
                    </div>

                    <div className="advantage-list">

                        <div className="advantage-item">
                            <div>✓</div>
                            <section>
                                <h3>No Physical Inventory</h3>
                                <p>
                                    Digital products are delivered online,
                                    eliminating physical storage and shipping.
                                </p>
                            </section>
                        </div>

                        <div className="advantage-item">
                            <div>✓</div>
                            <section>
                                <h3>Fast Digital Delivery</h3>
                                <p>
                                    Customers can access digital assets
                                    without waiting for physical delivery.
                                </p>
                            </section>
                        </div>

                        <div className="advantage-item">
                            <div>✓</div>
                            <section>
                                <h3>Independent Services</h3>
                                <p>
                                    Product, order and user responsibilities
                                    are separated into dedicated services.
                                </p>
                            </section>
                        </div>

                        <div className="advantage-item">
                            <div>✓</div>
                            <section>
                                <h3>Scalable Architecture</h3>
                                <p>
                                    Service discovery and API Gateway support
                                    communication between independent services.
                                </p>
                            </section>
                        </div>

                    </div>

                </div>

            </section>


            {/* ARCHITECTURE */}
            <section className="architecture-section">

                <div className="section-heading">
                    <span>APPLICATION ARCHITECTURE</span>
                    <h2>Designed using microservices</h2>
                </div>

                <div className="architecture-flow">

                    <div className="architecture-box frontend">
                        React Frontend
                        <small>Port 5173</small>
                    </div>

                    <div className="flow-arrow">→</div>

                    <div className="architecture-box gateway">
                        API Gateway
                        <small>Port 8004</small>
                    </div>

                    <div className="flow-arrow">→</div>

                    <div className="services-box">

                        <div>
                            <strong>User Service</strong>
                            <small>8001</small>
                        </div>

                        <div>
                            <strong>Product Service</strong>
                            <small>8002</small>
                        </div>

                        <div>
                            <strong>Order Service</strong>
                            <small>8003</small>
                        </div>

                    </div>

                </div>

            </section>


            {/* CTA */}
            <section className="cta-section">

                <h2>Ready to explore digital assets?</h2>

                <p>
                    Browse the ByteVault marketplace and discover your
                    next digital product.
                </p>

                <Link to="/products" className="primary-btn">
                    Browse Products
                </Link>

            </section>

        </div>
    );
}

export default Home;