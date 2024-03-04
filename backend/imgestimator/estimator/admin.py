from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(end_user)
admin.site.register(User)
admin.site.register(Estimation)
admin.site.register(EstimationDetail)