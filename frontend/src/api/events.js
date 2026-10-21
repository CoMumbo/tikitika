import { api } from "./client";

export async function getEvents() {
  const res = await api.get("/events/");
  return res.data;
}

export async function buyTicket(eventId) {
  const res = await api.post(`/events/${eventId}/buy_ticket/`);
  return res.data;
}

export async function getMyTickets() {
  const res = await api.get("/my-tickets/");
  return res.data;
}

export async function getMyEvents() {
  const res = await api.get("/my-events/");
  return res.data;
}

export async function getEventAttendees(eventId) {
  const res = await api.get(`/my-events/${eventId}/attendees/`);
  return res.data;
}