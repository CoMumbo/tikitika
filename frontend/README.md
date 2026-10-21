# TikiTika 🎟️🇰🇪
**A high-concurrency event ticketing platform built for the Kenyan market.**

## The Problem
Ticketing in Kenya suffers from rampant fraud, duplicate tickets, and overbooking. At major events, hundreds of fans are often locked out because scalpers resold the same barcode multiple times.

## The Solution
TikiTika solves this by assigning a unique, cryptographically secure UUID to every ticket. The backend uses PostgreSQL row-level locking (`select_for_update`) to guarantee that a ticket cannot be sold twice, even if 10,000 people click "Buy" at the exact same millisecond.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS (Custom Kenyan Palette), React Router, Axios
- **Backend:** Django, Django REST Framework, SimpleJWT
- **Database:** PostgreSQL (with strict transaction locking)

## Key Features
- **Concurrency Safe:** Prevents double-booking under heavy load.
- **JWT Auth:** Secure buyer login.
- **Organizer Dashboard:** Event creators can log in to view the live attendee list for their specific events.
- **Digital Tickets:** Users get a secure UUID code they can show at the gate.
- **Kenyan Aesthetic:** Designed with Kenyan Green, Red, and Sand colors.

## Running Locally

### Backend
1. `cd backend` (or root, depending on structure)
2. `python -m venv .venv`
3. `source .venv/Scripts/activate` (Windows) or `source .venv/bin/activate` (Mac/Linux)
4. `pip install -r requirements.txt`
5. Create a `.env` file with your `SECRET_KEY` and PostgreSQL `DATABASE_URL`.
6. `python manage.py migrate`
7. `python manage.py runserver`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

---
*Built by Collins Mumbo*