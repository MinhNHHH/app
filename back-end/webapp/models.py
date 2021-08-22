from django.db import models

# Create your models here.

class Users(models.Model):
    username = models.CharField(max_length = 100)
    password = models.CharField(max_length = 100)
    balance = models.IntegerField(default= 0)
    time_pub = models.DateTimeField(auto_now_add = True)    
    def __str__(self):
        return self.username

class Information(models.Model):
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE)
    fullname = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    email = models.EmailField(max_length= 100)

class Transaction(models.Model):
    user_id = models.ForeignKey(Users,on_delete=models.CASCADE)
    categorize = models.CharField(max_length= 100)
    money = models.IntegerField()
    time_trade = models.DateTimeField(auto_now_add = True)
    def __str__(self):
        return self.categorize

