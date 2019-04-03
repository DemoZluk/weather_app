from django import views
from django.shortcuts import render


class MainPageView(views.View):
  def get(self, request):
    return render(request, 'weather/pages/main.html')
