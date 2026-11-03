import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", type: "EBOOK", price: "", downloadUrl: "" });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await api.get(`/api/products/${id}`);
                setForm({
                    name: response.data.name || "",
                    type: response.data.type || "EBOOK",
                    price: response.data.price ?? "",
                    downloadUrl: response.data.downloadUrl || ""
                });
            } catch {
                setError("Unable to load this product.");
            } finally {
                setLoading(false);
            }
        };
        loadProduct();
    }, [id]);

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            await api.put(`/api/products/${id}`, {
                ...form,
                price: Number(form.price)
            });
            navigate("/admin");
        } catch (err) {
            setError(err.response?.data || "Unable to update product.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="center">Loading product...</div>;

    return (
        <div className="auth-page">
            <form className="auth-card" onSubmit={handleSubmit}>
                <span className="section-label">ADMIN ONLY</span>
                <h2>Edit product</h2>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Product name" required />
                <select name="type" value={form.type} onChange={handleChange}>
                    <option value="EBOOK">E-book</option>
                    <option value="SOFTWARE">Software</option>
                    <option value="TOOL">Development tool</option>
                    <option value="COURSE">Course</option>
                    <option value="DOCUMENT">Document</option>
                </select>
                <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="Price" required />
                <input name="downloadUrl" type="url" value={form.downloadUrl} onChange={handleChange} placeholder="Download URL" required />
                <button className="primary-btn" type="submit" disabled={saving}>
                    {saving ? "Saving..." : "Save changes"}
                </button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}

export default EditProduct;