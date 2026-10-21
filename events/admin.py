from django.contrib import admin
from .models import Event, Ticket

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ("title", "date", "capacity", "tickets_sold", "organizer")

@admin.register(Ticket)
class TicketAdmin(admin.ModelAdmin):
    list_display = ("event", "attendee", "status", "purchased_at")