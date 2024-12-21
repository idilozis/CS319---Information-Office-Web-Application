from django.urls import path
from . import views
from .views import get_cities, get_highschools
from .views import submit_individual_tour

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("guide_dashboard/", views.react_view, name="guide_dashboard"),
    path("advisor_dashboard/", views.react_view, name="advisor_dashboard"),
    path("coordinator_dashboard/", views.react_view, name="coordinator_dashboard"),
    path("director_dashboard/", views.director_dashboard, name="director_dashboard"),
    path("promo_coordinator_dashboard/", views.promo_coordinator_dashboard, name="promo_coordinator_dashboard"),
    path("guest_dashboard/", views.guest_dashboard, name="guest_dashboard"),
    path("apply_fair/", views.react_view, name="apply_fair"),
    path("apply_tour/", views.react_view, name="apply_tour"),
    path("apply_hs_tour/", views.react_view, name="apply_hs_tour"),
    path("apply_ind_tour/", views.react_view, name="apply_ind_tour"),
    path("give_feedback/", views.react_view, name="give_feedback"),
    path("contact_us/", views.react_view, name="contact_us"),  # Added this line
    path("fairs/", views.react_view, name="fairs"),
    path("guide_fairs/", views.react_view, name="guide_fairs"),
    path('cities/', get_cities, name='get_cities'),
    path('highschools/<str:city>/', get_highschools, name='get_highschools'),
    path("tour_application/", views.react_view, name="tour_application"),
    path("guide_list/", views.react_view, name="guide_list"),
    path("advisor_tours/", views.react_view, name="advisor_tours"),
    path("puantaj_page/", views.react_view, name="puantaj_page"),
    path("settings/", views.react_view, name="settings"),
    path('submit_tour/', views.submit_tour, name='submit_tour'),
    path('submit_individual_tour/', submit_individual_tour, name='submit_individual_tour'),
    path('submit_university_fair/', views.submit_university_fair, name='submit_university_fair'),
    path('coordinator_puantaj/', views.react_view, name='coordinator_puantaj'),
    path("responsible_advisors/", views.react_view, name="responsible_advisors"),
    path("coordinator_fair_applications/", views.react_view, name="coordinator_fair_applications"),
    path("accepted_tours/", views.react_view, name="accepted_tours"),
    path("coordinator_accepted_tours/", views.react_view, name="coordinator_accepted_tours"),    
]

