import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyEvents, getEventAttendees } from "../api/events";

export default function OrganizerPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);
  const [loadingAttendees, setLoadingAttendees] = useState(false);

  useEffect(() => {
    getMyEvents()
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleViewAttendees(eventId) {
    setLoadingAttendees(true);
    setSelectedEvent(eventId);
    try {
      const data = await getEventAttendees(eventId);
      setAttendees(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAttendees(false);
    }
  }

  return (
    <div className="min-h-screen bg-kenya-sand py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b-4 border-kenya-green pb-4">
          <h1 className="text-3xl font-black text-kenya-black">Organizer Dashboard</h1>
          <Link to="/" className="text-kenya-red font-bold hover:underline">← Back to Site</Link>
        </div>

        {loading ? (
          <p className="text-kenya-green font-bold text-xl">Loading...</p>
        ) : events.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <p className="text-gray-500 mb-4 text-lg">You haven't created any events yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1 space-y-4">
              {events.map((event) => (
                <div key={event.id} className="bg-white p-4 rounded-xl shadow-md border-l-4 border-kenya-red">
                  <h3 className="font-bold text-lg">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.tickets_sold} / {event.capacity} Sold</p>
                  <button 
                    onClick={() => handleViewAttendees(event.id)}
                    className="mt-3 w-full bg-kenya-green text-white py-2 rounded text-sm font-bold hover:bg-green-800"
                  >
                    View Attendees
                  </button>
                </div>
              ))}
            </div>

            <div className="md:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-6 min-h-[400px]">
                {!selectedEvent ? (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Select an event to view the attendee list.
                  </div>
                ) : loadingAttendees ? (
                  <p className="text-kenya-green font-bold">Loading attendees...</p>
                ) : attendees.length === 0 ? (
                  <p className="text-gray-500">No tickets sold yet.</p>
                ) : (
                  <div>
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Attendees</h2>
                    <ul className="space-y-4">
                      {attendees.map((ticket) => (
                        <li key={ticket.id} className="flex justify-between items-center bg-gray-50 p-4 rounded border">
                          <div>
                            <p className="font-bold text-kenya-black">{ticket.attendee_email}</p>
                            <p className="text-xs text-gray-500">Purchased: {new Date(ticket.purchased_at).toLocaleDateString()}</p>
                          </div>
                          <span className="bg-green-100 text-kenya-green text-xs font-bold px-2 py-1 rounded">
                            {ticket.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}