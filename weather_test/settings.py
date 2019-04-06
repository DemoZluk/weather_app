from .settings_default import *

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
  'django.contrib.contenttypes',
  'django.contrib.sessions',
  'django.contrib.messages',
  'django.contrib.staticfiles',
  'rest_framework',
  'weather',
]

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'Europe/Moscow'

