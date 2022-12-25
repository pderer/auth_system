from django.db import models
import hashlib


class User(models.Model):
    name = models.CharField(max_length=40, blank=True)
    password = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=128, blank=True)

    def __str__(self):
        return self.name

    def get_password(self):
        return self.password

    def set_password(self, passwd):
        self.password = hashlib.sha256(passwd.encode('utf-8')).hexdigest()

    hashed_password = property(get_password, set_password)


class Admin(models.Model):
    name = models.CharField(max_length=40, blank=True)
    password = models.CharField(max_length=255, blank=True)
    email = models.EmailField(max_length=128, blank=True)


'''
    def __str__(self):
        return self.name

    def get_password(self):
        return self.password

    def set_password(self, passwd):
        self.password = hashlib.sha256(passwd.encode('utf-8')).hexdigest()

    hashed_password = property(get_password, set_password)
    '''
