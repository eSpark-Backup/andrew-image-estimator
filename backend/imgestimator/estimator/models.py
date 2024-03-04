from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.core.validators import FileExtensionValidator
from django.core.exceptions import ValidationError
import magic


class client_manager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, password, **extra_fields)


class end_user(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = client_manager()

    def __str__(self):
        return self.email

img_ext_valid = FileExtensionValidator(["png", "jpg", "img"])


def valid_imgfile_type(file):
    accept = ["image/png", "image/jpeg", "application/octet-stream"]
    file_type = magic.from_buffer(file.read(1024), mime=True)
    if file_type not in accept:
        raise ValidationError(
            "Unsupported file type. Only PNG JPEG and IMG images are allowed."
        )
    limit = 10 * 1024 * 1024
    if file.size > limit:
        raise ValidationError("File too large. Size should not exceed 10 MB.")


class estimation(models.Model):
    id = models.AutoField(primary_key=True)
    user_id=models.EmailField()
    name = models.CharField(max_length=30)
    image = models.FileField(
        upload_to="estimations/",
        validators=[img_ext_valid, valid_imgfile_type],
        default="",
    )
    polygons=models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.name} - {self.user_id}"


class estimation_detail(models.Model):
    id = models.AutoField(primary_key=True)
    user_id=models.EmailField()
    image = models.FileField(
        upload_to="estimation_details/",
        validators=[img_ext_valid, valid_imgfile_type],
        default="",
    )
    wear_plate_type_est=models.CharField(max_length=30)
    wear_plate_type_curr=models.CharField(max_length=30)
    stich_welding=models.BooleanField()
    press_break_bends=models.IntegerField()
    bolt_holes=models.IntegerField()
    impact_type=models.CharField(max_length=30)
    zip_code=models.CharField(max_length=30)
    est_delivery_date=models.CharField(max_length=30)
    perimeter_welding=models.BooleanField()
    fasten_use_studs=models.IntegerField()
    roll_bends=models.IntegerField()
    abrasion_type=models.CharField(max_length=30)
    est_fabric_serv=models.BooleanField()
    deliver_site_date=models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.id} - {self.user_id}"