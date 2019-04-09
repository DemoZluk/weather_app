import requests
from django.contrib.gis.geoip2 import GeoIP2
from geoip2.errors import AddressNotFoundError

from weather_test.settings import OWM_API_KEY


class City:
  BASE_URL = 'https://api.openweathermap.org/data/2.5/'
  DEFAULT_CITY = 'Moscow'
  OWM_DEFAULT_UNITS = 'metric'
  UNITS = {
    'metric': {
      'temperature': '°C',
      'wind_speed': 'м/с',
      'pressure': 'мм рт. ст.',
    },
    'imperial': {
      'temperature': '°F',
      'wind_speed': 'mph',
      'pressure': 'mbar',
    },
  }

  def __init__(self, name):
    self.name = name

  def get_weather(self, request):
    city_name = self.name

    if city_name is None:
      forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
      if forwarded:
        user_ip = forwarded.split(',')[0]
      else:
        user_ip = request.META.get('REMOTE_ADDR')
      print(user_ip)
      geo = GeoIP2()
      try:
        city = geo.city(user_ip)
        print(city)
        city_name = ','.join([city.get('city'), city.get('country_code')])
      except AddressNotFoundError:
        city_name = self.DEFAULT_CITY

    print(city_name)

    units = request.GET.get('units', self.OWM_DEFAULT_UNITS)
    url = f'{self.BASE_URL}weather?q={city_name}&units={units}&lang=ru&appid={OWM_API_KEY}'
    response = requests.get(url).json()
    if response['cod'] == 200:
      if units == 'metric':
        response['wind']['speed'] = f"{response['wind']['speed']} {self.UNITS['metric']['wind_speed']}"
        response['main']['pressure'] = f"{round(response['main']['pressure'] * 0.750062)} {self.UNITS['metric']['pressure']}"
      else:
        response['wind']['speed'] = f"{response['wind']['speed']} {self.UNITS['imperial']['wind_speed']}"
        response['main']['pressure'] = f"{round(response['main']['pressure'])} {self.UNITS['imperial']['pressure']}"

      response['visibility'] = round(response['visibility'] / 1000, 1)

    return response
