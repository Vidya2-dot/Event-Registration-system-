import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import EventList from "./pages/EventList";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import MyRegistrations from "./pages/MyRegistrations";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />

        {/* EVENTS */}
        <Route path="/" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetails />} />

        {/* REGISTRATION */}
        <Route path="/register/:id" element={<Register />} />
        <Route path="/my-registrations" element={<MyRegistrations />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
