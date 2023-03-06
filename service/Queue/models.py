from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone

from JWTUser.models import User


# Create your models here.
class Queue(models.Model):
    # name_validator = UnicodeUsernameValidator()

    name = models.CharField(
        'name',
        max_length=255,
        # validators=(name_validator, )
    )

    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='owner',
    )

    users = models.ManyToManyField(
        User,
        through='UserQueueRelation',
        related_name='subscribers'
    )

    def __str__(self) -> str:
        return f'{self.name}: {self.pk}'

class UserQueueRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    queue = models.ForeignKey(Queue, on_delete=models.CASCADE)
    date_joined = models.DateTimeField("date joined", default=timezone.now)
    def __str__(self) -> str:
        return f'{self.user.email}: {self.queue.name}, date_joined: {self.date_joined}'
