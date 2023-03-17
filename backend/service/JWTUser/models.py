from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin, UserManager, AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.core.mail import send_mail
from django.core.validators import EmailValidator
from django.db import models
from django.utils import timezone


class User(AbstractBaseUser, PermissionsMixin):
    """
    Custom user model that inherits from AbstractBaseUser and PermissionsMixin.
    Fields:
    - username: Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
    - first_name: First name of the user.
    - last_name: Last name of the user.
    - email: Required. Unique email address of the user.
    - is_staff: Designates whether the user can log into this admin site.
    - is_active: Designates whether this user should be treated as active.
    - date_joined: Date and time when the user joined the platform.
    """

    username_validator = UnicodeUsernameValidator()
    email_validator = EmailValidator()

    username = models.CharField(
        "username",
        max_length=150,
        unique=True,
        help_text=
        "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ,
        validators=[username_validator],
        error_messages={
            "unique": "A user with that username already exists.",
        },
    )
    first_name = models.CharField("first name", max_length=150, )
    last_name = models.CharField("last name", max_length=150, )
    email = models.EmailField(
        "email address",
        unique=True,
        validators=[email_validator],
        error_messages={
            "unique": "A user with that email address already exists.",
        },
    )
    is_staff = models.BooleanField(
        "staff status",
        default=False,
        help_text="Designates whether the user can log into this admin site.",
    )
    is_active = models.BooleanField(
        "active",
        default=True,
        help_text=
        "Designates whether this user should be treated as active. "
        "Unselect this instead of deleting accounts."
        ,
    )
    date_joined = models.DateTimeField("date joined", default=timezone.now)

    objects = UserManager()

    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    class Meta:
        verbose_name = "user"
        verbose_name_plural = "users"

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """Return the short name for the user."""
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """Send an email to this user."""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    class Meta(AbstractUser.Meta):
        swappable = "AUTH_USER_MODEL"
