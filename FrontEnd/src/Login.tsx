import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/Login.css";

function Login() {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

         const response = await fetch("http://localhost:8081/login", {
            //above in fetch react is calling the rest api
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
        if(result.message==="Login successful"){
            navigate("/Home");
        }
        

      
    };

    return (
        <div className="login-container">
          <div className="login-card"> 

            <h1 className="login">Login</h1>

            <form onSubmit={handleSubmit} className="login-form">

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

                

                <button type="submit" className="login-button">
                    Login
                </button>

            </form>

            

            <p className="text">Don't have an account?</p>

            <button onClick={() => navigate("/registration")} className="register-button">
                Register
            </button>
          </div>   

        </div>
    );
}

export default Login;