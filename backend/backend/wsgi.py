"""
WSGI config for backend project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/wsgi/

Note:
  When deploying with Gunicorn, use the provided gunicorn_config.py to set a higher timeout.
  For example:
      gunicorn --config backend/gunicorn_config.py --chdir backend backend.wsgi:application
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

application = get_wsgi_application()
