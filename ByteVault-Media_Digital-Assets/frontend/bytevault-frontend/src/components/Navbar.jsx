import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, isAdmin, logout, getUsername } from "../utils/auth";
import { getCartCount } from "../utils/cart";
import { useEffect, useState } from "react";

function Navbar() {

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(isLoggedIn);
    const [cartCount, setCartCount] = useState(getCartCount);

    useEffect(() => {
        const refreshCart = () => setCartCount(getCartCount());
        const refreshAuth = () => setLoggedIn(isLoggedIn());
        window.addEventListener("cart:changed", refreshCart);
        window.addEventListener("auth:changed", refreshAuth);
        return () => {
            window.removeEventListener("cart:changed", refreshCart);
            window.removeEventListener("auth:changed", refreshAuth);
        };
    }, []);

    const handleLogout = () => {
        logout();
        window.dispatchEvent(new Event("auth:changed"));
        navigate("/login");
    };

    return (
        <nav className="navbar">

            <Link to="/" className="navbar-logo">
                ByteVault<span>Media</span>
            </Link>

            <div className="navbar-links">

                <Link to="/">Home</Link>

                <Link to="/products">Products</Link>

                {loggedIn && !isAdmin() && (
                    <Link to="/cart" className="cart-link">
                        Cart {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                )}

                {loggedIn && (
                    <Link to="/orders">Orders</Link>
                )}

                {loggedIn && isAdmin() && (
                    <Link to="/admin">Admin</Link>
                )}

                {!loggedIn ? (
                    <>
                        <Link to="/login">Login</Link>

                        <Link
                            to="/register"
                            className="navbar-button"
                        >
                            Get Started
                        </Link>
                    </>
                ) : (
                    <>
                        <span className="navbar-user">
                            {getUsername()}
                        </span>

                        <button
                            className="navbar-logout"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>
                )}

            </div>

        </nav>
    );
}

export default Navbar;