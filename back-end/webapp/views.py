from django.db.models import query
from django.db.models.query_utils import Q
from .models import Users, Transaction
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserAPI,LoginSerializer,RegisterSerializer,AccountSerializer,BuySerializer,Changepassword,Calendar
from rest_framework import status
from werkzeug.security import check_password_hash, generate_password_hash
from calendar import month, monthrange,month_name
from datetime import date
from django.utils import timezone
from django.db.models import Avg, Count, Min, Sum,F
import pandas as pd

# Create your views here.

def index(request):
    request.session['user_id'] = []
    print(request.session['user_id'])
    return render(request, "webapp/home_page.html")

@api_view(["GET","POST"])
def login(request):
    if request.method == "GET":
        return render(request, "webapp/home_page.html")
    else:
        mydata = LoginSerializer(data = request.data)
        if not mydata.is_valid():
            return Response("You must provide User and Password",status = status.HTTP_400_BAD_REQUEST)
        else:
            username = mydata.data['username']
            password = mydata.data['password']        
            query_db_lists = list(Users.objects.values_list("username",flat=True))
            # check account in database
            if username in query_db_lists:
                query_db = Users.objects.get(username = username)
                model_password = query_db.password
                # check password
                if not check_password_hash(model_password,password):
                    return Response("Invalid username and or Password", status = status.HTTP_400_BAD_REQUEST)
                request.session["user_id"] += [query_db.id]
                print(request.session['user_id'])
                return Response("Login sucess",status = status.HTTP_200_OK)
            else:
                return Response("Username Invalid", status = status.HTTP_400_BAD_REQUEST)

@api_view(["GET","POST"])
def register(request):
    if request.method == "GET":
        return render(request, "webapp/create_account.html")
    else:
        mydata = RegisterSerializer(data =request.data)
        if not mydata.is_valid():
            return Response("You must provide User and Password",status = status.HTTP_400_BAD_REQUEST)
        else:
            username = mydata.data['username']
            password = mydata.data['password']
            confirm = mydata.data['confirm']
            query_db_lists = list(Users.objects.values_list("username",flat=True))
            if username in query_db_lists:
                return Response("Account exits",status = status.HTTP_400_BAD_REQUEST)
            else:
                if password == confirm:
                    #create account, generate_password_hash convert password to hard code
                    Users.objects.create(username = username, password = generate_password_hash(password),time_pub = timezone.now())
                    return Response("Register success", status = status.HTTP_200_OK)
                else:
                    return Response("Password incorrect",status = status.HTTP_400_BAD_REQUEST)

