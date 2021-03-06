from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT)
    website = models.URLField(blank=True)
    bio = models.TextField()

    def __str__(self):
        return f"{self.user.username} {self.user.email}"


class Tag(models.Model):
    name = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return self.name


class BlogEntry(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    publish_date = models.DateTimeField(null=True)
    author = models.ForeignKey(UserProfile, on_delete=models.PROTECT)
    slug = models.CharField(max_length=128, unique=True)
    title = models.CharField(max_length=1024)
    subtitle = models.CharField(max_length=1024)
    meta_description = models.CharField(max_length=1024, blank=True)  # For SEO
    body = models.TextField()
    tags = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return f"{self.slug} - {self.author.user.username}"


class Comment(models.Model):
    entry = models.ForeignKey(BlogEntry, on_delete=models.PROTECT)
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=512)
    email = models.EmailField(blank=True)
    response = models.TextField()
    approved = models.BooleanField(default=False)
