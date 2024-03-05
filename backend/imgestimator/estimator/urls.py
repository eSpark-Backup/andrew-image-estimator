from django.urls import path
from .views import *

urlpatterns = [
    path('img_upload/', ExtractCutout.as_view(), name='img_upload'),
    path('login/', LoginView.as_view(), name='login'),
    path('sign_up/', SignupView.as_view(), name='sign_up'),
]