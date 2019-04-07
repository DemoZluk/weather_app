from django.urls import path, include

from weather import views

appname = 'weather'

urlpatterns = [
  path('', views.MainPageView.as_view(), name='main_page'),
  path('api/v1/', include('weather.rest.urls')),
]
