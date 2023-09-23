from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import AccessToken

from JWTUser.models import User
from Queue.models import Queue, UserQueueRelation
from Queue.serializers import QueueSerializer, UserQueueRelationRegisterSerializer


class UserQueueRelationRegisterViewApiTestCase(APITestCase):
    def test_register_user_in_queue(self):
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

        url = reverse('register_user_in_queue')

        access_token = AccessToken.for_user(user)
        token = str(access_token)
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.post(url, data={
            'user': user.pk,
            'queue': queue.pk,
        })

        user_queue_relation = UserQueueRelation.objects.get(user=user, queue=queue)
        serializer_data = UserQueueRelationRegisterSerializer(user_queue_relation).data

        self.assertEquals(status.HTTP_201_CREATED, response.status_code)
        self.assertEquals(serializer_data, response.data)


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
