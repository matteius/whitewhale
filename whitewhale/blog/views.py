from datetime import datetime
from django.shortcuts import render
from django.utils import timezone
from rest_framework import generics

from .serializers import BlogEntrySerializer, CommentSerializer
from .models import BlogEntry, Comment


def index(request):
    return render(request, 'index.html', {})


class BlogEntryListView(generics.ListAPIView):
    serializer_class = BlogEntrySerializer
    lookup_field = 'slug'

    def get_queryset(self):
        return BlogEntry.objects.filter(publish_date__lte=timezone.now()).order_by('-publish_date')


class CommentView(generics.ListCreateAPIView):
    queryset = Comment.objects.filter(approved=True)
    serializer_class = CommentSerializer

