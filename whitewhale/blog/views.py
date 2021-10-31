from datetime import datetime
from django.shortcuts import render
from rest_framework import generics

from .serializers import BlogEntrySerializer, CommentSerializer
from .models import BlogEntry, Comment


def index(request):
    return render(request, 'index.html', {})


class BlogEntryListView(generics.ListAPIView):
    queryset = BlogEntry.objects.filter(publish_date__lte=datetime.now()).order_by('-publish_date')
    serializer_class = BlogEntrySerializer
    lookup_field = 'slug'


class CommentView(generics.ListCreateAPIView):
    queryset = Comment.objects.filter(approved=True)
    serializer_class = CommentSerializer

