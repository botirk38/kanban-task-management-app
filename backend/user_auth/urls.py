from .views import UpdateUserProfileView, LoginView, RegisterView, LogoutView
from django.urls import path


urlpatterns = [
    path('update-profile/', UpdateUserProfileView.as_view(), name='update_profile'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
]
