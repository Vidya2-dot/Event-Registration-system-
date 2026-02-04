import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h2 className="logo">Eventify</h2>
      </div>

      <div className="nav-links">
        {user && (
          <>
            <Link to="/">Events</Link>
            <Link to="/my-registrations">My Registrations</Link>
            <button className="link-btn" onClick={logout}>
              Logout
            </button>
          </>
        )}

        <Link to="/admin" className="admin-link">
          Admin
        </Link>
      </div>
    </nav>
  );
}
