from rest_framework import serializers

from django.contrib.auth.models import User
from .models import BlogEntry, UserProfile, Comment


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class AuthorSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)

    class Meta:
        model = UserProfile
        fields = ['user', 'website']


class BlogEntrySerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=False, read_only=True)

    class Meta:
        model = BlogEntry
        fields = ['id', 'author', 'body', 'meta_description', 'publish_date', 'slug', 'subtitle', 'title']


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        exclude = ['approved']
