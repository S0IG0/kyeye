from django.contrib import admin

from Queue.models import Queue, UserQueueRelation

# Register your models here.
admin.site.register(Queue)
admin.site.register(UserQueueRelation)
