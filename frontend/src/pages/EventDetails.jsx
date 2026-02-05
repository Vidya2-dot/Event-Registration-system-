import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get("/events").then(res => {
      setEvent(res.data.find(e => e._id === id));
    });
  }, [id]);

  if (!event) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>{event.name}</h2>
      <p><b>Date:</b> {event.date}</p>
      <p><b>Location:</b> {event.location}</p>
      <p>{event.description}</p>
      <Link to={`/register/${event._id}`}>
        <button>Register Now</button>
      </Link>
    </div>
  );
}
