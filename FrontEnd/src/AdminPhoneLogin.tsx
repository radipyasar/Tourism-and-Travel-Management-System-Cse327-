import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AdminLogin.css";

function AdminPhoneLogin() {

    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const strategy:string = "aphone";

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const medium:string = phone;

        const response = await fetch("http://localhost:8081/admin-login", {
            // React is calling the REST API
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                medium,
                password,
                strategy
            })
        });

        const result = await response.json();

        alert(result.message);

        setPhone("");
        setPassword("");

        if (result.message === "Login successful") {
            navigate("/AdminHome");
        }
    };

    return (
        <div className="admin-login-container">

            <div className="admin-login-card">

                <h1 className="admin-login">Admin Login</h1>

                <form
                    onSubmit={handleSubmit}
                    className="admin-login-form"
                >

                    <div className="email-container">

                        <label>Phone</label>
                        <br />

                        <input
                            type="tel"
                            placeholder="Enter admin phone number"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                    </div>

                    <div className="password-container">

                        <label>Password</label>
                        <br />

                        <input
                            type="password"
                            placeholder="Enter admin password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        className="admin-login-button"
                    >
                        Admin Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminPhoneLogin;