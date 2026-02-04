import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    description: ""
  });

  /* 🔐 BASIC ADMIN ACCESS CHECK (OPTIONAL SIMPLE CHECK) */
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  /* 📡 LOAD EVENTS */
  const loadEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  /* ➕ ADD EVENT */
  const addEvent = async () => {
    if (!form.title || !form.date || !form.location || !form.description) {
      alert("Please fill all fields");
      return;
    }

    await api.post("/events", form);
    alert("Event added successfully");

    setForm({ title: "", date: "", location: "", description: "" });
    loadEvents();
  };

  /* ❌ DELETE EVENT */
  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    await api.delete(`/events/${id}`);
    loadEvents();
  };

  /* 👥 LOAD REGISTRATIONS BY EVENT */
  const loadRegistrations = async () => {
    if (!selectedEvent) {
      alert("Please select an event");
      return;
    }

    const res = await api.get(`/register/event/${selectedEvent}`);
    setRegistrations(res.data);
  };

  return (
    <div className="container">
      <h1>🛠 Admin Dashboard</h1>

      {/* ================= ADD EVENT ================= */}
      <div className="card">
        <h3>Add New Event</h3>

        <input
          placeholder="Event Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />

        <input
          placeholder="Date & Time (e.g. 2026-03-20 10:00 AM)"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
        />

        <textarea
          placeholder="Event Description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />

        <button onClick={addEvent}>Add Event</button>
      </div>

      <hr />

      {/* ================= ALL EVENTS ================= */}
      <h3>All Events</h3>

      {events.length === 0 ? (
        <div className="empty">No events found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id}>
                <td>{event.title}</td>
                <td>{event.date}</td>
                <td>{event.location}</td>
                <td>
                  <button onClick={() => deleteEvent(event._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <hr />

      {/* ================= REGISTRATIONS ================= */}
      <h3>Event Registrations</h3>

      <select onChange={e => setSelectedEvent(e.target.value)}>
        <option value="">Select Event</option>
        {events.map(event => (
          <option key={event._id} value={event._id}>
            {event.title}
          </option>
        ))}
      </select>

      <button onClick={loadRegistrations}>View Registrations</button>

      {registrations.length === 0 ? (
        <div className="empty">No registrations found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Registered At</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(reg => (
              <tr key={reg._id}>
                <td>{reg.name}</td>
                <td>{reg.userEmail}</td>
                <td>{reg.phone}</td>
                <td>{new Date(reg.registeredAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
