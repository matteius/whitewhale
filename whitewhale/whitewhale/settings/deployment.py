import os
from .base import *


DEBUG = False

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]

ALLOWED_HOSTS = ['whitewhale.mobi', 'www.whitewhale.mobi']

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('DATABASE_NAME'),
        'USER': os.getenv('DATABASE_USER'),
        'PASSWORD': os.getenv('DATABASE_PASSWORD'),
        'HOST': os.getenv('DATABASE_HOST'),
        'PORT': os.getenv('DATABASE_PORT'),
        'OPTIONS': {'sslmode': 'require'},
    }
}

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY')
