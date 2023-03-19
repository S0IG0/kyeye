from datetime import timedelta
from time import sleep
from celery import shared_task
from Queue.services import get_queue


@shared_task
def activate_queue(queue_id):
    queue = get_queue(queue_id)

    if (queue is not None) and (queue.is_active == False):

        result: timedelta = queue.date_activation - queue.date_creation
        seconds = result.total_seconds()

        if seconds > 0:
            sleep(seconds)

        queue = get_queue(queue_id)
        if queue is not None:
            queue.is_active = True
            queue.save()
