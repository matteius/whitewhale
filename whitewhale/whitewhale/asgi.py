"""
ASGI config for whitewhale project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'whitewhale.settings.local')

django.setup()

from channels.routing import get_default_application
application = get_default_application()
