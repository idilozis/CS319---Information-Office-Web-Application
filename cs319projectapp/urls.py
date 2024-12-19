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
    path("apply_fair/", views.apply_fair, name="apply_fair"),
    path("apply_tour/", views.apply_tour, name="apply_tour"),
    path("apply_hs_tour/", views.apply_hs_tour, name="apply_hs_tour"),
    path("apply_ind_tour/", views.apply_ind_tour, name="apply_ind_tour"),
    path("give_feedback/", views.give_feedback, name="give_feedback"),
    path("contact_us/", views.contact_us, name="contact_us"),  # Added this line
    path('fairs/', views.fairs_page, name='fairs'),
]

