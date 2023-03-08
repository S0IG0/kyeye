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
    AllowAny
)

from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.viewsets import ModelViewSet

from Queue.models import Queue, UserQueueRelation
from Queue.serializers import QueueSerializer, UserQueueRelationRegisterSerializer


# Create your views here.
class QueueViewSet(ModelViewSet):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAdminUser,)


class QueueRegisterView(CreateAPIView):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request: Request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        queue = Queue(owner=request.user)
        serializer = self.get_serializer(queue, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}


class QueueListView(ListAPIView):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (AllowAny,)


class QueueRetrieveView(RetrieveAPIView):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (AllowAny,)


class UserQueueRelationRegisterView(CreateAPIView):
    queryset = UserQueueRelation.objects.all()
    serializer_class = UserQueueRelationRegisterSerializer
    permission_classes = (AllowAny,)


class UserQueueRelationDestroyView(DestroyAPIView):
    queryset = UserQueueRelation.objects.all()
    serializer_class = UserQueueRelationRegisterSerializer
    permission_classes = (AllowAny,)

    def delete(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        queue_id = kwargs.get('queue_id')
        try:
            user_queue_relation = UserQueueRelation.objects.filter(user=user_id, queue=queue_id).last()
            user_queue_relation.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except (UserQueueRelation.DoesNotExist, AttributeError):
            return Response({'detail': 'UserQueueRelation not found'}, status=status.HTTP_404_NOT_FOUND)
