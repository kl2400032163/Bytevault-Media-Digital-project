import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { getProductAccess, getProductCategory } from "../utils/catalog";

const starterProducts = [
    { name: "The Linux Command Line", type: "EBOOK", price: 0, downloadUrl: "https://linuxcommand.org/tlcl.php" },
    { name: "Pro Git", type: "EBOOK", price: 0, downloadUrl: "https://git-scm.com/book/en/v2" },
    { name: "Python Crash Course", type: "EBOOK", price: 29.99, downloadUrl: "https://nostarch.com/python-crash-course-3rd-edition" },
    { name: "Visual Studio Code", type: "TOOL", price: 0, downloadUrl: "https://code.visualstudio.com/" },
    { name: "Docker Desktop", type: "SOFTWARE", price: 0, downloadUrl: "https://www.docker.com/products/docker-desktop/" },
    { name: "JetBrains All Products Pack", type: "SOFTWARE", price: 74.90, downloadUrl: "https://www.jetbrains.com/store/" }
];

function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [working, setWorking] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const loadProducts = async () => {
        try {
            const response = await api.get("/api/products");
            setProducts(Array.isArray(response.data) ? response.data.filter((product) => product?.productId && product?.name) : []);
        } catch {
            setError("Unable to load products.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadInitialProducts = async () => {
            try {
                const response = await api.get("/api/products");
                setProducts(Array.isArray(response.data) ? response.data.filter((product) => product?.productId && product?.name) : []);
            } catch {
                setError("Unable to load products.");
            } finally {
                setLoading(false);
            }
        };

        loadInitialProducts();

        const loadOrders = async () => {
            try {
                const response = await api.get("/api/orders/admin");
                setOrders(Array.isArray(response.data) ? response.data : []);
            } catch {
                setError("Unable to load orders.");
            }
        };

        loadOrders();
    }, []);

    const addStarterCatalog = async () => {
        setWorking(true);
        setError("");
        try {
            for (const product of starterProducts) await api.post("/api/products", product);
            setMessage("Starter ebook and software catalog added.");
            await loadProducts();
        } catch (err) {
            setError(err.response?.data || "Unable to add starter catalog.");
        } finally {
            setWorking(false);
        }
    };

    const deleteProduct = async (productId) => {
        if (!window.confirm("Delete this product?")) return;
        setError("");
        try {
            await api.delete(`/api/products/${productId}`);
            setProducts((current) => current.filter((product) => product.productId !== productId));
        } catch (err) {
            setError(err.response?.data || "Unable to delete product.");
        }
    };

    return (
        <div className="page admin-page">
            <div className="page-heading-row">
                <div>
                    <span className="section-label">CONTROL CENTER</span>
                    <h1>Admin dashboard</h1>
                    <p>Only administrators can create, edit, or remove marketplace products.</p>
                </div>
                <div className="admin-actions">
                    <Link to="/admin/products/create" className="primary-btn">Add product</Link>
                    <button className="secondary-btn" onClick={addStarterCatalog} disabled={working}>
                        {working ? "Adding..." : "Add starter catalog"}
                    </button>
                </div>
            </div>

            {message && <p className="success">{message}</p>}
            {error && <p className="error">{error}</p>}

            <section className="admin-product-list">
                <div className="admin-list-heading"><h2>Managed products</h2><span>{products.length} listed</span></div>
                {loading && <p>Loading products...</p>}
                {!loading && products.length === 0 && <p className="empty-state">No products yet. Add one or load the starter catalog.</p>}
                {products.map((product) => (
                    <article className="admin-product-row" key={product.productId}>
                        <div>
                            <span className="product-type">{getProductCategory(product)}</span>
                            <h3>{product.name}</h3>
                            <p>{getProductAccess(product)} · ₹{Number(product.price || 0).toFixed(2)}</p>
                        </div>
                        <div className="admin-row-actions">
                            <Link className="secondary-btn compact-btn" to={`/admin/products/${product.productId}/edit`}>Edit</Link>
                            <button className="danger-btn" onClick={() => deleteProduct(product.productId)}>Delete</button>
                        </div>
                    </article>
                ))}
            </section>

            <section className="admin-product-list admin-orders-list">
                <div className="admin-list-heading"><h2>User orders</h2><span>{orders.length} total</span></div>
                {orders.length === 0 && <p className="empty-state">No user orders have been placed yet.</p>}
                {orders.map((order) => (
                    <article className="admin-product-row" key={order.orderId}>
                        <div>
                            <span className="product-type">ORDER #{order.orderId}</span>
                            <h3>User #{order.userId} · Product #{order.productId}</h3>
                            <p>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "Date unavailable"}</p>
                        </div>
                        <strong className={order.purchaseStatus === "SUCCESS" ? "order-success" : "order-status"}>
                            {order.purchaseStatus}
                        </strong>
                    </article>
                ))}
            </section>
        </div>
    );
}

export default AdminDashboard;