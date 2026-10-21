from rest_framework import serializers
from .models import Event, Ticket
from django.contrib.auth import get_user_model

User = get_user_model()

class EventSerializer(serializers.ModelSerializer):
    organizer_name = serializers.CharField(source="organizer.username", read_only=True)
    is_sold_out = serializers.SerializerMethodField()
    is_organizer = serializers.SerializerMethodField()

    class Meta:
        model = Event
        fields = [
            "id", "title", "description", "date", "location", 
            "capacity", "tickets_sold", "is_sold_out", "organizer_name", "is_organizer"
        ]

    def get_is_sold_out(self, obj):
        return obj.tickets_sold >= obj.capacity

    def get_is_organizer(self, obj):
        request = self.context.get("request")
        if request and request.user.is_authenticated:
            return obj.organizer == request.user
        return False

class TicketSerializer(serializers.ModelSerializer):
    event_title = serializers.CharField(source="event.title", read_only=True)
    attendee_email = serializers.CharField(source="attendee.email", read_only=True)

    class Meta:
        model = Ticket
        fields = ["id", "event", "event_title", "attendee_email", "qr_code", "status", "purchased_at"]
        read_only_fields = ["qr_code", "status", "purchased_at"]