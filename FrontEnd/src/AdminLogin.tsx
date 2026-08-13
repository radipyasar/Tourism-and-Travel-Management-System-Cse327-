import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/AdminLogin.css";

function AdminLogin() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8081/admin-login", {
            // React is calling the REST API
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const result = await response.json();

        alert(result.message);

        setEmail("");
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

                        <label>Email</label>
                        <br />

                        <input
                            type="email"
                            placeholder="Enter admin email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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

export default AdminLogin;