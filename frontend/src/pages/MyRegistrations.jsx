import { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/login");
      return;
    }

    const user = JSON.parse(storedUser);

    api
      .get(`/register/user/${user.email}`)
      .then(res => {
        setRegistrations(res.data);
      })
      .catch(() => {
        alert("Failed to load registrations");
      });
  }, [navigate]);

  return (
    <div className="container">
      <h1>My Registrations</h1>

      {registrations.length === 0 ? (
        <div className="empty">
          <p>You have not registered for any events yet.</p>
        </div>
      ) : (
        <div className="grid">
          {registrations.map(reg => (
            <div className="card" key={reg._id}>
              <h3>{reg.eventId?.title}</h3>

              <p>
                <b>Date & Time:</b> {reg.eventId?.date}
              </p>

              <p>
                <b>Location:</b> {reg.eventId?.location}
              </p>

              <p className="desc">
                {reg.eventId?.description}
              </p>

              <hr />

              <p>
                <b>Registered Name:</b> {reg.name}
              </p>

              <p>
                <b>Phone:</b> {reg.phone}
              </p>

              <p>
                <b>Registered On:</b>{" "}
                {new Date(reg.registeredAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
