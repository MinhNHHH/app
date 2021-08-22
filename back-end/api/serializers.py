from django.db import models
from django.db.models import fields
from rest_framework import serializers
from webapp.models import Users,Transaction,Information

class UserAPI(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id','username','password','balance')

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 100)
    confirm = serializers.CharField(max_length = 100)

class InputSerializer(serializers.Serializer):
    budget = serializers.IntegerField(default = 0)
    income = serializers.IntegerField(default = 0)

class DashBoardSerializer(serializers.Serializer):
    model = Transaction
    fields = ["id", 'categorize', 'money','tim_trade']

class TransactionSerializer(serializers.Serializer):
    categorize = serializers.CharField(max_length = 100)
    money = serializers.IntegerField()

class ChangepasswordSerializer(serializers.Serializer):
    currentpass = serializers.CharField(max_length = 100)
    newpass = serializers.CharField(max_length = 100)
    confirmpass = serializers.CharField(max_length = 100)


class InformationAPISerializer(serializers.Serializer):
    fullname = serializers.CharField(default = "",allow_blank=True)
    address = serializers.CharField(default = "",allow_blank=True)
    phone = serializers.CharField(default = "",allow_blank=True)
    email = serializers.CharField(default = "",allow_blank=True)
    class Meta:
        model = Information
        fields = ['fullname', 'address','phone','email']