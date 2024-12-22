from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

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

    USERNAME_FIELD = 'id'  # Mandatory
    REQUIRED_FIELDS = ['role']  # Mandatory

    def __str__(self):
        return f'{self.id} - {self.role}'

class HighSchool(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=100, null=True, blank=True)
    score = models.FloatField(default=0)

    class Meta:
        db_table = 'highschools'  # Use the existing table

    def __str__(self):
        return f"{self.name} ({self.city})"

from django.db import models

from django.db import models

class Guide(models.Model):
    bilkentid = models.CharField(max_length=20, unique=True)  # Unique identifier
    name = models.CharField(max_length=255)  # Name of the guide
    contact_mail = models.EmailField()  # Contact email of the guide
    contact_phone = models.CharField(max_length=20)  # Contact phone of the guide
    tour_hours = models.PositiveIntegerField(default=0)  # Total hours worked for tours
    fair_hours = models.PositiveIntegerField(default=0)  # Total hours worked for fairs
    payroll = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)  # Payroll amount

    class Meta:
        db_table = 'guides'  # Explicitly map to the 'guides' table in MySQL

    def __str__(self):
        return f"{self.name} ({self.bilkentid})"


class Tour(models.Model):
    counselor_name = models.CharField(max_length=255)
    capacity = models.PositiveIntegerField()
    highschool = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=20)
    contact_email = models.EmailField()
    additional_notes = models.TextField(blank=True, null=True)
    date = models.DateField()
    time_slot = models.CharField(max_length=50)
    status = models.CharField(
        max_length=10,
        choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')],
        default='pending'
    )  # New field
    guide1_id = models.IntegerField(blank=True, null=True)
    guide2_id = models.IntegerField(blank=True, null=True)
    guide3_id = models.IntegerField(blank=True, null=True)
    
    class Meta:
        db_table = 'highschooltours'  # Use the existing table

    def __str__(self):
        return f"{self.counselor_name} - {self.highschool} on {self.date} at {self.time_slot}"

from django.db import models

class IndividualTour(models.Model):
    name = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    highschool = models.CharField(max_length=255)
    contact_phone = models.CharField(max_length=20)
    contact_email = models.EmailField()
    major_of_interest = models.TextField()
    additional_notes = models.TextField(blank=True, null=True)
    date = models.DateField()
    status = models.CharField(
        max_length=10,
        choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')],
        default='pending'
    )
    guide_id = models.IntegerField(blank=True, null=True)
    class Meta:
        db_table = 'individualtours'

    def __str__(self):
        return f"{self.name} - {self.city} on {self.date}"

from django.db import models

class UniversityFair(models.Model):
    name = models.CharField(max_length=255)  # Name of the person applying
    contact_email = models.EmailField()  # Contact email
    city = models.CharField(max_length=100)  # City of the fair
    highschool_name = models.CharField(max_length=255)  # Name of the high school
    date = models.DateField()  # New field for the date of the fair
    time = models.CharField(max_length=50)  # New field for the time of the fair
    additional_notes = models.TextField(blank=True, null=True)  # Additional notes for the application
    status = models.CharField(
        max_length=10,
        choices=[('pending', 'Pending'), ('accepted', 'Accepted'), ('rejected', 'Rejected')],
        default='pending'
    )

    class Meta:
        db_table = 'universityfairs'

    def __str__(self):
        return f"{self.name} - {self.city} on {self.date} at {self.time}"
