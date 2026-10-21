import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvents, buyTicket } from "../api/events";
import { useAuth } from "../context/AuthContext";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [ticket, setTicket] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // We fetch all events and find the one matching the ID (simplest for now)
    getEvents()
      .then((data) => {
        const found = data.find((e) => e.id === parseInt(id));
        setEvent(found);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleBuy() {
    if (!user) {
      navigate("/login");
      return;
    }
    setBuying(true);
    setError("");
    try {
      const newTicket = await buyTicket(id);
      setTicket(newTicket);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to purchase ticket.");
    } finally {
      setBuying(false);
    }
  }

  if (loading) return <div className="p-12 text-center text-kenya-green font-bold text-2xl">Loading...</div>;
  if (!event) return <div className="p-12 text-center text-kenya-red font-bold text-2xl">Event not found</div>;

  return (
    <div className="min-h-screen bg-kenya-sand py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header Image Placeholder */}
        <div className="h-48 bg-kenya-black flex items-center justify-center relative">
          <h1 className="text-4xl font-black text-white text-center px-4">{event.title}</h1>
          {event.is_sold_out && (
            <div className="absolute top-4 right-4 bg-kenya-red text-white font-bold px-4 py-2 rounded-lg transform rotate-12 shadow-lg">
              SOLD OUT
            </div>
          )}
        </div>

        <div className="p-8">
          <div className="flex justify-between items-center mb-6 border-b pb-6">
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Date</p>
              <p className="text-lg font-bold text-kenya-black">{new Date(event.date).toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 font-bold uppercase">Location</p>
              <p className="text-lg font-bold text-kenya-black">{event.location}</p>
            </div>
          </div>

          <p className="text-gray-700 mb-8 leading-relaxed">{event.description}</p>

          {ticket ? (
            <div className="bg-green-50 border-2 border-kenya-green rounded-xl p-6 text-center">
              <h3 className="text-2xl font-bold text-kenya-green mb-2">Ticket Secured! 🎉</h3>
              <p className="text-gray-600 mb-4">Show this code at the gate:</p>
              <div className="bg-white p-4 rounded-lg font-mono text-sm break-all border">
                {ticket.qr_code}
              </div>
            </div>
          ) : (
            <button
              onClick={handleBuy}
              disabled={event.is_sold_out || buying}
              className={`w-full py-4 rounded-xl font-bold text-xl text-white transition-colors ${
                event.is_sold_out 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-kenya-red hover:bg-red-800"
              }`}
            >
              {buying ? "Processing..." : event.is_sold_out ? "Sold Out" : "Buy Ticket Now"}
            </button>
          )}

          {error && <p className="text-kenya-red text-center mt-4 font-bold">{error}</p>}
        </div>
      </div>
    </div>
  );
}