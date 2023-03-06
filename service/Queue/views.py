from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.viewsets import ModelViewSet

from Queue.models import Queue
from Queue.serializers import QueueSerializer


# Create your views here.
class QueueViewSet(ModelViewSet):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAdminUser, )


class QueueRegisterView(CreateAPIView):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (IsAuthenticated, )

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
    permission_classes = (AllowAny, )

class QueueRetrieveView(RetrieveAPIView):
    queryset = Queue.objects.all()
    serializer_class = QueueSerializer
    permission_classes = (AllowAny, )
