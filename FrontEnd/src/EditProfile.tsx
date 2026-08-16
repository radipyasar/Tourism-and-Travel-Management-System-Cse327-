import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/EditProfile.css";

function EditProfile() {

    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        const user_id = localStorage.getItem("user_id");

        if (!user_id) {
            alert("Please login first");
            navigate("/Login");
            return;
        }

        const loadProfile = async () => {
            const response = await fetch(`http://localhost:8081/users/${user_id}`);
            const user = await response.json();

            if (!response.ok) {
                alert(user.message);
                return;
            }

            setName(user.name);
            setPhone(user.phone);
            setEmail(user.email);
        };

        loadProfile();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const user_id = localStorage.getItem("user_id");

        const response = await fetch(`http://localhost:8081/users/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                phone,
                email
            })
        });

        const result = await response.json();
        alert(result.message);
        if(result.message==="Profile updated"){
            navigate("/Home");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-card">

                <div className="profile-avatar">👤</div>

                <h1 className="profile-heading">Edit Profile</h1>
                <p className="profile-subtext">Update your account details</p>

                <form onSubmit={handleSubmit} className="profile-form">

                    <div className="name-container">
                        <label>Name</label>
                        <br />
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="phone-container">
                        <label>Phone Number</label>
                        <br />
                        <input
                            type="tel"
                            placeholder="Enter your phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="email-container">
                        <label>Email</label>
                        <br />
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="save-button">
                        Save Changes
                    </button>

                </form>

                <button onClick={() => navigate("/Home")} className="back-button">
                    Back to Home
                </button>

            </div>
        </div>
    );
}

export default EditProfile;
