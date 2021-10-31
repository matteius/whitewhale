from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.BlogEntryListView.as_view(), name='posts-api'),
    path('comments/', views.CommentView.as_view(), name='comments-api'),
]
