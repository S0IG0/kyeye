from django.db import models
from django.utils import timezone

from JWTUser.models import User
from JWTUser.services import now_time_plus_2_minutes


# Create your models here.
class Queue(models.Model):
    """
    Queue model.

    This model represents a queue with a name, owner, and a list of subscribed users.

    Attributes:
    - name (str): The name of the queue.
    - owner (ForeignKey): The user who owns the queue.
    - users (ManyToManyField): The list of users subscribed to the queue.
    - date_created (DateTimeField): The time at which the queue was created.
    - date_activation (DateTimeField): The time after which the queue should become active.
    - is_active (BooleanField): The Indicator of the queue's readiness for use.


    Methods:
    - __str__(): Returns a string representation of the queue, which includes the queue name and its primary key.

    """

    name = models.CharField(
        'name',
        max_length=255,
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

    date_creation = models.DateTimeField(
        'date creation',
        default=timezone.now
    )

    date_activation = models.DateTimeField(
        'date activation',
        default=now_time_plus_2_minutes,
    )

    is_active = models.BooleanField(
        'is_active',
        default=False
    )

    def __str__(self) -> str:
        return f'{self.name}: {self.pk}'


class UserQueueRelation(models.Model):
    """
    UserQueueRelation model.

    This model represents the relationship between a user and a queue. It includes the user, the queue, and the date they
    joined the queue.

    Attributes:
    - user (ForeignKey): The user subscribed to the queue.
    - queue (ForeignKey): The queue the user is subscribed to.
    - date_joined (datetime): The date and time the user joined the queue.

    Methods:
    - __str__(): Returns a string representation of the UserQueueRelation instance, which includes the email of the user,
      the name of the queue, and the date they joined the queue.

    """

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    queue = models.ForeignKey(Queue, on_delete=models.CASCADE)
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    def __str__(self) -> str:
        return f'{self.user.email}: {self.queue.name}, date_joined: {self.date_joined}'
