import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/RecentUpdates.css";

function RecentUpdates() {

    const navigate = useNavigate();

    const [updates, setUpdates] = useState<any[]>([]);

    useEffect(() => {

        const loadUpdates = async () => {

            try {

                const user_id = localStorage.getItem("user_id");

                const response = await fetch("http://localhost:8081/updates/" + user_id);
                const data = await response.json();

                setUpdates(data);

            } catch (error) {
                console.error(error);
                alert("Could not load updates from the server");
            }
        };

        loadUpdates();

    }, []);

    return (
        <div className="updates-page">

            <div className="updates-header">
                <h1 className="updates-heading">Recent Updates</h1>
                <p className="updates-subtext">Latest news from Travel Planner</p>
            </div>

            <div className="updates-list">

                {updates.length === 0 && (
                    <p className="updates-message">No updates yet</p>
                )}

                {updates.map((update) => (

                    <div className="update-card" key={update.update_id}>

                        <span className="update-icon">🔔</span>

                        <div className="update-body">
                            <p className="update-message">{update.message}</p>
                            <p className="update-time">
                                {new Date(update.created_at).toLocaleString()}
                            </p>
                        </div>

                    </div>
                ))}

            </div>

            <button onClick={() => navigate("/Home")} className="updates-back-button">
                Back to Home
            </button>

        </div>
    );
}

export default RecentUpdates;