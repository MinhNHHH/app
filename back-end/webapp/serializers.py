from rest_framework import serializers
from .models import Users


class UserAPI(serializers.ModelSerializer):

    class Meta:
        model = Users
        fields = "__all__"

class LoginSerializer(serializers.Serializer):

    username = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 100)

class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length = 100)
    password = serializers.CharField(max_length = 100)
    confirm = serializers.CharField(max_length = 100)

class LogoutSerializer(serializers.Serializer):
    logout = serializers.CharField(max_length = 100)

class AccountSerializer(serializers.Serializer):
    budget = serializers.IntegerField(default = 0)
    income = serializers.IntegerField(default = 0)

class BuySerializer(serializers.Serializer):
    fields = serializers.CharField(max_length = 100)
    money = serializers.IntegerField(default= 0)
    
class Changepassword(serializers.Serializer):
    currentpass = serializers.CharField(max_length = 100)
    newppass = serializers.CharField(max_length = 100)
    confirmpass = serializers.CharField(max_length = 100)

class Calendar(serializers.Serializer):
    next_month = serializers.CharField(max_length = 100)
    pre_month = serializers.CharField(max_length = 100)
    month = serializers.CharField(max_length = 100)