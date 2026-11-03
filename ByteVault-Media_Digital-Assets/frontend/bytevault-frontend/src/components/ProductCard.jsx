import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (
        <div className="product-card">

            <div className="product-type">
                {product.type}
            </div>

            <h3>
                {product.name}
            </h3>

            <p className="price">
                ₹{Number(product.price).toFixed(2)}
            </p>

            <Link
                to={`/products/${product.productId}`}
                className="primary-btn"
            >
                View Details
            </Link>

        </div>
    );
}

export default ProductCard;