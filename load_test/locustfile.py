from locust import HttpUser, task, between


class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    def on_start(self):
        pass

    @task
    def hello_world(self):
        self.client.get("https://www.whitewhale.mobi")
