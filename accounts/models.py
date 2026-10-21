from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # We'll use email to log in instead of username
    email = models.EmailField(unique=True)
    is_organizer = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def __str__(self):
        return self.email