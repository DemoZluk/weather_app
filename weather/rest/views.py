from rest_framework.response import Response
from rest_framework.views import APIView

from weather.models import City


class GetWeatherAPIView(APIView):
  def get(self, request):
    city_name = request.GET.get('city_name')
    city = City(name=city_name)
    response = city.get_weather(request)

    return Response(response)
