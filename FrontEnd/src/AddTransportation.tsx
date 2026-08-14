import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AddTransportation.css";

function AddTransportation() {

    const navigate = useNavigate();

    const [transportationType, setTransportationType] = useState("");
    const [company, setCompany] = useState("");
    const [ticketCost, setTicketCost] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            const response = await fetch(
                "http://localhost:8081/transportation",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        transportationType,
                        company,
                        ticketCost
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Transportation added successfully!");

                setTransportationType("");
                setCompany("");
                setTicketCost("");

                navigate("/ResourceEnquiry");

            } else {

                alert(
                    data.message ||
                    "Failed to add transportation"
                );

            }

        } catch (error) {

            console.error(error);

            alert("Could not connect to the server");

        }
    };

    return (
        <div className="add-transportation-page">

            <div className="transportation-form-container">

                <div className="transportation-icon">
                    🚗
                </div>

                <h1>Add Transportation</h1>

                <p className="transportation-subtitle">
                    Enter the details of the transportation
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Transportation Type</label>

                        <input
                            type="text"
                            placeholder="e.g. Bus, Train, Flight"
                            value={transportationType}
                            onChange={(e) =>
                                setTransportationType(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Company</label>

                        <input
                            type="text"
                            placeholder="Enter company name"
                            value={company}
                            onChange={(e) =>
                                setCompany(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Ticket Cost</label>

                        <input
                            type="number"
                            placeholder="Enter ticket cost"
                            value={ticketCost}
                            onChange={(e) =>
                                setTicketCost(e.target.value)
                            }
                            min="0"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="add-transportation-button"
                    >
                        Add Transportation
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

export default AddTransportation;