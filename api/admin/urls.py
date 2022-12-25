from django.urls import path
from .views import userlist
urlpatterns = [
    path('/admin/userlist/', userlist.as_view()),
]
