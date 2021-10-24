from django.urls import path

from . import views

urlpatterns = [
    path('posts', views.BlogEntryListView.as_view()),
]
