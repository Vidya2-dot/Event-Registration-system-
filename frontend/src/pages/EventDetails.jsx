import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useParams, Link } from "react-router-dom";

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState({});

  useEffect(() => {
    api.get(`/events/${id}`).then(res => setEvent(res.data));
  }, [id]);

  return (
    <div className="container">
      <div className="card">
        <h2>{event.title}</h2>
        <p>{event.date}</p>
        <p>{event.location}</p>
        <p className="desc">{event.description}</p>
        <Link to={`/register/${id}`}>
          <button>Register Now</button>
        </Link>
      </div>
    </div>
  );
}
