from graphene_django import DjangoObjectType
import graphene

from JWTUser.models import User
from Queue.models import Queue, UserQueueRelation


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
        )


class UserQueueRelationType(DjangoObjectType):
    class Meta:
        model = UserQueueRelation


class QueueType(DjangoObjectType):
    users = graphene.List(UserQueueRelationType)

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

    def resolve_users(self, info):
        return self.userqueuerelation_set.all()


class Query(graphene.ObjectType):
    users = graphene.List(UserType)
    queues = graphene.List(QueueType)
    user_queue_relations = graphene.List(UserQueueRelationType)

    def resolve_users(self, info):
        return User.objects.all()

    def resolve_queues(self, info):
        return Queue.objects.all()

    def resolve_user_queue_relations(self, info):
        return UserQueueRelation.objects.all()


schema = graphene.Schema(query=Query)
