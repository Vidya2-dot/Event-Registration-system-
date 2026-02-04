import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function RegisterUser() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const register = async () => {
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      await api.post("/users/register", form);
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (err) {
      setError("User already exists");
    }
  };

  return (
    <div className="auth">
      <h2>User Registration</h2>

      <input
        placeholder="Full Name"
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={register}>Register</button>

      <p style={{ marginTop: "10px" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
