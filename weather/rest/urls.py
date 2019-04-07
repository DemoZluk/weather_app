from django.urls import path

from weather.rest import views as api_views

appname = 'weather_api'

urlpatterns = [
  path('get_weather', api_views.GetWeatherAPIView.as_view(), name='main_page'),
]
