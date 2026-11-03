import { Navigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../utils/auth";

function AdminRoute({ children }) {

    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    if (!isAdmin()) {
        return <Navigate to="/products" replace />;
    }

    return children;
}

export default AdminRoute;