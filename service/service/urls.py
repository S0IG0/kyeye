"""service URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework.routers import SimpleRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)

from JWTUser.views import (
    UserViewSet,
    UserRegisterView,
    UserUpdateView
)

from Queue.views import (
    QueueViewSet,
    QueueRegisterView,
    QueueListView,
    QueueRetrieveView
)

router = SimpleRouter()
router.register(r'api/admin/user', UserViewSet)
router.register(r'api/admin/queue', QueueViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    path('api/user/register/', UserRegisterView.as_view(), name='register_user'),
    path('api/user/update/<int:pk>', UserUpdateView.as_view(), name='update_user'),

    path('api/queue/register/', QueueRegisterView.as_view(), name='register_queue'),
    path('api/queue/', QueueListView.as_view(), name='list_queue'),
    path('api/queue/<int:pk>', QueueRetrieveView.as_view(), name='retrieve_queue'),
]
urlpatterns += router.urls
