from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import connection
from django.contrib.auth.decorators import login_required
from utils.vite import get_vite_asset_path
from utils.vite import get_vite_asset_path
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import HighSchool
from django.db.models.functions import Lower
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Tour
from .models import IndividualTour
from .models import UniversityFair
import json


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('bilkent-id')
        password = request.POST.get('password')

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT role FROM Users WHERE ID=%s AND Password=%s",
                [username, password]
            )
            user = cursor.fetchone()

        if user:
            role = user[0]
            if role == 'Guide':
                return redirect('guide_dashboard')
            elif role == 'Advisor':
                return redirect('advisor_dashboard')
            elif role == 'Coordinator':
                return redirect('coordinator_dashboard')
            elif role == 'Director':
                return redirect('director_dashboard')
            elif role == 'Promo_Coordinator':
                return redirect('promo_coordinator_dashboard')

            # Redirect to `next` parameter if available
            next_url = request.GET.get('next', '')
            if next_url:
                return redirect(next_url)

        messages.error(request, "Invalid credentials. Please try again.")
    return render(request, 'login.html')

# Dashboards
#@login_required


#@login_required
def coordinator_dashboard(request):
    return render(request, "coordinator_dashboard.html")

#@login_required
def director_dashboard(request):
    return render(request, "director_dashboard.html")

#@login_required
def promo_coordinator_dashboard(request):
    return render(request, "promo_coordinator_dashboard.html")

# Guest Pages
def guest_dashboard(request):
    return render(request, 'guest_dashboard.html')

def react_view(request):
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, "react_base.html", context)


@api_view(['GET'])
def get_cities(request):
    cities = (
        HighSchool.objects.annotate(lower_city=Lower('city'))
        .values_list('lower_city', flat=True)
        .distinct()
    )
    cities = [city.title() for city in cities if city]  # Normalize case to title case
    print("Cities fetched from DB:", cities)  # Debug log
    return Response(cities)


@api_view(['GET'])
def get_highschools(request, city):
    highschools = HighSchool.objects.filter(city=city).values_list('name', flat=True)
    return Response(list(highschools))

@csrf_exempt
def submit_tour(request):
    if request.method == 'POST':
        try:
            # Parse JSON body
            data = json.loads(request.body)
            
            # Debugging print statement
            print("Received data:", data)  # Add this line to log the received data
            
            # Create a Tour instance
            tour = Tour(
                counselor_name=data['counselor_name'],
                capacity=data['capacity'],
                highschool=data['highschool'],
                contact_phone=data['contact_phone'],
                contact_email=data['contact_email'],
                additional_notes=data.get('additional_notes', ''),
                date=data['date'],
                time_slot=data['time_slot']
            )
            tour.save()

            return JsonResponse({'message': 'Tour created successfully!'}, status=201)
        except Exception as e:
            # Log and return the error
            print("Error while creating tour:", str(e))
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)



@csrf_exempt
def submit_individual_tour(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            # Create a new individual tour entry
            individual_tour = IndividualTour(
                name=data['name'],
                city=data['city'],
                highschool=data['highschool'],
                contact_phone=data['contact_phone'],
                contact_email=data['contact_email'],
                major_of_interest=data['major_of_interest'],
                additional_notes=data.get('additional_notes', ''),
                date=data['date'],
                status='pending',  # Default status
            )
            individual_tour.save()

            return JsonResponse({'message': 'Tour created successfully!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def submit_university_fair(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            fair = UniversityFair(
                name=data['name'],
                contact_email=data['contact_email'],
                city=data['city'],
                highschool_name=data['highschool_name'],
                additional_notes=data.get('additional_notes', '')
            )
            fair.save()
            return JsonResponse({'message': 'University Fair application submitted successfully!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)
