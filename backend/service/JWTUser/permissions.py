from rest_framework.permissions import BasePermission
from rest_framework.request import Request


class IsOwner(BasePermission):
    def has_permission(self, request: Request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.id == view.kwargs.get('pk', -1)
        )


class IsOwnerQueue(BasePermission):
    """
    Custom permission to only allow owners of an object to delete it.
    """
    message = 'You must be the owner of this queue to delete a subscriber.'

    def has_object_permission(self, request, view, obj):
        # Проверяем, является ли текущий пользователь владельцем очереди, к которой относится удаляемый объект
        return request.user.id == obj.owner.id


class IsSubscriberQueue(BasePermission):
    message = 'You must be the subscriber of this queue to delete a subscriber.'

    def has_object_permission(self, request: Request, view, obj):
        # Проверяем, является ли текущий пользователь подписчиком очереди, к которой относится удаляемый объект
        user_id = request.parser_context['kwargs']['user_id']
        return request.user.id == user_id and request.user in obj.users.all()
