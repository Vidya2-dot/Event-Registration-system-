import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Admin() {
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");

  const [eventForm, setEventForm] = useState({
    name: "",
    date: "",
    location: "",
    description: ""
  });

  // Fetch all events
  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  // Add new event
  const addEvent = async () => {
    if (!eventForm.name || !eventForm.date || !eventForm.location) {
      alert("Please fill all required fields");
      return;
    }

    await api.post("/events", eventForm);
    alert("Event added successfully");

    setEventForm({
      name: "",
      date: "",
      location: "",
      description: ""
    });

    const res = await api.get("/events");
    setEvents(res.data);
  };

  // Fetch registrations for selected event
  const fetchRegistrations = async () => {
    if (!selectedEventId) return;
    const res = await api.get(`/register/${selectedEventId}`);
    setRegistrations(res.data);
  };

  return (
    <div className="container">
      <h1>🛠 Admin Dashboard</h1>

      {/* ===== DASHBOARD SUMMARY ===== */}
      <div className="grid">
        <div className="card">
          <h3>Total Events</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {events.length}
          </p>
        </div>

        <div className="card">
          <h3>Registrations</h3>
          <p style={{ fontSize: "24px", fontWeight: "bold" }}>
            {registrations.length}
          </p>
        </div>

        <div className="card">
          <h3>Latest Event</h3>
          <p>
            {events.length > 0
              ? events[events.length - 1].name
              : "No events yet"}
          </p>
        </div>
      </div>

      <hr />

      {/* ===== ADD EVENT ===== */}
      <h3>Add New Event</h3>

      <input
        placeholder="Event Name"
        value={eventForm.name}
        onChange={e =>
          setEventForm({ ...eventForm, name: e.target.value })
        }
      />
      <input
        placeholder="Date & Time"
        value={eventForm.date}
        onChange={e =>
          setEventForm({ ...eventForm, date: e.target.value })
        }
      />
      <input
        placeholder="Location"
        value={eventForm.location}
        onChange={e =>
          setEventForm({ ...eventForm, location: e.target.value })
        }
      />
      <textarea
        placeholder="Description"
        value={eventForm.description}
        onChange={e =>
          setEventForm({ ...eventForm, description: e.target.value })
        }
      />

      <button onClick={addEvent}>Add Event</button>

      <hr />

      {/* ===== ALL EVENTS LIST ===== */}
      <h3>All Events</h3>

      {events.length === 0 ? (
        <p>No events created yet.</p>
      ) : (
        <ul>
          {events.map(e => (
            <li key={e._id}>
              <b>{e.name}</b> — {e.date} — {e.location}
            </li>
          ))}
        </ul>
      )}

      <hr />

      {/* ===== REGISTRATIONS ===== */}
      <h3>Registered Candidates</h3>

      <select onChange={e => setSelectedEventId(e.target.value)}>
        <option value="">Select Event</option>
        {events.map(ev => (
          <option key={ev._id} value={ev._id}>
            {ev.name}
          </option>
        ))}
      </select>

      <button onClick={fetchRegistrations}>View Registrations</button>

      {selectedEventId && (
        <p>
          Showing <b>{registrations.length}</b> registered candidates
        </p>
      )}

      {registrations.length === 0 ? (
        <p>No registrations found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(r => (
              <tr key={r._id}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
