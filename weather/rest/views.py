import requests
from django.contrib.gis.geoip2 import GeoIP2
from geoip2.errors import AddressNotFoundError
from rest_framework.response import Response
from rest_framework.views import APIView

from weather_test.settings import OWM_API_KEY, OWM_DEFAULT_UNITS

BASE_URL = 'https://api.openweathermap.org/data/2.5/'


class GetWeatherAPIView(APIView):
  def get(self, request):
    city_name = request.GET.get('city_name')
    if city_name is None:
      forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
      if forwarded:
        user_ip = forwarded.split(',')[0]
      else:
        user_ip = request.META.get('REMOTE_ADDR')
      geo = GeoIP2()
      try:
        city = geo.city(user_ip)
        city_name = ','.join([city.get('city'), city.get('country_code')])
      except AddressNotFoundError:
        city_name = ''

    units = request.GET.get('units', OWM_DEFAULT_UNITS)
    url = f'{BASE_URL}weather?q={city_name}&units={units}&lang=ru&appid={OWM_API_KEY}'
    response = requests.get(url).json()
    return Response(response)
