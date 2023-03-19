from rest_framework.serializers import ModelSerializer

from JWTUser.models import User
from Queue.models import Queue, UserQueueRelation


class QueueOwnerSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
        )


class QueueUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
        )


class UserQueueRelationSerializer(ModelSerializer):
    user = QueueUserSerializer(read_only=True)

    class Meta:
        model = UserQueueRelation
        fields = (
            'user',
            'date_joined',
        )


class UserQueueRelationRegisterSerializer(ModelSerializer):
    class Meta:
        model = UserQueueRelation
        fields = (
            'user',
            'queue',
            'date_joined',
        )
        extra_kwargs = {
            'user': {
                'required': True,
            },
            'queue': {
                'required': True,
            },
            'date_joined': {
                'read_only': True,
            },
        }


class QueueSerializer(ModelSerializer):
    owner = QueueOwnerSerializer(read_only=True)
    users = UserQueueRelationSerializer(
        source='userqueuerelation_set', many=True, read_only=True
    )

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
        extra_kwargs = {
            'date_activation': {
                'required': True,
            },
            'is_active': {
                'read_only': True,
            },
            'date_creation': {
                'read_only': True,
            },
        }
