from django.contrib import admin

from .models import BlogEntry, Comment, UserProfile


class BlogEntryAdmin(admin.ModelAdmin):
    list_display = ['slug', 'publish_date', 'title', 'subtitle', 'meta_description', 'body']


class CommentAdmin(admin.ModelAdmin):
    list_display = ['entry', 'created', 'name', 'email', 'approved', 'response']


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'website']


admin.site.register(BlogEntry, BlogEntryAdmin)
admin.site.register(Comment, CommentAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
