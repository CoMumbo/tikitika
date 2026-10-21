import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/events";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user, logout } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-kenya-sand">
      <header className="bg-kenya-green text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold tracking-wider">TikiTika</Link>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link to="/organizer" className="font-semibold hover:text-kenya-red transition-colors">Organizer Dashboard</Link>
                <Link to="/my-tickets" className="font-semibold hover:text-kenya-red transition-colors">My Tickets</Link>
                <button onClick={logout} className="text-sm bg-kenya-red px-4 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors">Log Out</button>
              </>
            ) : (
              <Link to="/login" className="text-sm bg-kenya-red px-4 py-2 rounded-lg font-bold hover:bg-red-800 transition-colors">Log In</Link>
            )}
          </div>
        </div>
      </header>

      <section className="bg-kenya-black text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-black mb-4">
            Experience Kenya's <span className="text-kenya-red">Best Events</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl">
            Secure your tickets instantly. No fake tickets, no queues. Just pure vibes.
          </p>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-kenya-black mb-8 border-b-4 border-kenya-green inline-block pb-2">
          Upcoming Events
        </h2>

        {loading ? (
          <p className="text-kenya-green font-bold text-xl">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-500">No events found. Check back later!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-white rounded-xl shadow-xl overflow-hidden border-t-8 border-kenya-green flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-kenya-sand text-kenya-green text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {new Date(event.date).toLocaleDateString('en-KE', { month: 'short', day: 'numeric' })}
                    </span>
                    {event.is_sold_out && (
                      <span className="bg-kenya-red text-white text-xs font-bold px-3 py-1 rounded-full">SOLD OUT</span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-kenya-black mb-2">{event.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                  <div className="text-sm font-medium text-gray-500 flex flex-col gap-1">
                    <span>📍 {event.location}</span>
                    <span>🎟️ {event.capacity - event.tickets_sold} tickets left</span>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <Link
                    to={`/events/${event.id}`}
                    className={`block w-full text-center py-3 rounded-lg font-bold text-lg transition-colors ${
                      event.is_sold_out
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-kenya-red text-white hover:bg-red-800"
                    }`}
                  >
                    {event.is_sold_out ? "Sold Out" : "Get Tickets"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}