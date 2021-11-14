import logging
import os
from typing import Optional

from fastapi import FastAPI

os.environ['DJANGO_SETTINGS_MODULE'] = "whitewhale.settings.local"
import django
django.setup()

from django.utils import timezone

from blog.models import BlogEntry
from blog.serializers import BlogEntrySerializer
import cProfile


app = FastAPI()

# Code Profiling Options
#from fastapi_cprofile.profiler import CProfileMiddleware
## Option 1 - Proifle to a file but looses visibility of overall execution time
#app.add_middleware(CProfileMiddleware, enable=True, server_app=app, filename='/tmp/output.pstats', strip_dirs=False, sort_by='cumulative')
## Option 2 - Profile to console but no ability to generate a nice graph
#app.add_middleware(CProfileMiddleware, enable=True, print_each_request=True, strip_dirs=False, sort_by='cumulative')


log = logging.getLogger(__name__)


# def profile_method(func):
#     def wrapper(*args, **kwargs):
#         log.info("Inside Profile Decorator")
#         cProfile.runctx('func(*args, **kwargs)', globals(), locals(), '/tmp/cProfileOutputFile')
#     return wrapper


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/blog/posts")
def blog_posts():
    queryset = BlogEntry.objects.filter(publish_date__lte=timezone.now()).order_by('-publish_date')
    serializer = BlogEntrySerializer(queryset, many=True)
    return serializer.data


@app.get("/blog/posts2")
def blog_posts():
    entries = BlogEntry.objects.filter(publish_date__lte=timezone.now()).order_by('-publish_date').values()
    result = []
    for e in entries:
        result.append(e)
    return result
