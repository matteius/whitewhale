from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
import pytest

from blog.models import BlogEntry, Comment, UserProfile, Tag


def create_sample_blog_entry(profile):
    blog_entry = BlogEntry.objects.create(
        author=profile,
        slug='unique-slug-for-url',
        title='Welcome to my Blog!',
        subtitle='Introductory Blog Post',
        meta_description='Introductory Blog Post for Matteius',
        body='Get Vaccinated 💉 and Read more Blogs 📓'
    )
    return blog_entry


@pytest.mark.django_db
class TestBlogModels(TestCase):

    def setUp(self) -> None:
        user = User.objects.create_user('username', 'email@test.com', 'Password1')
        self.profile = UserProfile.objects.create(user=user)

    def test_create_blog_entry_with_comment(self):
        blog_entry = create_sample_blog_entry(self.profile)
        comment = Comment.objects.create(
            entry=blog_entry,
            name='James Bond',
            email='james.bond@example.com',
            response='Nice Blog!',
        )


@pytest.mark.django_db
class TestBlogCommentsAPI(TestCase):

    def setUp(self) -> None:
        user = User.objects.create_user('username', 'email@test.com', 'Password1')
        self.profile = UserProfile.objects.create(user=user)

    def test_create_comment_for_blog_entry(self):
        # Given: A sample Blog Entry
        blog_entry = create_sample_blog_entry(self.profile)

        # When: Posting a comment to the API
        name = "James Bond"
        email = "james.bond@example.com"
        response = "Nice Blog!"
        data = {
            "entry": blog_entry.id,
            "name": name,
            "email": email,
            "response": response,
        }
        self.client.post(reverse('comments-api'), data=data)

        # Then: A comment was created in the database and it is not yet approved
        comment = Comment.objects.get(entry=blog_entry)
        self.assertFalse(comment.approved)
        self.assertEqual(comment.name, name)
        self.assertEqual(comment.email, email)
        self.assertEqual(comment.response, response)

    def test_get_blog_details_returns_only_approved_comments(self):
        pass  # TODO
