import { useNavigate } from "react-router-dom";
import "./styles/Enquiry.css";

function Enquiry() {

    const navigate = useNavigate();

    return (
        <div className="enquiry-page">

            <div className="enquiry-card">

                <h1>Travel Planner App</h1>

                <p>Please select your login type</p>

                <div className="enquiry-buttons">

                    <button
                        className="customer-login"
                        onClick={() => navigate("/login")}
                    >
                        Customer Login
                    </button>

                    <button
                        className="admin-login"
                        onClick={() => navigate("/AdminLogin")}
                    >
                        Admin Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default Enquiry;