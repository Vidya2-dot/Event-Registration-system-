import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Eventify</h2>
      <div className="nav-links">
        <Link to="/">Events</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}
