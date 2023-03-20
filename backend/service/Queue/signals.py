from django.db.models.signals import post_save
from django.dispatch import receiver

from Queue.models import Queue
from Queue.tasks import activate_queue
from Queue.services import get_queue
from datetime import datetime, timedelta

@receiver(post_save, sender=Queue)
def update_stock(sender, instance: Queue, created, **kwargs):
    if created:
        queue_id = instance.pk
        queue = get_queue(queue_id)
        if (queue is not None) and (queue.is_active == False):
            result: timedelta = queue.date_activation - queue.date_creation
            seconds = result.total_seconds()
            if seconds > 0:
#                 activate_queue.apply_async((queue_id, ), etc=queue.date_activation)
#                 activate_queue.apply_async((queue_id, ), etc=datetime.utcnow() + timedelta(seconds=120))
                activate_queue.apply_async((queue_id, ), countdown=seconds)
            else:
                queue.is_active = True
                queue.save()
