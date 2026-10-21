from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from django.shortcuts import get_object_or_404

from .models import Event, Ticket
from .serializers import EventSerializer, TicketSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all().order_by("date")
    serializer_class = EventSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=["post"], permission_classes=[permissions.IsAuthenticated])
    def buy_ticket(self, request, pk=None):
        event = get_object_or_404(Event, pk=pk)

        with transaction.atomic():
            locked_event = Event.objects.select_for_update().get(pk=event.pk)

            if locked_event.tickets_sold >= locked_event.capacity:
                return Response(
                    {"detail": "Sorry, this event is sold out."}, 
                    status=status.HTTP_400_BAD_REQUEST
                )

            locked_event.tickets_sold += 1
            locked_event.save()

            ticket = Ticket.objects.create(
                event=locked_event,
                attendee=request.user
            )

            serializer = TicketSerializer(ticket)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

class TicketViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Ticket.objects.filter(attendee=self.request.user)

class OrganizerEventViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Event.objects.filter(organizer=self.request.user).order_by("-date")

    @action(detail=True, methods=["get"])
    def attendees(self, request, pk=None):
        event = get_object_or_404(Event, pk=pk, organizer=request.user)
        tickets = Ticket.objects.filter(event=event, status="VALID")
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data)