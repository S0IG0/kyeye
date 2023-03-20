from django.utils import timezone

from datetime import timedelta

def now_time_plus_2_minutes():
    return timezone.now() + timedelta(seconds=120)