import { useNavigate } from "react-router-dom";
import "./styles/Enquiry.css";

function LoginEnquiry() {

    const navigate = useNavigate();

    return (
        <div className="enquiry-page">

            <div className="enquiry-card">

                <h1>Travel Planner App</h1>

                <p>Please select your login method</p>

                <div className="enquiry-buttons">

                    <button
                        className="customer-login"
                        onClick={() => navigate("/Login")}
                    >
                        Email Login
                    </button>

                    <button
                        className="admin-login"
                        onClick={() => navigate("/PhoneLogin")}
                    >
                        Phone Login
                    </button>

                </div>

            </div>

        </div>
    );
}

export default LoginEnquiry;