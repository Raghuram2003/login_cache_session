from django.urls import path
from . import views

urlpatterns = [
    path('',views.api_home),
    path('register/',views.register),
    path('users/',views.users),
    path('login/',views.login),
    path('get_cache',views.get_cache),
    path('delete_cache',views.delete_cache),
    path('clear_cache',views.clear_cache),
    path('time_delta/',views.time_delta),
    path('time/',views.time)
    ]