from django.db import models

# Create your models here.
class User(models.Model):
    username = models.CharField(max_length=200)
    password = models.TextField()
    sessionStart = models.DateTimeField(auto_now=True)

# class Session(models.Model):
#     username = models.CharField(max_length=200)
#     sessionStart = models.DateField(auto_now=True)
