import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from Queue.models import UserQueueRelation, Queue


class UserQueueRelationType(DjangoObjectType):
    class Meta:
        model = UserQueueRelation
        fields = (
            'user',
            'queue',
            'date_joined'
        )
        filter_fields = (
            'user',
            'queue',
            'date_joined'
        )
        interfaces = (relay.Node,)


class QueueType(DjangoObjectType):
    users = DjangoFilterConnectionField(UserQueueRelationType)

    class Meta:
        model = Queue
        fields = (
            'id',
            'name',
            'owner',
            'users',
            'date_creation',
            'date_activation',
            'is_active',
        )
        filter_fields = (
            'id',
            'name',
            'owner',
            'users',
            'date_creation',
            'date_activation',
            'is_active',
        )
        interfaces = (relay.Node,)

    id_ = graphene.Int()

    def resolve_id_(self, info):
        return self.id

    def resolve_users(self, info):
        return self.userqueuerelation_set.all()
