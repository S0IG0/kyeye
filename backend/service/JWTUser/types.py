from graphene import relay
from graphene_django import DjangoObjectType

from JWTUser.models import User


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
        filter_fields = (
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'is_active',
        )
        interfaces = (relay.Node,)
