from django.shortcuts import render, redirect
from django.contrib import messages
from django.db import connection
from django.contrib.auth.decorators import login_required
from utils.vite import get_vite_asset_path

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
def guide_dashboard(request):
    return render(request, "guide_dashboard.html")

def advisor_dashboard(request):
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, "react_base.html", context)

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

def apply_fair(request):
    # Ensure React integration for the Apply Fair page
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, 'react_base.html', context)

def apply_tour(request):
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, 'react_base.html', context)

def apply_hs_tour(request):
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, 'react_base.html', context)

def apply_ind_tour(request):
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, 'react_base.html', context)

def give_feedback(request):
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, 'react_base.html', context)

def contact_us(request):
    # Ensure React integration for the Contact Us page
    context = {
        'main_js': get_vite_asset_path('index.html', 'file'),
        'main_css': get_vite_asset_path('index.html', 'css'),
    }
    return render(request, 'react_base.html', context)
