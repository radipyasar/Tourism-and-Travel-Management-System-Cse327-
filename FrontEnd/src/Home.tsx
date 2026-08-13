import "./styles/Home.css";

function Home() {

    return (
        <div className="home-page">

            <button className="travel-packages">
                ✈️
                <span>Travel Packages</span>
            </button>

            <button className="package-reviews">
                ⭐
                <span>Package Reviews</span>
            </button>

            <button className="edit-profile">
                👤
                <span>Edit Profile</span>
            </button>

            <button className="customer-care">
                💬
                <span>Customer Care</span>
            </button>

        </div>
    );
}

export default Home;