import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyTickets } from "../api/events";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyTickets()
      .then((data) => setTickets(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-kenya-sand py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-4 border-kenya-green pb-4">
          <h1 className="text-3xl font-black text-kenya-black">My Tickets</h1>
          <Link to="/" className="text-kenya-red font-bold hover:underline">← Back to Events</Link>
        </div>

        {loading ? (
          <p className="text-kenya-green font-bold text-xl">Loading your tickets...</p>
        ) : tickets.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-gray-500 mb-4 text-lg">You haven't bought any tickets yet.</p>
            <Link to="/" className="bg-kenya-green text-white px-6 py-3 rounded-lg font-bold hover:bg-green-800">
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white rounded-xl shadow-lg border-l-8 border-kenya-green overflow-hidden flex flex-col">
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold text-kenya-black">{ticket.event_title}</h2>
                    <span className="bg-green-100 text-kenya-green text-xs font-bold px-2 py-1 rounded">
                      {ticket.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-6">Purchased on {new Date(ticket.purchased_at).toLocaleDateString()}</p>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-xs text-gray-500 font-bold uppercase mb-1">Entry Code</p>
                    <p className="font-mono text-sm break-all text-kenya-black">{ticket.qr_code}</p>
                  </div>
                </div>
                <div className="bg-kenya-black text-white text-center py-2 text-sm font-bold tracking-widest uppercase">
                  TikiTika Verified
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}