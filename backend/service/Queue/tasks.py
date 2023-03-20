from datetime import timedelta
from time import sleep
from celery import shared_task
from Queue.services import get_queue


@shared_task
def activate_queue(queue_id):
    queue = get_queue(queue_id)
    if queue is not None:
        queue.is_active = True
        queue.save()
