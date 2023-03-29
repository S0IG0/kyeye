import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'service.settings')
django.setup()

from JWTUser.models import User

if __name__ == '__main__':

    username = os.environ.get('DJANGO_SUPERUSER_USERNAME')
    password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
    email = os.environ.get('DJANGO_SUPERUSER_EMAIL')

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
