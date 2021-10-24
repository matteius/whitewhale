from rest_framework import serializers

from .models import BlogEntry


class BlogEntryListSerializer(serializers.ModelSerializer):

    class Meta:
        model = BlogEntry
        fields = ['slug', 'publish_date', 'title', 'subtitle', 'meta_description', 'body']
