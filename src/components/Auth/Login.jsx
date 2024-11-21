import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reseteja error anterior

    try {
      const response = await axios.post("http://localhost:8080/auth/login", formData, {
        withCredentials: true, // Assegura l'ús de cookies
      });

      const { token } = response.data;
      localStorage.setItem("token", token); // Desa el token al localStorage
      navigate("/pets"); // Redirigeix a la pàgina de mascotes
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Error during login.";
      setErrorMessage(errorMsg); // Mostra l'error retornat pel servidor
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
