export function getToken() {
    return localStorage.getItem("token");
}

export function getUsername() {
    return localStorage.getItem("username");
}

export function getUserId() {
    return localStorage.getItem("userId");
}

export function getRole() {
    const token = getToken();

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            return payload.role || payload.roles || payload.authorities || null;
        } catch {
            // Fall back to the saved role when an old token cannot be decoded.
        }
    }

    const storedRole = localStorage.getItem("role");

    try {
        return JSON.parse(storedRole);
    } catch {
        return storedRole;
    }
}

export function isLoggedIn() {
    return !!getToken();
}

export function isAdmin() {
    const role = getRole();
    const roles = Array.isArray(role) ? role : String(role || "").split(/[\s,]+/);

    return roles.some((value) =>
        ["ADMIN", "ROLE_ADMIN"].includes(
            String(value).trim().toUpperCase()
        )
    );
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
}