@api_view(["GET","POST"])
def change_password(request):
    query_db = Users.objects.get(id = request.session['user_id'][-1])
    if request.method == "GET":
        context = {
            "username": query_db.username
        }
        return render(request, "webapp/change_password.html",context)
    else:
        mydata = Changepassword(data = request.data)
        if not mydata.is_valid():
            return Response("Invalid value",status=status.HTTP_400_BAD_REQUEST)
        else:
            model_password = query_db.password
            cur_password = mydata.data['currentpass']
            # check if model_password = cur_password => change new password
            if check_password_hash(model_password,cur_password):                 
                if mydata.data['newppass'] == mydata.data["confirmpass"]: 
                    query_db.password = generate_password_hash(mydata.data['newppass'])
                    query_db.save()
                    return Response("Change password success",status = status.HTTP_200_OK)                    
                else:
                    return Response("Invalid password",status = status.HTTP_400_BAD_REQUEST)
        return Response("Invalid password", status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET","POST"])
def inputs(request):
    query_db = Users.objects.get(id = request.session['user_id'][-1])
    if request.method == "GET":
        model_username = query_db.username
        return render(request, "webapp/account.html", {"username" : model_username})
    else:
        mydata = AccountSerializer(data = request.data)
        if not mydata.is_valid():
            return Response("You must provide full infomation", status = status.HTTP_400_BAD_REQUEST)
        else:
            income = mydata.data['income']
            budget = mydata.data['budget']
            if income != 0 and budget != 0:
                Transaction.objects.create(user_id = query_db, categorize = "income", money = income, time_trade = timezone.now())
                Transaction.objects.create(user_id = query_db, categorize = "budget", money = budget, time_trade = timezone.now())
                
            elif income != 0:
                Transaction.objects.create(user_id = query_db, categorize = "income", money = income, time_trade = timezone.now())
            else:
                Transaction.objects.create(user_id = query_db, categorize = "budget", money = budget, time_trade = timezone.now())
            return Response("Go to dashboard",status = status.HTTP_200_OK)

@api_view(["GET"])
def dashboard(request):
    query_db = Users.objects.get(id = request.session['user_id'][-1])
    time = timezone.now()
    if request.method == "GET":
        money_budget = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, time_trade__year = time.year, categorize = "budget").aggregate(Sum('money'))
        money_income = Transaction.objects.filter(user_id_id = query_db.id,categorize = "income", time_trade__month__in = [i for i in range(1,13)],time_trade__year = time.year).values("time_trade__month").annotate(sum = Sum('money'))
        money_trade = Transaction.objects.filter(user_id_id = query_db.id,time_trade__month = time.month, categorize__in = ["eat", "learning","shopping"],time_trade__year = time.year).aggregate(Sum('money'))
        money_eat = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, categorize = "eat",time_trade__year = time.year).aggregate(Sum('money'))
        money_learn = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, categorize = "learning",time_trade__year = time.year).aggregate(Sum('money'))
        money_shopping = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, categorize = "shopping",time_trade__year = time.year).aggregate(Sum('money'))
        data_line = [i for i in money_income]
        datas = {
            "income" : data_line,
            "budget" : money_budget['money__sum'],
            "trade" : money_trade['money__sum'] if money_trade['money__sum'] is not None else 0,
            "eat": money_eat['money__sum'] if money_eat['money__sum'] is not None else 0,
            "learn": money_learn['money__sum'] if money_learn['money__sum'] is not None else 0,
            "shopping" : money_shopping['money__sum'] if money_shopping['money__sum'] is not None else 0,
        }
        context = {
            "data" : datas,
            "username" : query_db.username,
        }
        return render(request, "webapp/dashboard.html" ,context)

@api_view(["GET","POST"])
def buy(request):
    query_db = Users.objects.get(id = request.session['user_id'][-1])
    time = timezone.now()
    if request.method == "GET":
        list_serice = ["eat", "shopping", "learning"]
        filter_trade = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, time_trade__year = time.year).values("categorize","money","time_trade")
        datas = [j for j in filter_trade]
        for i in datas:
            i['money'] = "{:,.0f}".format(i['money'])
            i['time_trade'] = i['time_trade'].strftime("%m/%d/%Y, %H:%M:%S")
        context = {
            "data" : datas,
            "username": query_db.username,
            "list_service" : list_serice,
        }
        return render(request, "webapp/buy.html",context)
    else:
        mydata = BuySerializer(data = request.data)
        if not mydata.is_valid():
            Response("You must provide full infomation", status = status.HTTP_400_BAD_REQUEST)
        else:
            money = mydata.data['money']
            filed = mydata.data['fields']
            money_trade = Transaction.objects.filter(user_id_id = query_db.id,time_trade__month = time.month, categorize__in = ["eat", "learning","shopping"],time_trade__year = time.year).aggregate(Sum('money'))
            moneytrade = 0 if money_trade['money__sum'] is None else money_trade['money__sum']
            money_income = Transaction.objects.filter(user_id_id = query_db.id,categorize = "income", time_trade__month__in = [i for i in range(1,13)],time_trade__year = time.year).aggregate(Sum('money'))
            query_db.balance = money_income['money__sum'] - moneytrade
            query_db.save()
            if query_db.balance > money:
                Transaction.objects.create(user_id = query_db, categorize = filed, money = -money, time_trade = time)
                return Response("Buy success",status = status.HTTP_201_CREATED)
            else:
                return Response ("Buy failed", status = status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def calendar(request):
    query_db = Users.objects.get(id = request.session['user_id'][-1])
    #time = timezone.now()
    if request.method == "GET":
        data_query = Transaction.objects.filter(user_id_id = query_db.id).values("categorize", "money", "time_trade__day","time_trade__month","time_trade__year")
        datas = [i for i in data_query]
        for i in datas:
            i['time_trade__month'] = month_name[i['time_trade__month']]
            i['time_trade__month'] = i['time_trade__month'][0:3]
            i['money'] = "{:,.0f}".format(i['money'])
        context = {
            "username": query_db.username,
            "data": datas
        }
        return render(request, "webapp/calendar.html",context)