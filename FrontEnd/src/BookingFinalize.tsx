import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/BookingFinalize.css";

function BookingFinalize() {

    const navigate = useNavigate();

    const user_id = localStorage.getItem("user_id");
    const id = localStorage.getItem("package_id");
    const cost = Number(localStorage.getItem("Package_cost"));

    const [guide, setGuide] = useState<string>("false");
    const [paymentMethod, setPaymentMethod] = useState<string>("");

    const handleConfirm = async (event: React.FormEvent) => {
        event.preventDefault();

        try {

            const response = await fetch("http://localhost:8081/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id,
                    id,
                    guide: guide === "true",
                    payment_method: paymentMethod,
                    cost
                })
            });

            const result = await response.json();
            alert(result.message);

            if (response.ok) {
                navigate("/Home");
            }

        } catch (error) {
            console.error(error);
            alert("Could not connect to the server");
        }
    };

    return (
        <div className="finalize-page">
            <div className="finalize-card">

                <h1 className="finalize-heading">Confirm Booking</h1>
                <p className="finalize-subtext">Choose your extras and pay</p>

                <form onSubmit={handleConfirm} className="finalize-form">

                    <div className="finalize-field">
                        <label>Need a Guide? (Free)</label>
                        <br />
                        <select
                            value={guide}
                            onChange={(e) => setGuide(e.target.value)}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>
                    </div>

                    <div className="total-box">
                        <span>Total</span>
                        <span>৳ {cost}</span>
                    </div>

                    <div className="finalize-field">
                        <label>Payment Method</label>
                        <br />
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="">Select a method</option>
                            <option value="Bkash">Bkash</option>
                            <option value="Credit Card">Credit Card</option>
                        </select>
                    </div>

                    <button type="submit" className="confirm-button">
                        Confirm Booking
                    </button>

                </form>

                <button onClick={() => navigate("/BookPackage")} className="finalize-back-button">
                    Back to Packages
                </button>

            </div>
        </div>
    );
}

export default BookingFinalize;
