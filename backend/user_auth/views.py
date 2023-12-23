from rest_framework import permissions, views, status, generics
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer
from django.contrib.auth import login, authenticate, logout
from .serializers import UserSerializer


class UpdateUserProfileView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_profile, _ = UserProfile.objects.get_or_create(user = request.user)
        serializer = UserProfileSerializer(user_profile, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(views.APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)

        if user is None:
            return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        return Response({'message': 'User logged in successfully'})

class RegisterView(generics.CreateAPIView):
    serializer_class = UserSerializer

class LogoutView(views.APIView):
    def post(self, request, *args, **kwargs):
        logout(self.request)
        return Response({'message': 'User logged out successfuly'})
