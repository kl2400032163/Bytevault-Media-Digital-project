import { Navigate } from "react-router-dom";
import { isAdmin, isLoggedIn } from "../utils/auth";

function UserCartRoute({ children }) {
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    if (isAdmin()) {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default UserCartRoute;