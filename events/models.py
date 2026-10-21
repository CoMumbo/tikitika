from django.db import models
from django.conf import settings
import uuid

class Event(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    tickets_sold = models.PositiveIntegerField(default=0)
    organizer = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="organized_events"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Ticket(models.Model):
    STATUS_CHOICES = (
        ("VALID", "Valid"),
        ("USED", "Used"),
    )
    
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="tickets")
    attendee = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name="tickets"
    )
    qr_code = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="VALID")
    purchased_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.attendee.email} - {self.event.title}"