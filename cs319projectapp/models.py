from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

class UserAccountManager(BaseUserManager):
    def create_user(self, id, password=None, role=None, **extra_fields):
        if not id:
            raise ValueError("The ID must be set")
        user = self.model(id=id, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, id, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(id, password, **extra_fields)

class UserAccount(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(max_length=50, primary_key=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=50, choices=[
        ('Guide', 'Guide'),
        ('Advisor', 'Advisor'),
        ('Coordinator', 'Coordinator'),
        ('Director', 'Director'),
        ('Promo_Coordinator', 'Promo_Coordinator'),
        ('Guest', 'Guest')
    ])
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'id'
    REQUIRED_FIELDS = ['role']

    def __str__(self):
        return f'{self.id} - {self.role}'
