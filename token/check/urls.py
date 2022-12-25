from django.urls import path
from .views import check_user, check_admin

urlpatterns = [
    path('/check/user/', check_user.as_view()),
    path('/check/admin/', check_admin.as_view()),
]
