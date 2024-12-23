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
from .models import Guide
import json
from django.views import View
from django.utils.decorators import method_decorator
from .models import Advisor  # Import the Advisor model
from rest_framework import status

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

@api_view(['GET'])
def get_all_highschools(request):
    highschools = HighSchool.objects.all().values('name', 'city', 'score')
    return Response(list(highschools))

@api_view(['POST'])
def add_highschool(request):
    try:
        # Extract the data from the request
        name = request.data.get('name')
        city = request.data.get('city')
        score = request.data.get('score', 0)  # Default to 0 if not provided

        # Validate required fields
        if not name or not city:
            return Response(
                {"error": "High School name and city are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create and save the new high school
        highschool = HighSchool.objects.create(name=name, city=city, score=score)
        highschool.save()

        # Respond with the created high school data
        return Response(
            {"id": highschool.id, "name": highschool.name, "city": highschool.city, "score": highschool.score},
            status=status.HTTP_201_CREATED
        )

    except Exception as e:
        # Handle unexpected errors
        return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

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
            # Parse incoming data
            data = json.loads(request.body)

            # Validate required fields
            required_fields = ['name', 'contact_email', 'city', 'highschool_name', 'date', 'time']
            missing_fields = [field for field in required_fields if field not in data]
            if missing_fields:
                return JsonResponse({'error': f'Missing fields: {", ".join(missing_fields)}'}, status=400)

            # Create a new UniversityFair object
            fair = UniversityFair(
                name=data['name'],
                contact_email=data['contact_email'],
                city=data['city'],
                highschool_name=data['highschool_name'],
                date=data['date'],
                time=data['time'],
                additional_notes=data.get('additional_notes', ''),  # Optional field
            )
            fair.save()

            return JsonResponse({'message': 'University Fair application submitted successfully!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@api_view(['GET'])
def get_highschool_tours(request):
    tours = Tour.objects.filter(status='pending').values()
    return Response(list(tours))

@api_view(['GET'])
def get_individual_tours(request):
    tours = IndividualTour.objects.filter(status='pending').values()
    return Response(list(tours))

@api_view(['GET'])
def get_accepted_highschool_tours(request):
    tours = Tour.objects.filter(status='accepted')
    result = []

    for tour in tours:
        guide_names = []
        if tour.guide1_id:
            guide1 = Guide.objects.filter(id=tour.guide1_id).first()
            if guide1:
                guide_names.append(guide1.name)
        if tour.guide2_id:
            guide2 = Guide.objects.filter(id=tour.guide2_id).first()
            if guide2:
                guide_names.append(guide2.name)
        if tour.guide3_id:
            guide3 = Guide.objects.filter(id=tour.guide3_id).first()
            if guide3:
                guide_names.append(guide3.name)

        result.append({
            'id': tour.id,
            'date': tour.date,
            'time_slot': tour.time_slot,
            'highschool': tour.highschool,
            'counselor_name': tour.counselor_name,
            'contact_phone': tour.contact_phone,
            'contact_email': tour.contact_email,
            'capacity': tour.capacity,
            'guides': guide_names,  # Include guide names
            'additional_notes': tour.additional_notes,
        })

    return Response(result)


@api_view(['GET'])
def get_accepted_individual_tours(request):
    tours = IndividualTour.objects.filter(status='accepted').values()
    return Response(list(tours))

@api_view(['POST'])
def update_tour_status(request):
    data = request.data
    tour_type = data.get('type')  # 'highschool' or 'individual'
    tour_id = data.get('id')
    status = data.get('status')  # 'accepted' or 'rejected'

    if tour_type == 'highschool':
        tour = Tour.objects.filter(id=tour_id).first()
    elif tour_type == 'individual':
        tour = IndividualTour.objects.filter(id=tour_id).first()
    else:
        return Response({'error': 'Invalid tour type'}, status=400)

    if tour:
        tour.status = status
        tour.save()
        return Response({'message': 'Status updated successfully'})
    return Response({'error': 'Tour not found'}, status=404)

@api_view(['GET'])
def get_guides(request):
    # Fetch all fields from the Guide table
    guides = Guide.objects.all().values()
    
    # Optional: Modify fields if needed
    guide_list = []
    for guide in guides:
        guide_entry = {**guide}  # Copy all fields
        guide_entry["contact_phone"] = guide["contact_phone"] or "N/A"  # Replace null with "N/A"
        guide_entry["contact_mail"] = guide["contact_mail"] or "N/A"    # Replace null with "N/A"
        guide_list.append(guide_entry)

    # Return the modified guide list as JSON
    return Response(guide_list)


@csrf_exempt
def get_fair_applications(request):
    if request.method == 'GET':
        pending_fairs = UniversityFair.objects.filter(status='pending').values()
        return JsonResponse(list(pending_fairs), safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def get_accepted_fair_applications(request):
    if request.method == 'GET':
        pending_fairs = UniversityFair.objects.filter(status='accepted').values()
        return JsonResponse(list(pending_fairs), safe=False)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

@csrf_exempt
def update_fair_application_status(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            fair = UniversityFair.objects.get(id=data['id'])
            fair.status = data['status']
            fair.save()
            return JsonResponse({'message': 'Status updated successfully!'}, status=200)
        except UniversityFair.DoesNotExist:
            return JsonResponse({'error': 'Fair application not found'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method'}, status=405)

from .models import Feedback

@csrf_exempt
def submit_feedback(request):
    if request.method == 'POST':
        try:
            # Parse JSON request body
            data = json.loads(request.body)

            # Extract fields
            name = data.get('name')
            city = data.get('city')
            highschool = data.get('highschool')
            tour_type = data.get('tour_type')
            tour_date = data.get('tour_date')
            feedback_text = data.get('feedback')

            # Validate fields
            if not all([name, city, highschool, tour_type, tour_date, feedback_text]):
                return JsonResponse({'error': 'All fields are required.'}, status=400)

            # Save feedback to the database
            feedback = Feedback(
                name=name,
                city=city,
                highschool=highschool,
                tour_type=tour_type,
                tour_date=tour_date,
                feedback=feedback_text
            )
            feedback.save()

            return JsonResponse({'message': 'Feedback submitted successfully.'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON payload.'}, status=400)
        except Exception as e:
            return JsonResponse({'error': f'An error occurred: {str(e)}'}, status=500)

    return JsonResponse({'error': 'Invalid HTTP method.'}, status=405)

def get_feedbacks(request):
    feedbacks = Feedback.objects.all().values()
    return JsonResponse(list(feedbacks), safe=False)



def advisor_list(request):
    advisors = Advisor.objects.all().values()
    return JsonResponse(list(advisors), safe=False)