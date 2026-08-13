import { useNavigate } from "react-router-dom";
import "./styles/AdminHome.css";

function AdminHome() {

    const navigate = useNavigate();

    return (
        <div className="admin-home-page">

            <button
                className="create-package"
                onClick={() => navigate("/create-package")}
            >
                <span className="admin-icon">✈</span>
                <span>Create Package</span>
            </button>

            <button
                className="manage-package"
                onClick={() => navigate("/manage-package")}
            >
                <span className="admin-icon">📦</span>
                <span>Manage Package</span>
            </button>

            <button
                className="customer-bookings"
                onClick={() => navigate("/customer-bookings")}
            >
                <span className="admin-icon">📋</span>
                <span>Customer Bookings</span>
            </button>

            <button
                className="add-resource"
                onClick={() => navigate("/add-resource")}
            >
                <span className="admin-icon">＋</span>
                <span>Add New Resource</span>
            </button>

        </div>
    );
}

export default AdminHome;