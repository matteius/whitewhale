from datetime import datetime
from django.shortcuts import render
from rest_framework import generics

from .serializers import BlogEntryListSerializer
from .models import BlogEntry


def index(request):
    return render(request, 'index.html', {})


class BlogEntryListView(generics.ListAPIView):
    queryset = BlogEntry.objects.filter(publish_date__lte=datetime.now())
    serializer_class = BlogEntryListSerializer
    lookup_field = 'slug'
