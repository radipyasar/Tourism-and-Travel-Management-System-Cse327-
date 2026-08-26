import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/CustomerBookings.css";

function CustomerBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {

        const loadBookings = async () => {

            try {

                const response = await fetch("http://localhost:8081/bookings");
                const data = await response.json();

                setBookings(data);

            } catch (error) {
                console.error(error);
                alert("Could not load bookings from the server");
            }
        };

        loadBookings();

    }, []);

    return (
        <div className="customer-bookings-page">

            <div className="customer-bookings-header">
                <h1 className="customer-bookings-heading">Customer Bookings</h1>
                <p className="customer-bookings-subtext">All bookings made by users</p>
            </div>

            <div className="customer-bookings-list">

                {bookings.length === 0 && (
                    <p className="customer-bookings-message">No bookings yet</p>
                )}

                {bookings.map((booking) => (

                    <div className="customer-booking-card" key={booking.booking_id}>

                        <div className="customer-info">
                            <h2 className="customer-name">{booking.name}</h2>
                            <p className="customer-contact">{booking.email} | {booking.phone}</p>
                        </div>

                        <div className="customer-booking-details">
                            <p><span>Destination:</span> {booking.destination}</p>
                            <p><span>Hotel:</span> {booking.hotel}</p>
                            <p><span>Transport:</span> {booking.transportation} - {booking.company}</p>
                            <p><span>Days:</span> {booking.days}</p>
                            <p><span>Payment:</span> {booking.payment_method}</p>
                            <p><span>Total Cost:</span> {booking.total_cost} BDT</p>
                        </div>

                        {Boolean(booking.guide) && (
                            <p className="customer-booking-extra">Additional Feature - Guide</p>
                        )}

                    </div>
                ))}

            </div>

            <button onClick={() => navigate("/AdminHome")} className="customer-bookings-back-button">
                Back to Admin Home
            </button>

        </div>
    );
}

export default CustomerBookings;