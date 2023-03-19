from django.db.models.signals import post_save
from django.dispatch import receiver

from Queue.models import Queue
from Queue.tasks import activate_queue


@receiver(post_save, sender=Queue)
def update_stock(sender, instance: Queue, created, **kwargs):
    if created:
        activate_queue.delay(instance.pk)
