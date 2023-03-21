from rest_framework import status
from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
    DestroyAPIView
)

from rest_framework.permissions import (
    IsAdminUser,
    IsAuthenticated,
)

from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from JWTUser.permissions import IsOwnerQueue, IsSubscriberQueue
from Queue.models import Queue, UserQueueRelation
from Queue.serializers import QueueSerializer, UserQueueRelationRegisterSerializer


# Create your views here.
class QueueViewSet(ModelViewSet):
    """
    A ViewSet for viewing, creating, updating, and deleting queue instances.

    ...

    Attributes
    ----------
    queryset : QuerySet
        The queryset of all Queue instances.
    serializer_class : Serializer
        The serializer class used for (de)serializing Queue instances.
    permission_classes : tuple
        The permission classes that the view requires. In this case, only users with admin credentials can access the view.

    Methods
    -------
    list(self, request, *args, **kwargs):
        Get a list of all queues.

    retrieve(self, request, *args, **kwargs):
        Get a single queue instance by id.

    create(self, request, *args, **kwargs):
        Create a new queue instance.

    update(self, request, *args, **kwargs):
        Update an existing queue instance by id.

    partial_update(self, request, *args, **kwargs):
        Partially update an existing queue instance by id.

    destroy(self, request, *args, **kwargs):
        Delete an existing queue instance by id.

    """
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAdminUser,)


class QueueRegisterView(CreateAPIView):
    """
    View for registering a new queue with the authenticated user as the owner.

    Required Payload:
    {
        "name": "string",
        "description": "string"
    }

    If successful, returns the created queue data with HTTP status code 201 Created.
    """
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        """
        Create a new queue with the authenticated user as the owner.

        Returns:
            Response -- The serialized data of the created queue with HTTP status code 201 Created.
        """
        queue = Queue(owner=request.user)
        serializer = self.get_serializer(queue, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class QueueListView(ListAPIView):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Get a list of all queues with optional filtering by user_id or owner_id.

        Parameters:
        - user_id (int): optional. Filters queues by user_id.
        - owner_id (int): optional. Filters queues by owner_id.

        Returns:
        - queryset (QuerySet): The filtered queryset of queues.
        """
        queryset = Queue.objects.all()
        user_id = self.request.query_params.get('user_id', None)
        owner_id = self.request.query_params.get('owner_id', None)

        if user_id is not None and owner_id is not None:
            queryset = (queryset.filter(users__id=user_id) | queryset.filter(owner__id=owner_id)).distinct()
        elif user_id is not None:
            queryset = queryset.filter(users__id=user_id)
        elif owner_id is not None:
            queryset = queryset.filter(owner_id=owner_id)

        return queryset


class QueueRetrieveView(RetrieveAPIView):
    """
    A view that allows authenticated users to retrieve a single Queue object.

    Endpoint: `api/queue/<int:pk>/`

    HTTP Methods:
        - GET: Retrieve a Queue object by primary key.

    Permissions:
        - User must be authenticated.

    Query Parameters:
        - `pk`: The primary key of the Queue object to retrieve.

    Returns:
        - On success: A JSON representation of the retrieved Queue object.
        - On failure: An error message and the corresponding HTTP status code.

    Example:
        ```
        GET api/queue/2/`

    {
        "id": 2,
        "name": "queue 2",
        "owner": {
            "id": 4,
            "username": "admin",
            "first_name": "admin",
            "last_name": "admin",
            "email": "admin@mail.ru"
        },
        "users": [
            {
                "user": {
                    "id": 4,
                    "username": "admin",
                    "first_name": "admin",
                    "last_name": "admin",
                    "email": "admin@mail.ru"
                },
                "date_joined": "2023-03-17T22:34:54Z"
            }
        ]
    }
        ```
    """
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticated,)


class UserQueueRelationRegisterView(CreateAPIView):
    """
       A view that allows authenticated users to create a UserQueueRelation object.

       Endpoint: `/api/queue/user/register/`

       HTTP Methods:
           - POST: Create a new UserQueueRelation object.

       Permissions:
           - User must be authenticated.

       Required Request Body Parameters:
           - `user_id`: The primary key of the User object to associate with the Queue.
           - `queue_id`: The primary key of the Queue object to associate with the User.

       Returns:
           - On success: A JSON representation of the created UserQueueRelation object.
           - On failure: An error message and the corresponding HTTP status code.

       Example:
           ```
           POST /api/queue/user/register/

           {
                "user_id": 1,
                "queue_id": 2,
           }

           {
                "user": 1,
                "queue": 1,
                "date_joined": "2023-03-17T22:51:39.900548Z"
           }
           ```
       """
    queryset = UserQueueRelation.objects.all()
    serializer_class = UserQueueRelationRegisterSerializer
    permission_classes = (IsAuthenticated,)


class UserQueueRelationDestroyView(DestroyAPIView):
    """
    UserQueueRelationDestroyView

    This view handles the deletion of a UserQueueRelation instance. It requires authentication and the user must be the owner
    of the queue.

    Allowed HTTP methods: DELETE

    Parameters:
    - user_id: The ID of the user associated with the UserQueueRelation instance to be deleted.
    - queue_id: The ID of the queue associated with the UserQueueRelation instance to be deleted.

    Returns:
    - 204 No Content: If the UserQueueRelation instance was successfully deleted.
    - 404 Not Found: If the UserQueueRelation instance, the associated Queue instance or the provided user_id or queue_id
        do not exist.
    - 401 Unauthorized: If the user is not authenticated or does not have permission to delete the UserQueueRelation
        instance.

    """

    queryset = UserQueueRelation.objects.all()
    serializer_class = UserQueueRelationRegisterSerializer
    permission_classes = (IsSubscriberQueue | IsOwnerQueue, IsAuthenticated)

    def delete(self, request, *args, **kwargs):
        self.check_permissions(request)
        user_id = kwargs.get('user_id')
        queue_id = kwargs.get('queue_id')
        try:
            queue = Queue.objects.get(pk=queue_id)
            self.check_object_permissions(
                request=self.request,
                obj=queue,
            )

            user_queue_relation = UserQueueRelation.objects.filter(user=user_id, queue=queue_id).last()
            user_queue_relation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except (UserQueueRelation.DoesNotExist, Queue.DoesNotExist, AttributeError):
            return Response({'detail': 'UserQueueRelation not found'}, status=status.HTTP_404_NOT_FOUND)
