import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/BookPackage.css";

function BookPackage() {

    const navigate = useNavigate();

    const [packages, setPackages] = useState<any[]>([]);

    useEffect(() => {

        const loadPackages = async () => {

            try {

                const response = await fetch("http://localhost:8081/packages");
                const data = await response.json();

                setPackages(data);

            } catch (error) {
                console.error(error);
                alert("Could not load packages from the server");
            }
        };

        loadPackages();

    }, []);

    const handleProceed = (id: number, cost: number) => {
        localStorage.setItem("package_id", String(id));
        localStorage.setItem("Package_cost", String(cost))
        navigate("/BookingFinalize");
    };

    return (
        <div className="packages-page">

            <div className="packages-header">
                <h1 className="packages-heading">Travel Packages</h1>
                <p className="packages-subtext">Choose a package to begin your booking</p>
            </div>

            <div className="packages-grid">

                {packages.map((travelPackage) => (

                    <div className="package-card" key={travelPackage.id}>

                        <h2 className="package-destination">{travelPackage.destination}</h2>

                        <div className="package-row">
                            <span>Hotel</span>
                            <strong>{travelPackage.hotel}</strong>
                        </div>

                        <div className="package-row">
                            <span>Transport</span>
                            <strong>{travelPackage.transportation} - {travelPackage.company}</strong>
                        </div>

                        <div className="package-row">
                            <span>Duration</span>
                            <strong>{travelPackage.days} days</strong>
                        </div>

                        <div className="package-cost">৳ {travelPackage.cost}</div>

                        <button
                            className="proceed-button"
                            onClick={() => handleProceed(travelPackage.id,travelPackage.cost)}
                        >
                            Proceed with Booking
                        </button>

                    </div>
                ))}

            </div>

            <button onClick={() => navigate("/Home")} className="packages-back-button">
                Back to Home
            </button>

        </div>
    );
}

export default BookPackage;
