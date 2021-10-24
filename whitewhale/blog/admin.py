from django.contrib import admin

from .models import BlogEntry


class BlogEntryAdmin(admin.ModelAdmin):
    list_display = ['slug', 'publish_date', 'title', 'subtitle', 'meta_description', 'body']


admin.site.register(BlogEntry, BlogEntryAdmin)
