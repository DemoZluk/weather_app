import os
from wsgiref.util import FileWrapper

from django import views
from django.contrib.gis.geoip2 import GeoIP2
from django.http import FileResponse, Http404
from django.shortcuts import render
from geoip2.errors import AddressNotFoundError

from weather_test.settings_default import BASE_DIR


class MainPageView(views.View):
  def get(self, request):
    forwarded = request.META.get('HTTP_X_FORWARDED_FOR')
    if forwarded:
      user_ip = forwarded.split(',')[0]
    else:
      user_ip = request.META.get('REMOTE_ADDR')
    geo = GeoIP2()
    try:
      city = geo.city(user_ip)
    except AddressNotFoundError:
      city = False

    return render(request, 'weather/pages/main.html', {'ip': user_ip, 'city': city})


def fonts_resolver(request, name):
  file = open(os.path.join(BASE_DIR, 'weather/static/weather/bundles/font/') + name, 'rb')
  response = FileResponse(file, content_type='octet-stream')
  return response
