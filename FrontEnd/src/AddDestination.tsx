import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AddDestination.css";

function AddDestination() {

    const navigate = useNavigate();

    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8081/destination",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        city,
                        country,
                        description
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Destination added successfully!");

                setCity("");
                setCountry("");
                setDescription("");

                navigate("/ResourceEnquiry");

            } else {

                alert(data.message || "Failed to add destination");

            }

        } catch (error) {

            console.error(error);
            alert("Could not connect to the server");

        }
    };

    return (
        <div className="add-destination-page">

            <div className="destination-form-container">

                <div className="destination-icon">
                    📍
                </div>

                <h1>Add Destination</h1>

                <p className="destination-subtitle">
                    Enter the details of the new destination
                </p>

                <form onSubmit={handleSubmit}>

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
                        <label>Country</label>

                        <input
                            type="text"
                            placeholder="Enter country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Description</label>

                        <textarea
                            placeholder="Write a short description of this place"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="add-destination-button"
                    >
                        Add Destination
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

export default AddDestination;