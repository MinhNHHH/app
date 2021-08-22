from django.urls import path
from .views import *
#from rest_framework_swagger.views import get_swagger_view

#schema_view = get_swagger_view(title='WEBAPPP API DOCUMENT')
app_name = "webapp"
urlpatterns = [
    path("", index, name="index"),
    path("dashboard", dashboard, name = "dashboard"),
    path("change_password", change_password, name = "change_password"),
    path("log_in", login, name = "login"),
    #path("logout", logout, name = "logout"),
    path("register", register, name = "register"),
    # path("account", account, name = "account"),
    path("buy",buy, name = "buy"),
    path("calendar",calendar,name = "calendar"),
    path("inputs", inputs, name = "inputs"),
]

