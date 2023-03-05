from django.contrib.auth.hashers import make_password
from django.contrib.auth.password_validation import validate_password, UserAttributeSimilarityValidator
from django.core.exceptions import ValidationError
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from JWTUser.models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
            'password',
        )

        extra_kwargs = {
            'first_name': {
                'required': True,
            },

            'last_name': {
                'required': True,
            },

            'email': {
                'required': True,
            },

            'password': {
                'write_only': True,
            },

            'is_active': {
                'read_only': True,
            },

            'id': {
                'read_only': True,
            },
        }

    def create(self, validated_data):

        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            password=make_password(validated_data['password']),
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )

        try:
            validate_password(password=validated_data['password'], user=user)
            user.save()

        except ValidationError as exception:
                raise serializers.ValidationError(
                    {'password': [except_ for except_ in exception]}
                )
        return user
