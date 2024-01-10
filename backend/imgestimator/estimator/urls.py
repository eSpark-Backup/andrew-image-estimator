from django.urls import path
from .views import ExtractCutout

urlpatterns = [
    path('img_upload/', ExtractCutout.as_view(), name='img_upload'),
]