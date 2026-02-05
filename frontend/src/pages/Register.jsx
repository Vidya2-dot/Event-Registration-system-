import { useState } from "react";
import { api } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function Register() {
  const { id } = useParams();
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const submit = async () => {
    if (!form.name || !form.email || !form.phone) {
      alert("All fields required");
      return;
    }

    try {
      await api.post("/register", { ...form, eventId: id });
      nav("/success");
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="container">
      <h2>Register for Event</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })}/>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })}/>
      <input placeholder="Phone" onChange={e => setForm({ ...form, phone: e.target.value })}/>
      <button onClick={submit}>Submit</button>
    </div>
  );
}
