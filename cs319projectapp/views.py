from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login as auth_login
from django.contrib.auth.forms import AuthenticationForm
from django.http import HttpResponse
# from django.views.decorators.csrf import csrf_exempt



# Login view with role-based redirection
# @csrf_exempt
def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            auth_login(request, user)
            
            # Role-based redirection
            if user.role == "Guide":
                return redirect('guide_dashboard')  # Replace with actual Guide dashboard URL
            elif user.role == "Advisor":
                return redirect('advisor_dashboard')  # Replace with actual Advisor dashboard URL
            elif user.role == "Coordinator":
                return redirect('coordinator_dashboard')  # Replace with actual Coordinator dashboard URL
            elif user.role == "Director":
                return redirect('director_dashboard')  # Replace with actual Director dashboard URL
            elif user.role == "Promo_Coordinator":
                return redirect('promo_coordinator_dashboard')  # Replace with actual Promo Coordinator dashboard URL
            elif user.role == "Guest":
                return redirect('guest_page')  # Redirect guests to their page
            else:
                return HttpResponse("Role not assigned. Contact the administrator.")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {"form": form})


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


def guest_page(request):
    return render(request, "guest_page.html")
