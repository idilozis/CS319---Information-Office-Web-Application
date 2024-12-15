from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt



# Login view with role-based redirection
# @csrf_exempt
from django.shortcuts import render, redirect
from django.db import connection
from django.contrib import messages


def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')

        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT role FROM Users WHERE id=%s AND password=%s",
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
        else:
            messages.error(request, "Invalid credentials. Please try again.")

    return render(request, 'index.html')


# Placeholder views for each role
@login_required
def guide_dashboard(request):
    return render(request, "guide_dashboard.html")


@login_required
def advisor_dashboard(request):
    return render(request, "advisor_dashboard.html")


@login_required
def coordinator_dashboard(request):
    return render(request, "coordinator_dashboard.html")


@login_required
def director_dashboard(request):
    return render(request, "director_dashboard.html")


@login_required
def promo_coordinator_dashboard(request):
    return render(request, "promo_coordinator_dashboard.html")

def guest_dashboard(request):
    return render(request, 'guest_dashboard.html')

def apply_fair(request):
    return render(request, 'apply_fair.html')

def apply_tour(request):
    return render(request, 'apply_tour.html')

def apply_hs_tour(request):
    return render(request, 'apply_hs_tour.html')

def apply_ind_tour(request):
    return render(request, 'apply_ind_tour.html')

def give_feedback(request):
    return render(request, 'give_feedback.html')