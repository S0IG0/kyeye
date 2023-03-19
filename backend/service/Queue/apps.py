from django.apps import AppConfig


class QueueConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'Queue'

    def ready(self):
        import Queue.signals