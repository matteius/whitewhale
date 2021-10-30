from django.contrib import admin

from .models import BlogEntry, UserProfile


class BlogEntryAdmin(admin.ModelAdmin):
    list_display = ['slug', 'publish_date', 'title', 'subtitle', 'meta_description', 'body']


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'website']


admin.site.register(BlogEntry, BlogEntryAdmin)
admin.site.register(UserProfile, UserProfileAdmin)
