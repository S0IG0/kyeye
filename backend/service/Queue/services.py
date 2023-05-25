from __future__ import annotations

from Queue.models import Queue


def get_queue(pk: int) -> Queue | None:
    queue = None
    try:
        queue = Queue.objects.get(pk=pk)
    except Queue.DoesNotExist as exception:
        print(exception)

    return queue
