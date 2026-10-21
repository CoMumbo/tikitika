import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import OrganizerPage from "./pages/OrganizerPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:id" element={<EventDetailPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="/organizer" element={<OrganizerPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}