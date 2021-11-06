from datetime import datetime

from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse
from freezegun import freeze_time
import pytest

from blog.models import BlogEntry, Comment, UserProfile, Tag


def _create_sample_blog_entry(profile):
    blog_entry = BlogEntry.objects.create(
        author=profile,
        slug='unique-slug-for-url',
        title='Welcome to my Blog!',
        subtitle='Introductory Blog Post',
        meta_description='Introductory Blog Post for Matteius',
        body='Get Vaccinated 💉 and Read more Blogs 📓',
        publish_date=datetime.now()
    )
    return blog_entry


@pytest.mark.django_db
class TestBlogModels(TestCase):

    def setUp(self) -> None:
        user = User.objects.create_user('username', 'email@test.com', 'Password1')
        self.profile = UserProfile.objects.create(user=user)

    def test_create_blog_entry_with_comment(self):
        blog_entry = _create_sample_blog_entry(self.profile)
        comment = Comment.objects.create(
            entry=blog_entry,
            name='James Bond',
            email='james.bond@example.com',
            response='Nice Blog!',
        )


frozen_date = "2012-01-14T12:00:01Z"


@pytest.mark.django_db
@freeze_time(frozen_date)
class TestBlogCommentsAPI(TestCase):

    def setUp(self) -> None:
        user = User.objects.create_user('username', 'email@test.com', 'Password1')
        self.profile = UserProfile.objects.create(user=user)

    def _post_comment_using_api(self, blog_entry, name, email, response):
        data = {
            "entry": blog_entry.id,
            "name": name,
            "email": email,
            "response": response,
        }
        self.client.post(reverse('comments-api'), data=data)

    def test_create_comment_for_blog_entry(self):
        # Given: A sample Blog Entry
        blog_entry = _create_sample_blog_entry(self.profile)

        # When: Posting a comment to the API
        name = "James Bond"
        email = "james.bond@example.com"
        response = "Nice Blog!"
        self._post_comment_using_api(blog_entry, name, email, response)

        # Then: A comment was created in the database and it is not yet approved
        comment = Comment.objects.get(entry=blog_entry)
        self.assertFalse(comment.approved)
        self.assertEqual(comment.name, name)
        self.assertEqual(comment.email, email)
        self.assertEqual(comment.response, response)

    def test_get_blog_posts_return_only_after_publish_date(self):
        pass  # TODO


    def test_get_blog_details_returns_only_approved_comments(self):
        # Given: A sample Blog Entry
        blog_entry = _create_sample_blog_entry(self.profile)

        # When: A comment was created through the API (yet unapproved)
        name = "James Bond"
        email = "james.bond@example.com"
        response = "Nice Blog!"
        self._post_comment_using_api(blog_entry, name, email, response)

        # Then: Fetching the Blog Details reveals no comments
        response = self.client.get(reverse('posts-api'))
        blog_entry = response.data[0]
        self.assertListEqual(blog_entry.get('comments', []), [])

        # When: The comment is then approved
        comment = Comment.objects.last()
        comment.approved = True
        comment.save()

        # Then: Fetching the Blog Details reveals 1 comment
        expected_comment = {field.name: field.value_from_object(comment) for field in comment._meta.fields}
        expected_comment.pop('approved')  # excluded field
        expected_comment['created'] = frozen_date
        response = self.client.get(reverse('posts-api'))
        blog_entry = response.json()[0]
        self.assertListEqual(blog_entry.get('comments', []), [expected_comment])
