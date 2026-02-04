import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link, useNavigate } from "react-router-dom";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/login");
  }, [navigate]);

  useEffect(() => {
    api.get("/events").then(res => setEvents(res.data));
  }, []);

  return (
    <div className="container">
      <h1>All Events</h1>

      {events.length === 0 ? (
        <div className="empty">No events available</div>
      ) : (
        <div className="grid">
          {events.map(event => (
            <div className="card" key={event._id}>
              <h3>{event.title}</h3>
              <p><b>Date:</b> {event.date}</p>
              <p><b>Location:</b> {event.location}</p>

              <p className="desc">
                {event.description.slice(0, 120)}...
              </p>

              <Link to={`/events/${event._id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
