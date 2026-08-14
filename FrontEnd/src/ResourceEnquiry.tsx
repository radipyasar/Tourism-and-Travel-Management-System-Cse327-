import { useNavigate } from "react-router-dom";
import "./styles/AddResource.css";

function ResourceEnquiry() {
    const navigate = useNavigate();

    return (
        <div className="resource-page">

            <div className="resource-container">

                <h1>Add New Resource</h1>
                <p className="resource-subtitle">
                    What would you like to add?
                </p>

                <div className="resource-grid">

                    <button
                        className="resource-card hotel-card"
                        onClick={() => navigate("/AddHotel")}
                    >
                        <div className="resource-icon">🏨</div>
                        <h2>Add New Hotel</h2>
                        <p>Add a new hotel to the system</p>
                    </button>

                    <button
                        className="resource-card destination-card"
                        onClick={() => navigate("/AddDestination")}
                    >
                        <div className="resource-icon">📍</div>
                        <h2>Add New Destination</h2>
                        <p>Add a new travel destination</p>
                    </button>

                    <button
                        className="resource-card transport-card"
                        onClick={() => navigate("/AddTransportation")}
                    >
                        <div className="resource-icon">🚗</div>
                        <h2>Add New Transportation</h2>
                        <p>Add a new transportation option</p>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ResourceEnquiry;