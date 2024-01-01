from rest_framework import serializers
from .models import UserProfile
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.contrib.auth.password_validation import validate_password
from django.db import transaction


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        if self.instance and self.instance.username == value:
            return value

        if User.objects.filter(username=value).exists():
            raise ValidationError("A user with that username already exists.")
        return value

    def validate_email(self, value):
        normalized_email = User.objects.normalize_email(value)

        if self.instance and self.instance.email == normalized_email:
            return value

        if User.objects.filter(email=normalized_email).exists():
            raise ValidationError("A user with that email already exists.")
        return normalized_email

    def validate_password(self, value):
        user = User(username=self.initial_data.get('username'),
                    email=self.initial_data.get('email'))
        validate_password(value, user=user)
        return value

    def create(self, validated_data):
        validated_data['email'] = User.objects.normalize_email(
            validated_data.get('email'))
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)

        if 'email' in validated_data:
            validated_data['email'] = User.objects.normalize_email(
                validated_data.get('email'))

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)

    class Meta:
        model = UserProfile
        fields = ['name', 'bio', 'birth_date', 'user']

    def update(self, instance, validated_data):
        with transaction.atomic():
            user_data = validated_data.pop('user', None)

            if user_data:
                user_serializer = UserSerializer(
                    instance.user, data=user_data, partial=True)
                if user_serializer.is_valid(raise_exception=True):
                    user_serializer.save()

                if 'username' in user_data:
                    instance.last_user_name_change = timezone.now()

            # Update UserProfile fields
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()

            return instance

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['user'] = UserSerializer(instance.user).data
        return representation
