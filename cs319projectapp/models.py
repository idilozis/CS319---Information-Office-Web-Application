from django.contrib.auth.models import AbstractUser
from django.db import models

class UserAccount(AbstractUser):
    ROLE_CHOICES = [
        ('Guide', 'Guide'),
        ('Advisor', 'Advisor'),
        ('Coordinator', 'Coordinator'),
        ('Director', 'Director'),
        ('Promo_Coordinator', 'Promo_Coordinator'),
        ('Guest', 'Guest'),
    ]
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='Guest')

    def __str__(self):
        return self.username
