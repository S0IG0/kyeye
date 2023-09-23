from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from JWTUser.models import User
from Queue.models import Queue
from Queue.serializers import QueueSerializer


class QueueRetrieveViewApiTestCase(APITestCase):

    def test_get_api(self):
        user, created = User.objects.get_or_create(
            username='user',
            defaults={
                'password': 'password',
                'first_name': 'first name',
                'last_name': 'last name',
                'email': 'example@mail.ru',
            }
        )

        queue = Queue.objects.create(
            name='Queue Name',
            owner=user,
            date_creation=timezone.now(),
            date_activation=timezone.now(),
            is_active=True,
        )

        url = reverse("retrieve_queue", args=[queue.pk])

        access_token = AccessToken.for_user(user)
        token = str(access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get(url)

        serializer_data = QueueSerializer(queue).data

        self.assertEquals(status.HTTP_200_OK, response.status_code)
        self.assertEquals(serializer_data, response.data)

