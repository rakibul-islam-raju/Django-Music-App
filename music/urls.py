from django.urls import path

from .views import *

app_name = 'music'

urlpatterns = [
    path('', home_page, name='home')
]
