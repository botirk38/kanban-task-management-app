from rest_framework import permissions, views, status
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer


class UpdateUserProfileView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user_profile, _ = UserProfile.objects.get_or_create(user = request.user)
        serializer = UserProfileSerializer(user_profile, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


