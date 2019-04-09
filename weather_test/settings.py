from .settings_default import *

DEBUG = True

ALLOWED_HOSTS = ['*']

INSTALLED_APPS = [
  # 'django.contrib.admin',
  'django.contrib.auth',
  'django.contrib.contenttypes',
  # 'django.contrib.sessions',
  # 'django.contrib.messages',
  'django.contrib.staticfiles',
  'rest_framework',
  'weather',
]

MIDDLEWARE = [
  'django.middleware.security.SecurityMiddleware',
  'whitenoise.middleware.WhiteNoiseMiddleware',
  # 'django.contrib.sessions.middleware.SessionMiddleware',
  'django.middleware.common.CommonMiddleware',
  'django.middleware.csrf.CsrfViewMiddleware',
  # 'django.contrib.auth.middleware.AuthenticationMiddleware',
  # 'django.contrib.messages.middleware.MessageMiddleware',
  'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK['DEFAULT_RENDERER_CLASSES'] += [
  'rest_framework.renderers.BrowsableAPIRenderer',
  'rest_framework.renderers.AdminRenderer',
]

LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'Europe/Moscow'

OWM_API_KEY = '91d190097aabba8262c5bc22d2167007'

STATIC_ROOT = os.path.join(BASE_DIR, 'weather/static/')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
