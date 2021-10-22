from django.test import TestCase
from django.contrib.auth.models import User
import pytest

from blog.models import BlogEntry, UserProfile, Tag


def test_addition():
    assert 1 + 1 == 2


@pytest.mark.django_db
class TestBlogModels(TestCase):

    def setUp(self) -> None:
        user = User.objects.create_user('username', 'email@test.com', 'Password1')
        self.profile = UserProfile.objects.create(user=user)

    def test_create_blog_entry(self):
        BlogEntry.objects.create(
            author=self.profile,
            slug='unique-slug-for-url',
            title='Welcome to my Blog!',
            subtitle='Introductory Blog Post',
            meta_description='Introductory Blog Post for Matteius',
            body='Get Vaccinated 💉 and Read more Blogs 📓'
        )

