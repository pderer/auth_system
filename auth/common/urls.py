from django.urls import path
from . import views
from .views import register_user, login_user, login_admin, register_admin

urlpatterns = [
    path('auth/user/login/', login_user.as_view(), name='login'),
    path('auth/user/register/', register_user.as_view(), name='register'),
    path('auth/admin/login/', login_admin.as_view(), name='admin_login'),
    path('auth/admin/register/', register_admin.as_view(), name='admin_register'),
]
