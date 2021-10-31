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


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        queryset = Comment.objects.filter(approved=True)
        model = Comment
        exclude = ['approved']


class BlogEntrySerializer(serializers.ModelSerializer):
    author = AuthorSerializer(many=False, read_only=True)
    comments = serializers.SerializerMethodField('get_comments')

    def get_comments(self, entry):
        comments = Comment.objects.filter(entry=entry, approved=True)
        serializer = CommentSerializer(instance=comments, many=True)
        return serializer.data

    class Meta:
        model = BlogEntry
        fields = ['id', 'author', 'body', 'comments', 'meta_description',
                  'publish_date', 'slug', 'subtitle', 'title']
