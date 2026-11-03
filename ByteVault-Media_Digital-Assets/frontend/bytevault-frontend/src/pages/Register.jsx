import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
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

            await api.post("/api/users/register", {
                ...form,
                role: "USER"
            });

            setSuccess(
                "Account created successfully. Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1200);

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data ||
                "Registration failed. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-screen">

            <div className="auth-showcase register-showcase">

                <div className="auth-logo">
                    ByteVault<span>Media</span>
                </div>

                <div className="showcase-content">

                    <span>JOIN BYTEVAULT</span>

                    <h1>
                        One account.
                        <br />
                        Endless possibilities.
                    </h1>

                    <p>
                        Create your free account and start exploring
                        a modern marketplace for digital products.
                    </p>

                    <div className="showcase-points">
                        <div>✓ Browse Digital Products</div>
                        <div>✓ Secure Purchases</div>
                        <div>✓ Track Your Orders</div>
                    </div>

                </div>

            </div>


            <div className="auth-panel">

                <div className="auth-form-box">

                    <h2>Create account</h2>

                    <p className="auth-subtitle">
                        Join ByteVault Media today.
                    </p>

                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="auth-success">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Username</label>

                            <input
                                type="text"
                                name="username"
                                value={form.username}
                                onChange={handleChange}
                                placeholder="Choose a username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Email</label>

                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>

                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account →"}
                        </button>

                    </form>

                    <div className="auth-switch">
                        Already have an account?

                        <Link to="/login">
                            Sign in
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;