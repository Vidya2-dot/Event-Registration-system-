import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Admin() {
  const [event, setEvent] = useState({});
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [registrations, setRegistrations] = useState([]);

  // Fetch all events
  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  // Add new event
  const addEvent = async () => {
    if (!event.name || !event.date || !event.location) {
      alert("Please fill all required fields");
      return;
    }
    await api.post("/events", event);
    alert("Event added successfully");
  };

  // Fetch registered users
  const fetchRegistrations = async () => {
    if (!selectedEventId) return;
    const res = await api.get(`/register/${selectedEventId}`);
    setRegistrations(res.data);
  };

  return (
    <div className="container">
      <h2>Admin Panel</h2>

      {/* ADD EVENT */}
      <h3>Add Event</h3>
      <input placeholder="Event Name" onChange={e => setEvent({ ...event, name: e.target.value })} />
      <input placeholder="Date & Time" onChange={e => setEvent({ ...event, date: e.target.value })} />
      <input placeholder="Location" onChange={e => setEvent({ ...event, location: e.target.value })} />
      <textarea placeholder="Description" onChange={e => setEvent({ ...event, description: e.target.value })} />
      <button onClick={addEvent}>Add Event</button>

      <hr />

      {/* VIEW REGISTRATIONS */}
      <h3>View Registered Candidates</h3>

      <select onChange={e => setSelectedEventId(e.target.value)}>
        <option value="">Select Event</option>
        {events.map(e => (
          <option key={e._id} value={e._id}>
            {e.name}
          </option>
        ))}
      </select>

      <button onClick={fetchRegistrations}>View Registrations</button>

      {registrations.length === 0 ? (
        <p>No registrations yet</p>
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
