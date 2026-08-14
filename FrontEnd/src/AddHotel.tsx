import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AddHotel.css";

function AddHotel() {

    const navigate = useNavigate();

    const [hotelName, setHotelName] = useState("");
    const [city, setCity] = useState("");
    const [costPerNight, setCostPerNight] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            const response = await fetch("http://localhost:8081/hotel", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    hotelName,
                    city,
                    costPerNight
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Hotel added successfully!");

                // Clear the form
                setHotelName("");
                setCity("");
                setCostPerNight("");

                // Go back to Add Resource page
                navigate("/ResourceEnquiry");
            } else {
                alert(data.message || "Failed to add hotel");
            }

        } catch (error) {
            console.error(error);
            alert("Could not connect to the server");
        }
    };

    return (
        <div className="add-hotel-page">

            <div className="hotel-form-container">

                <div className="hotel-icon">
                    🏨
                </div>

                <h1>Add New Hotel</h1>

                <p className="hotel-subtitle">
                    Enter the details of the new hotel
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Hotel Name</label>

                        <input
                            type="text"
                            placeholder="Enter hotel name"
                            value={hotelName}
                            onChange={(e) => setHotelName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>City</label>

                        <input
                            type="text"
                            placeholder="Enter city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Cost Per Night</label>

                        <input
                            type="number"
                            placeholder="Enter cost per night"
                            value={costPerNight}
                            onChange={(e) => setCostPerNight(e.target.value)}
                            min="0"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="add-hotel-button"
                    >
                        Add Hotel
                    </button>

                </form>

                <button
                    className="back-button"
                    onClick={() => navigate("/ResourceEnquiry")}
                >
                    ← Back
                </button>

            </div>

        </div>
    );
}

export default AddHotel;