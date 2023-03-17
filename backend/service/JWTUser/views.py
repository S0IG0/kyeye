# Create your views here.
from rest_framework.generics import CreateAPIView, UpdateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.viewsets import ModelViewSet

from JWTUser.models import User
from JWTUser.permissions import IsOwner
from JWTUser.serializers import UserSerializer


class UserViewSet(ModelViewSet):
    """
    User ViewSet

    API endpoint that allows users to be viewed, created, edited or deleted.
    Only accessible by users with admin permissions.

    Attributes:
        queryset: A queryset of all User objects.
        serializer_class: A serializer class to convert User objects to JSON and vice versa.
        permission_classes: A list of permission classes that the view requires for user access.

    Methods:
        list: Get a list of all users.
        create: Create a new user.
        retrieve: Retrieve a specific user by ID.
        update: Update an existing user by ID.
        destroy: Delete a user by ID.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsAdminUser,)


class UserRegisterView(CreateAPIView):
    """
    User Register View

    API endpoint that allows new users to be registered.

    Attributes:
        queryset: A queryset of all User objects.
        serializer_class: A serializer class to convert User objects to JSON and vice versa.
        permission_classes: A list of permission classes that the view requires for user access.

    Methods:
        create: Create a new user with the provided data.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (AllowAny,)


class UserUpdateView(UpdateAPIView):
    """
    User Update View

    API endpoint that allows a user to be updated.
    Accessible by the owner of the user account or by users with admin permissions.

    Attributes:
        queryset: A queryset of all User objects.
        serializer_class: A serializer class to convert User objects to JSON and vice versa.
        permission_classes: A list of permission classes that the view requires for user access.

    Methods:
        update: Update the user with the provided data.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwner | IsAdminUser,)


class UserRetrieveView(RetrieveAPIView):
    """
    User Retrieve View

    API endpoint that allows a user to be retrieved.
    Accessible by the owner of the user account or by users with admin permissions.

    Attributes:
        queryset: A queryset of all User objects.
        serializer_class: A serializer class to convert User objects to JSON and vice versa.
        permission_classes: A list of permission classes that the view requires for user access.

    Methods:
        retrieve: Retrieve the user with the provided ID.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (IsOwner | IsAdminUser,)
