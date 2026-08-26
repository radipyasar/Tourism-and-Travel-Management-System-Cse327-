import {  useNavigate } from "react-router-dom";
import "./styles/Home.css";


function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-page">

            <button className="travel-packages" onClick={() => navigate("/BookPackage")}>
                ✈️
                <span>Travel Packages</span>
            </button>

            <button className="package-reviews" onClick={() => navigate("/MyBookings")}>
                ⭐
                <span>My Bookings</span>
            </button>

            <button className="edit-profile" onClick={() => navigate("/EditProfile")}>
                👤
                <span>Edit Profile</span>
            </button>

            <button className="customer-care" onClick={() => navigate("/RecentUpdates")}>
                💬
                <span>Recent Updates</span>
            </button>

        </div>
    );
}

export default Home;