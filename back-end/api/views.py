from webapp.serializers import LoginSerializer
from django.db.models import query
from django.utils import timezone
from api.serializers import TransactionSerializer, UserAPI,RegisterSerializer,InputSerializer,DashBoardSerializer,ChangepasswordSerializer,InformationAPISerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from webapp.models import Information, Users,Transaction
from rest_framework import status , generics
from django.db.models import Avg, Count, Min, Sum,F
from django.http import Http404
from werkzeug.security import check_password_hash, generate_password_hash
from knox.models import AuthToken
from calendar import month, monthrange,month_name



class APISHOW(generics.GenericAPIView):
    queryset = Users.objects.all()
    def get(self,request):
        queryset = Users.objects.all()
        serializer = UserAPI(queryset,many = True)
        return Response(serializer.data)
    
class LoginAPI(generics.GenericAPIView):
    queryset = Users.objects.all()
    serializer_class = LoginSerializer
    def post(self, request):
        #db = Users.objects.get(pk = pk)
        serializer = UserAPI(data = request.data)
        user_list = list(Users.objects.all().values_list('username',flat=True))
        print(user_list)
        if serializer.is_valid():
            print(serializer.data)
            if serializer.data['username'] not in user_list:
                return Response({
                    "message": "Account not exist"
                }, status = status.HTTP_400_BAD_REQUEST)
            else:
                query_db = Users.objects.get(username = serializer.data['username'])
                model_pass = query_db.password
                serial_pass = serializer.data['password']
                if not check_password_hash(model_pass,serial_pass):
                    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
                
                return Response({
                    "id": query_db.id,
                    "username" : query_db.username,
                    "success" : True
                },status = status.HTTP_200_OK)


class RegisterAPI(generics.GenericAPIView):
    queryset = Users.objects.all()
    serializer_class =RegisterSerializer
    def post(self, request):
        user_list = list(self.queryset.values_list("username",flat=True))
        serializer = RegisterSerializer(data = request.data)
        if serializer.is_valid():
            username = serializer.data['username']
            password = serializer.data['password']
            confirm = serializer.data['confirm']
            if serializer.data['username'] in user_list:
                return Response("Account exits",status = status.HTTP_400_BAD_REQUEST)
            else:
                if password == confirm:
                    #create account, generate_password_hash convert password to hard code
                    new = Users.objects.create(username = username, password = generate_password_hash(password))
                    return Response({
                        "data": new.username,
                        "message": "Register success",
                    }, status = status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ChangepassAPI(generics.GenericAPIView):
    queryset = Users.objects.all()
    serializer_class = ChangepasswordSerializer

    def post(self, request, pk):
        query_db = Users.objects.get(pk = pk)
        serializer = ChangepasswordSerializer(data = request.data)
        if serializer.is_valid():
            print(serializer.data)
            model_password = query_db.password
            current = serializer.data['currentpass']
            if check_password_hash(model_password,current):                 
                if serializer.data['newpass'] == serializer.data["confirmpass"]: 
                    query_db.password = generate_password_hash(serializer.data['newpass'])
                    query_db.save()
                    return Response("Change password success",status = status.HTTP_200_OK)                    
                else:
                    return Response("Invalid password",status = status.HTTP_400_BAD_REQUEST)
        return Response("Invalid password", status=status.HTTP_400_BAD_REQUEST)

class InformationAPI(generics.GenericAPIView):
    queryset = Users.objects.all()
    serializer_class = InformationAPISerializer

    def get(self, request, pk):
        datas = vars(Information.objects.get(pk = pk))
        datas.pop("_state")
        return Response(datas, status = status.HTTP_200_OK)

    def put(self, request,pk):
        user = Information.objects.get(pk=pk)
        seriailizer = InformationAPISerializer(data = request.data)

        if seriailizer.is_valid():
            print(seriailizer.data)
            temp = vars(user)
            for k,v in seriailizer.data.items():
                if len(v) > 0:
                    temp[k] = v
            user.save()
            return Response({"message":"Change Success"},status= status.HTTP_200_OK)
        else:
            print(seriailizer.errors)
        return Response({"message": "Change Unsuccess"}, status = status.HTTP_400_BAD_REQUEST)


class InputAPI(generics.GenericAPIView):
    queryset_2 = Transaction.objects.all()
    queryset_1 = Users.objects.all()
    serializer_class = InputSerializer
    def post(self, request,pk):
        query_db = Users.objects.get(pk = pk)
        serializer = InputSerializer(data = request.data)
        if serializer.is_valid():
            income = serializer.data['income']
            budget = serializer.data['budget']
            if income != 0 and budget != 0:
                Transaction.objects.create(user_id = query_db, categorize = "income", money = income)
                Transaction.objects.create(user_id = query_db, categorize = "budget", money = budget)
            elif income != 0:
                Transaction.objects.create(user_id = query_db, categorize = "income", money = income)
            else:
                Transaction.objects.create(user_id = query_db, categorize = "budget", money = budget)
            query_db.balance += income
            query_db.save()
            return Response({
                "id": query_db.id,
                "data": serializer.data,
                "balance": query_db.balance,
                "message": "Trade success!"
            },status = status.HTTP_201_CREATED)

class DashBoardAPI(generics.GenericAPIView):
    queryset_2 = Transaction.objects.all()
    queryset_1 = Users.objects.all()
    serializer_class = DashBoardSerializer
    
    def get(self,request, pk):
        time = timezone.now()
        query_db = Users.objects.get(pk = pk)
        #query_transaction = Transaction.objects.filter(user_id_id = query_db.id)
        #serializer = DashBoardSerializer(query_transaction, many = True)
        money_budget = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, time_trade__year = time.year, categorize = "budget").aggregate(Sum('money'))
        money_income = Transaction.objects.filter(user_id_id = query_db.id,categorize = "income", time_trade__month__in = [i for i in range(1,13)],time_trade__year = time.year).values("time_trade__month").annotate(sum = Sum('money'))
        money_trade = Transaction.objects.filter(user_id_id = query_db.id,time_trade__month = time.month, time_trade__year = time.year).exclude(categorize__in = ['income','budget']).aggregate(Sum('money'))
        money_filed = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, time_trade__year = time.year).exclude(categorize__in = ['income','budget']).values("categorize").annotate(sum = Sum('money'))
        filter_trade = Transaction.objects.filter(user_id_id = query_db.id, time_trade__month = time.month, time_trade__year = time.year).values("categorize","money","time_trade")
        data_his = [j for j in filter_trade]
        data_money = [i for i in money_filed]
        for i in data_his:
            i['money'] = i['money']
            i['time_trade'] = i['time_trade'].strftime("%m/%d/%Y, %H:%M:%S")
        data_line = [i for i in money_income]
        datas = {
            "balance" : query_db.balance,
            "history" : data_his,
            "income" : data_line,
            "budget" : money_budget['money__sum'],
            "trade" : money_trade['money__sum'] if money_trade['money__sum'] is not None else 0,
            "money_filed" : data_money
        }
        return Response({
            "username" : query_db.username,
            "id": query_db.id,
            "balance" : query_db.balance,
            "data": datas,
            "message" : "Show sucess"
        },status = status.HTTP_200_OK)

