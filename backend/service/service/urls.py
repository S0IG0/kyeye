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
from django.conf import settings
from django.conf.urls.static import static
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
    UserUpdateView,
    UserRetrieveView,
)

from Queue.views import (
    QueueViewSet,
    QueueRegisterView,
    QueueListView,
    QueueRetrieveView,
    UserQueueRelationRegisterView,
    UserQueueRelationDestroyView,
)
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt



router = SimpleRouter()
router.register(r'api/admin/user', UserViewSet)
router.register(r'api/admin/queue', QueueViewSet)

urlpatterns = [
    path('api/graphql', csrf_exempt(GraphQLView.as_view(graphiql=True))),

    # Панель администратора
    path('api/admin/', admin.site.urls),

    # Получение токена, нужно предоставить email и password, возвращает access и refresh токен
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Обновление токена, нужно предоставить refresh токен, возвращает access токен
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # Верификация токена, нужно предоставить access токен, возвращает status 200 если верификация пройдена
    path('api/token/verify/', TokenVerifyView.as_view(), name='token_verify'),

    # Регистрация пользователей, нужно предоставить (
    #             'username',
    #             'first_name',
    #             'last_name',
    #             'email',
    #             'password',
    # )
    # Возвращает поля (
    #             'id',
    #             'username',
    #             'first_name',
    #             'last_name',
    #             'email',
    #             'is_active',
    # )
    path('api/user/register/', UserRegisterView.as_view(), name='register_user'),
    # Получение информации о конкретном пользователе
    path('api/user/<int:pk>', UserRetrieveView.as_view(), name='user_concrete'),
    # Изменение данных пользователей, нужно предоставить поле которое нужно изменить.
    # Возвращает поля (
    #             'id',
    #             'username',
    #             'first_name',
    #             'last_name',
    #             'email',
    #             'is_active',
    # )
    path('api/user/update/<int:pk>', UserUpdateView.as_view(), name='update_user'),

    # Регистрация пользователя в очереди, нужно предоставить id пользователя и id очереди,
    # возвращает id пользователя и id очереди
    path('api/queue/user/register/', UserQueueRelationRegisterView.as_view(), name='register_user_in_queue'),
    # Удаление пользователя из очереди, нужно составить правильный url, возвращает HTTP_204_NO_CONTENT
    path('api/queue/user/destroy/<int:user_id>/<int:queue_id>/',
         UserQueueRelationDestroyView.as_view(), name='destroy_user_in_queue'),
    # Регистрация очереди, нужно предоставить название очереди, возвращает всю информацию об очереди
    path('api/queue/register/', QueueRegisterView.as_view(), name='register_queue'),
    # Просмотр информации о всех очередях
    # Можно предавать в запросе user_id и owner_id
    path('api/queue/', QueueListView.as_view(), name='list_queue'),
    # Просмотр информации конкретной очереди
    path('api/queue/<int:pk>/', QueueRetrieveView.as_view(), name='retrieve_queue'),
]
urlpatterns += router.urls
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
