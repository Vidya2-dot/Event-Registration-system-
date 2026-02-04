import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");

  const login = async () => {
    setError("");

    if (!form.email || !form.password) {
      setError("All fields are required");
      return;
    }

    try {
      const res = await api.post("/users/login", form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth">
      <h2>User Login</h2>
      <p className="subtitle">
        Login using your registered email and password
      </p>

      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={e => setForm({ ...form, password: e.target.value })}
      />

      {error && <p className="error">{error}</p>}

      <button onClick={login}>Login</button>

      <p style={{ marginTop: "15px" }}>
        New user?{" "}
        <Link to="/register-user">
          <b>Create an account</b>
        </Link>
      </p>
    </div>
  );
}