class TransactionAPI(generics.GenericAPIView):
    queryset_1 = Users.objects.all()
    queryset_2 = Transaction.objects.all()
    serializer_class = TransactionSerializer
    
    def post(self,request,pk):
        query_db = Users.objects.get(pk = pk)
        time = timezone.now()
        serializer = TransactionSerializer(data = request.data)
        if serializer.is_valid():
            money_trade = Transaction.objects.filter(user_id_id = query_db.id,time_trade__month = time.month, time_trade__year = time.year).exclude(categorize__in = ['income','budget']).aggregate(Sum('money'))
            moneytrade = 0 if money_trade['money__sum'] is None else money_trade['money__sum']
            money_income = Transaction.objects.filter(user_id_id = query_db.id,categorize = "income", time_trade__month__in = [i for i in range(1,13)],time_trade__year = time.year).aggregate(Sum('money'))
            query_db.balance = money_income['money__sum'] + moneytrade
            query_db.save()
            if query_db.balance > serializer.data['money']:
                Transaction.objects.create(user_id = query_db, categorize = serializer.data['categorize'], money = -serializer.data['money'])
                return Response({
                    "id": query_db.id,
                    "data": serializer.data,
                    "message": "Trade sucess"
                },status = status.HTTP_200_OK)
            else:
                return Response({
                    "id": query_db.id,
                    "message" : "Trade unsucess"
                }, status = status.HTTP_400_BAD_REQUEST)
    

class CalendarAPI(generics.GenericAPIView):
    queryset_1 = Users.objects.all()
    queryset_2 = Transaction.objects.all()
    serializer_class = DashBoardSerializer

    def get(self, request, pk):
        query_db = Users.objects.get(pk = pk)
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
        return Response(context, status = status.HTTP_200_OK)
