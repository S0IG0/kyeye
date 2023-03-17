from rest_framework.permissions import BasePermission
from rest_framework.request import Request


class IsOwner(BasePermission):
    def has_permission(self, request: Request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.id == view.kwargs.get('pk', -1)
        )
