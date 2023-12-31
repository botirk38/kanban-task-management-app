from rest_framework import permissions, views, status, generics
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth import login, authenticate, logout
from .serializers import UserSerializer
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
import logging
from rest_framework.permissions import IsAuthenticated

logger = logging.getLogger(__name__)


class UserProfileView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_profile, _ = UserProfile.objects.get_or_create(user=request.user)
        serializer = UserProfileSerializer(user_profile, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        user_profile = get_object_or_404(UserProfile, user=request.user)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        user_profile = get_object_or_404(UserProfile, user=request.user)
        serializer = UserProfileSerializer(user_profile, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        logger.error(f"UserProfile update failed: {serializer.errors}")

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        return Response({'message': 'User logged in successfully'})


class RegisterView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.none()


class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        logout(self.request)
        return Response({'message': 'User logged out successfuly'})

class CheckSessionView(views.APIView):

    def get(self, request, *args, **kwargs):
        user = request.user

        if user.is_authenticated:
            return Response( {'isLoggedIn' : True} , status=status.HTTP_200_OK)

        else:
            return Response( {'isLoggedIn' : False } , status= status.HTTP_200_OK)

class DeleteAccountView(views.APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, *args, **kwargs):
        user = request.user

        try :
            user.delete();
            return Response({"message": "User account has been deleted."}, status=status.HTTP_200_OK)

        except:
            return Response({"error": "User account could not be deleted."}, status=status.HTTP_400_BAD_BAD_REQUEST)
