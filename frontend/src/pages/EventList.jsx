import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  return (
    <div className="container">
      <h1>Upcoming Events</h1>
      <div className="grid">
        {events.map(e => (
          <div className="card" key={e._id}>
            <h3>{e.name}</h3>
            <p>{e.date}</p>
            <p>{e.location}</p>
            <Link to={`/event/${e._id}`}>View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
