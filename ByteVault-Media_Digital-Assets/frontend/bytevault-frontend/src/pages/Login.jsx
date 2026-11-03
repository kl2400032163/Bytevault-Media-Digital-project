import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");
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
        setLoading(true);

        try {

            const response = await api.post(
                "/api/users/login",
                form
            );

            const token = response.data;

            localStorage.setItem("token", token);

            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            localStorage.setItem(
                "username",
                payload.sub
            );

            if (payload.userId) {
                localStorage.setItem(
                    "userId",
                    String(payload.userId)
                );
            }

            const role = payload.role || payload.roles || payload.authorities || "USER";
            localStorage.setItem(
                "role",
                typeof role === "string" ? role : JSON.stringify(role)
            );

            window.dispatchEvent(new Event("auth:changed"));

            navigate("/");

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data ||
                "Invalid username or password."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-screen">

            <div className="auth-showcase">

                <div className="auth-logo">
                    ByteVault<span>Media</span>
                </div>

                <div className="showcase-content">

                    <span>WELCOME BACK</span>

                    <h1>
                        Your digital
                        <br />
                        world awaits.
                    </h1>

                    <p>
                        Sign in to explore digital products,
                        manage your purchases and access your
                        ByteVault marketplace account.
                    </p>

                    <div className="showcase-points">
                        <div>✓ Secure JWT Authentication</div>
                        <div>✓ Instant Digital Delivery</div>
                        <div>✓ Centralized Order Management</div>
                    </div>

                </div>

            </div>


            <div className="auth-panel">

                <div className="auth-form-box">

                    <h2>Sign in</h2>

                    <p className="auth-subtitle">
                        Enter your account details to continue.
                    </p>

                    {error && (
                        <div className="auth-error">
                            {error}
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
                                placeholder="Enter your username"
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
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In →"}
                        </button>

                    </form>

                    <div className="auth-switch">
                        Don't have an account?

                        <Link to="/register">
                            Create one
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;