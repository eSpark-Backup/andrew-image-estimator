from django.urls import path
from .views import *

urlpatterns = [
    path('img_upload/', ExtractCutout.as_view(), name='img_upload'),
    path('login/', LoginView.as_view(), name='login'),
    path('sign_up/', SignupView.as_view(), name='sign_up'),
    path('create_est/', CreateEstimtion.as_view(), name='create_estimation'),
    path('update_est/', UpdateEstimtion.as_view(), name='update_estimation'),
    path('home/', Dashboard.as_view(), name='home'),
    path('email/', EmailSend.as_view(), name='email'),
    path('edit/', EditView.as_view(), name='email'),
]