from .views import UpdateUserProfileView
from django.urls import path


urlpatterns = [
    path('update-profile/', UpdateUserProfileView.as_view(), name='update_profile'),
]
