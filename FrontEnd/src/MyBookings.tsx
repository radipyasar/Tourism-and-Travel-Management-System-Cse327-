import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/MyBookings.css";

function MyBookings() {

    const navigate = useNavigate();

    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {

        const loadBookings = async () => {

            try {

                const user_id = localStorage.getItem("user_id");

                const response = await fetch("http://localhost:8081/bookings/" + user_id);
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
        <div className="bookings-page">

            <div className="bookings-header">
                <h1 className="bookings-heading">My Bookings</h1>
                <p className="bookings-subtext">Packages you have booked</p>
            </div>

            <div className="bookings-list">

                {bookings.map((booking) => (

                    <div className="booking-card" key={booking.booking_id}>

                        <h2 className="booking-destination">{booking.destination}</h2>

                        <div className="booking-details">
                            <p><span>Hotel:</span> {booking.hotel}</p>
                            <p><span>Transport:</span> {booking.transportation} - {booking.company}</p>
                            <p><span>Days:</span> {booking.days}</p>
                            <p><span>Payment:</span> {booking.payment_method}</p>
                            <p><span>Total Cost:</span> {booking.total_cost} BDT</p>
                        </div>

                        {Boolean(booking.guide) && (
                            <p className="booking-extra">Additional Feature - Guide</p>
                        )}

                    </div>
                ))}

            </div>

            <button onClick={() => navigate("/Home")} className="bookings-back-button">
                Back to Home
            </button>

        </div>
    );
}

export default MyBookings;