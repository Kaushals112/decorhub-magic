
"""
WSGI config for vikash_vatika project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'vikash_vatika.settings')

application = get_wsgi_application()
