import { Link } from "react-router-dom";

function NotFound() {

    return (
        <div className="center">

            <h1>404</h1>

            <p>
                Page not found.
            </p>

            <Link
                to="/"
                className="primary-btn"
            >
                Go Home
            </Link>

        </div>
    );
}

export default NotFound;