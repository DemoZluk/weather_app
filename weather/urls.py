from django.urls import path

from weather import views

appname = 'weather'

urlpatterns = [
  path('', views.MainPageView.as_view(), name='main_page')
]
