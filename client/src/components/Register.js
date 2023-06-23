import axios from "axios";
import React, { useState } from "react";
import "styles/Register.css";
import { useLocation, useNavigate } from "react-router-dom";

const Register = () => {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const register = useLocation().pathname === "/register";
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log(process.env.REACT_APP_SERVER_URL + "/register");
        const { data } = await axios({
            method: "post",
            url: process.env.REACT_APP_SERVER_URL + "/register",
            data: { user, pwd },
            withCredentials: true,
        });
        console.log(data);
        navigate("/login");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { data } = await axios({
            method: "post",
            url: process.env.REACT_APP_SERVER_URL + "/login",
            data: { user, pwd },
            withCredentials: true,
        });
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("username", user);
        navigate("/");
    };

    return (
        <div class="wrapper login">
            <div class="container">
                <div class="col-left">
                    <div class="login-text">
                        <h2>Welcome!</h2>
                        <p>
                            {register
                                ? "Already have an account?"
                                : "Don't have an account?"}
                        </p>
                        <a href="" class="btn">
                            {register ? "Sign In" : "Sign Up"}
                        </a>
                    </div>
                </div>
                <div class="col-right">
                    <div class="login-form">
                        <h2>{register ? "Register" : "Login"}</h2>
                        <form action="">
                            <p>
                                <label>
                                    Username/Email address<span>*</span>
                                </label>
                                <input
                                    value={user}
                                    onChange={(e) => setUser(e.target.value)}
                                    type="text"
                                    placeholder="Username or Email"
                                    required
                                />
                            </p>
                            <p>
                                <label>
                                    Password<span>*</span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    required
                                    value={pwd}
                                    onChange={(e) => setPwd(e.target.value)}
                                />
                            </p>
                            <p>
                                <input
                                    onClick={
                                        register ? handleRegister : handleLogin
                                    }
                                    type="submit"
                                    value={register ? "Sign Up" : "Sign In"}
                                />
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
