from .views import UserProfileView, LoginView, RegisterView, LogoutView, CheckSessionView,DeleteAccountView
from django.urls import path


urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='update_profile'),
    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('check-session/', CheckSessionView.as_view(), name="check-session"),
    path('delete_account/', DeleteAccountView.as_view(), name='delete_account'),
]
