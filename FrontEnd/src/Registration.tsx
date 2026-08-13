import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Registration.css";

function Registration() {

    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch("http://localhost:8081/users", {
            //above in fetch react is calling the rest api
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                phone,
                password
            })
            
            
        });

        const result = await response.json();
        alert(result.message);

        setName("");
        setEmail("");
        setPhone("");
        setPassword("");
        if(result.message==="Registration successful"){
            navigate("/Login");
        }
        
    };

    return (
        <div className="registration-container">
           <div className="registration-card"> 

            <h1 className="registration">Registration</h1>

            <form onSubmit={handleSubmit} className="registration-form">

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

                

                <div className="password-container">
                    <label>Password</label>
                    <br />
                    <input
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

               

                <button type="submit" className="register-button">
                    Register
                </button>

            </form>
           </div> 

        </div>
    );
}

export default Registration;