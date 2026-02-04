import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../api/api";

export default function Register() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    phone: ""
  });

  const [loading, setLoading] = useState(false);

  // 🔐 Ensure user is logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const submit = async () => {
    if (!form.name || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/register", {
        eventId: id,
        userEmail: user.email,
        name: form.name,
        phone: form.phone
      });

      alert("Registration successful 🎉");

      // ✅ IMPORTANT: navigate AFTER success
      navigate("/my-registrations");

    } catch (err) {
      if (err.response?.status === 409) {
        alert("You are already registered for this event");
        navigate("/my-registrations");
      } else {
        alert("Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth">
      <h2>Event Registration</h2>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })}
      />

      <input
        value={user?.email || ""}
        disabled
      />

      <input
        placeholder="Phone Number"
        value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })}
      />

      <button onClick={submit} disabled={loading}>
        {loading ? "Registering..." : "Complete Registration"}
      </button>
    </div>
  );
}
