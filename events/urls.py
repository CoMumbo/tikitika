from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, TicketViewSet, OrganizerEventViewSet

router = DefaultRouter()
router.register("events", EventViewSet)
router.register("my-tickets", TicketViewSet, basename="my-tickets")
router.register("my-events", OrganizerEventViewSet, basename="my-events")

urlpatterns = [
    path("", include(router.urls)),
]