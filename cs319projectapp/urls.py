from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.login_view, name="login"),
    path("guide_dashboard/", views.guide_dashboard, name="guide_dashboard"),
    path("advisor_dashboard/", views.advisor_dashboard, name="advisor_dashboard"),
    path("coordinator_dashboard/", views.coordinator_dashboard, name="coordinator_dashboard"),
    path("director_dashboard/", views.director_dashboard, name="director_dashboard"),
    path("promo_coordinator_dashboard/", views.promo_coordinator_dashboard, name="promo_coordinator_dashboard"),
    path("guest_dashboard/", views.guest_dashboard, name="guest_dashboard"),
    path("apply_ind_tour/", views.apply_ind_tour, name="apply_ind_tour"),  # Individual Tour Application
    path("apply_fair/", views.apply_fair, name="apply_fair"),  # Apply Fair
    path("apply_tour/", views.apply_tour, name="apply_tour"),  # Apply Tour
    path("apply_hs_tour/", views.apply_hs_tour, name="apply_hs_tour"),  # High School Tour
    path("give_feedback/", views.give_feedback, name="give_feedback"),  # Feedback
]
