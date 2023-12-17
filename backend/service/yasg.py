from django.urls import path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title='KYEYE',
        description='KYEYE',
        default_version='v1',
        license=openapi.License(name='License')
    ),
    public=True,
    permission_classes=[permissions.AllowAny, ],
)

urlpatterns = [
    path('api/swagger<format>/', schema_view.without_ui(cache_timeout=0), name='schema_json'),
    path('api/swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema_swagger_ui'),
    path('api/redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema_redoc'),
]
