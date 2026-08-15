import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CreatePackage.css";

function CreatePackage() {

    const navigate = useNavigate();

    const [cities, setCities] = useState<string[]>([]);
    const [hotels, setHotels] = useState<string[]>([]);
    const [transportations, setTransportations] = useState<{ type: string; company: string }[]>([]);

    const [destination, setDestination] = useState("");
    const [hotel, setHotel] = useState("");
    const [transportIndex, setTransportIndex] = useState("");
    const [days, setDays] = useState("");

    useEffect(() => {

        const loadOptions = async () => {

            try {

                const response = await fetch("http://localhost:8081/package-options");
                const data = await response.json();

                setCities(data.cities);
                setHotels(data.hotels);
                setTransportations(data.transportations);

            } catch (error) {
                console.error(error);
                alert("Could not load options from the server");
            }
        };

        loadOptions();

    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const selectedTransport = transportations[Number(transportIndex)];

        if (!selectedTransport) {
            alert("Please select a transportation");
            return;
        }

        try {

            const response = await fetch("http://localhost:8081/package", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    destination,
                    hotel,
                    transportation: selectedTransport.type,
                    company: selectedTransport.company,
                    days: Number(days)
                })
            });

            const data = await response.json();

            if (response.ok) {
                alert("Package created successfully! Total cost: " + data.cost);

                setDestination("");
                setHotel("");
                setTransportIndex("");
                setDays("");

                navigate("/AdminHome");
            } else {
                alert(data.message || "Failed to create package");
            }

        } catch (error) {
            console.error(error);
            alert("Could not connect to the server");
        }
    };

    return (
        <div className="create-package-page">

            <div className="package-form-container">

                <div className="package-icon">
                    ✈
                </div>

                <h1>Create Package</h1>

                <p className="package-subtitle">
                    Build a new travel package
                </p>

                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        <label>Destination</label>

                        <select
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        >
                            <option value="">Select destination</option>

                            {cities.map((city) => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Hotel</label>

                        <select
                            value={hotel}
                            onChange={(e) => setHotel(e.target.value)}
                            required
                        >
                            <option value="">Select hotel</option>

                            {hotels.map((hotelName) => (
                                <option key={hotelName} value={hotelName}>{hotelName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Transportation</label>

                        <select
                            value={transportIndex}
                            onChange={(e) => setTransportIndex(e.target.value)}
                            required
                        >
                            <option value="">Select transportation</option>

                            {transportations.map((transport, index) => (
                                <option key={index} value={index}>
                                    {transport.type} ({transport.company})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Number of Days</label>

                        <select
                            value={days}
                            onChange={(e) => setDays(e.target.value)}
                            required
                        >
                            <option value="">Select number of days</option>

                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((day) => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    <p className="cost-note">
                        The total cost is calculated automatically from the hotel rate, number of days and return ticket.
                    </p>

                    <button
                        type="submit"
                        className="create-package-button"
                    >
                        Create Package
                    </button>

                </form>

                <button
                    className="back-button"
                    onClick={() => navigate("/AdminHome")}
                >
                    ← Back
                </button>

            </div>

        </div>
    );
}

export default CreatePackage;