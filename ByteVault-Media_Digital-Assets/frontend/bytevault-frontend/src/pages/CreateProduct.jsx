import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function CreateProduct() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        type: "EBOOK",
        price: "",
        downloadUrl: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {

            await api.post(
                "/api/products",
                {
                    name: form.name,
                    type: form.type,
                    price: Number(form.price),
                    downloadUrl: form.downloadUrl
                }
            );

            setSuccess(
                "Product created successfully."
            );

            setTimeout(() => {
                navigate("/products");
            }, 1000);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data ||
                "Unable to create product."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-product-page">
            <div className="create-product-shell">
                <div className="create-product-heading">
                    <Link to="/admin" className="back-link">&larr; Back to dashboard</Link>
                    <span className="section-label">PRODUCT CATALOG</span>
                    <h1>Add a digital product</h1>
                    <p>Publish a new resource to the ByteVault marketplace with the details customers need to access it.</p>
                </div>

                <div className="create-product-layout">
                    <form className="product-form-card" onSubmit={handleSubmit}>
                        <div className="form-card-heading">
                            <div>
                                <span className="form-step">01</span>
                                <h2>Product details</h2>
                            </div>
                            <span className="required-note">* Required</span>
                        </div>

                        <div className="product-form-fields">
                            <div className="product-form-field product-form-field-wide">
                                <label htmlFor="product-name">Product name <span>*</span></label>
                                <input
                                    id="product-name"
                                    type="text"
                                    name="name"
                                    placeholder="e.g. The Complete JavaScript Guide"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                <small>Use a clear title that helps customers find this product.</small>
                            </div>

                            <div className="product-form-field">
                                <label htmlFor="product-type">Product type <span>*</span></label>
                                <select id="product-type" name="type" value={form.type} onChange={handleChange}>
                                    <option value="EBOOK">E-Book</option>
                                    <option value="SOFTWARE">Software</option>
                                    <option value="TOOL">Development tool</option>
                                    <option value="COURSE">Course</option>
                                    <option value="DOCUMENT">Document</option>
                                </select>
                            </div>

                            <div className="product-form-field">
                                <label htmlFor="product-price">Price <span>*</span></label>
                                <div className="input-with-prefix">
                                    <span>₹</span>
                                    <input
                                        id="product-price"
                                        type="number"
                                        name="price"
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        value={form.price}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <small>Enter 0 for a free product.</small>
                            </div>

                            <div className="product-form-field product-form-field-wide">
                                <label htmlFor="product-url">Download URL <span>*</span></label>
                                <input
                                    id="product-url"
                                    type="url"
                                    name="downloadUrl"
                                    placeholder="https://example.com/download"
                                    value={form.downloadUrl}
                                    onChange={handleChange}
                                    required
                                />
                                <small>Customers will use this link after a successful purchase.</small>
                            </div>
                        </div>

                        {success && <p className="success form-feedback">{success}</p>}
                        {error && <p className="error form-feedback">{error}</p>}

                        <div className="product-form-actions">
                            <Link to="/admin" className="secondary-btn">Cancel</Link>
                            <button className="primary-btn" type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Create product"}
                            </button>
                        </div>
                    </form>

                    <aside className="create-product-aside">
                        <div className="aside-mark">+</div>
                        <span className="section-label">PUBLISH CHECKLIST</span>
                        <h2>Ready for your next release?</h2>
                        <p>Make sure the product is easy to understand and the download link is accessible before publishing.</p>
                        <ul>
                            <li><span>01</span> Use a recognizable product name</li>
                            <li><span>02</span> Choose the right category</li>
                            <li><span>03</span> Test the download link</li>
                        </ul>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;