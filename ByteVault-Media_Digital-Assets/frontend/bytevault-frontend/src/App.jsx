import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import CreateProduct from "./pages/CreateProduct";
import Cart from "./pages/Cart";
import EditProduct from "./pages/EditProduct";
import UserCartRoute from "./components/UserCartRoute";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

function App() {

    return (
        <BrowserRouter>

            <Navbar />

            <main>

                <Routes>

                    {/* Public */}
                    <Route
                        path="/"
                        element={<Home />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />

                    <Route
                        path="/products"
                        element={<Products />}
                    />

                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />

                    <Route
                        path="/cart"
                        element={
                            <UserCartRoute>
                                <Cart />
                            </UserCartRoute>
                        }
                    />

                    <Route
                        path="/payment/:id"
                        element={
                            <ProtectedRoute>
                                <Payment />
                            </ProtectedRoute>
                        }
                    />

                    {/* Protected */}
                    <Route
                        path="/orders"
                        element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }
                    />

                    {/* Admin */}
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <AdminDashboard />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/admin/products/create"
                        element={
                            <AdminRoute>
                                <CreateProduct />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="/admin/products/:id/edit"
                        element={
                            <AdminRoute>
                                <EditProduct />
                            </AdminRoute>
                        }
                    />

                    <Route
                        path="*"
                        element={<NotFound />}
                    />

                </Routes>

            </main>

        </BrowserRouter>
    );
}

export default App;