from graphene import (
    ObjectType,
    Schema,
    Int,
)
from graphql import GraphQLError

from Queue.types import (
    QueueType,
    UserQueueRelationType,
)

from graphene_django.filter import DjangoFilterConnectionField
from rest_framework_simplejwt.tokens import AccessToken

from JWTUser.types import UserType
from Queue.models import Queue


class Query(ObjectType):
    userType = UserType
    userQueueRelationType = UserQueueRelationType
    queues = DjangoFilterConnectionField(
        QueueType,
        user_id=Int(required=False),
        owner_id=Int(required=False),
    )

    def resolve_queues(self, info, **kwargs):
        try:
            AccessToken(info.context.headers.get('Authorization', None).split()[1])
        except Exception as exception:
            print(exception)
            return Queue.objects.none()

        user_id = kwargs.get('user_id', None)
        owner_id = kwargs.get('owner_id', None)
        queryset = Queue.objects.all()

        if user_id is not None and owner_id is not None:
            queryset = (queryset.filter(users__id=user_id) | queryset.filter(owner_id=owner_id)).distinct()
        elif user_id is not None:
            queryset = queryset.filter(users__id=user_id)
        elif owner_id is not None:
            queryset = queryset.filter(owner_id=owner_id)

        return queryset


schema = Schema(query=Query)
