import { useEffect, useState } from "react";
import api from "../services/api";
import { getDownloadUrl } from "../utils/catalog";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadOrders = async () => {

            try {

                const userId =
                    localStorage.getItem("userId");

                if (!userId) {
                    setError(
                        "User information not available."
                    );
                    return;
                }

                const response = await api.get(
                    `/api/orders/user/${userId}`
                );

                const orderList = Array.isArray(response.data) ? response.data : [];
                const ordersWithProducts = await Promise.all(
                    orderList.map(async (order) => {
                        try {
                            const productResponse = await api.get(
                                `/api/products/${order.productId}`
                            );
                            return { ...order, product: productResponse.data };
                        } catch {
                            return { ...order, product: null };
                        }
                    })
                );

                setOrders(ordersWithProducts);

            } catch (err) {

                console.error(err);

                setError(
                    "Unable to load order history."
                );

            } finally {
                setLoading(false);
            }
        };

        loadOrders();

    }, []);

    if (loading) {
        return (
            <div className="center">
                Loading orders...
            </div>
        );
    }

    return (
        <div className="page">

            <h1>My Orders</h1>

            {error && (
                <p className="error">
                    {error}
                </p>
            )}

            {!error && orders.length === 0 && (
                <div className="empty-state">
                    You haven't purchased anything yet.
                </div>
            )}

            <div className="orders-list">

                {orders.map((order) => (

                    <div
                        className="order-card"
                        key={order.orderId}
                    >

                        <h3>
                            Order #{order.orderId}
                        </h3>

                        <p>
                            Product ID:
                            {" "}
                            {order.productId}
                        </p>

                        <p>
                            Status:
                            {" "}
                            <strong>
                                {order.purchaseStatus}
                            </strong>
                        </p>

                        <p>
                            Purchased:
                            {" "}
                            {new Date(
                                order.createdAt
                            ).toLocaleString()}
                        </p>

                        {order.purchaseStatus === "SUCCESS" && order.product && (
                            <a
                                className="download-link"
                                href={getDownloadUrl(order.product)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Download {order.product.name}
                            </a>
                        )}

                    </div>

                ))}

            </div>

        </div>
    );
}

export default Orders;