from django.urls import path
from .views import *
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='WEBAPPP API DOCUMENT')


urlpatterns = [
    path('show/',APISHOW.as_view()),
    path('login/', LoginAPI.as_view()),
    path('register/', RegisterAPI.as_view()),
    path('input/<int:pk>/',InputAPI.as_view()),
    path('dashboard/<int:pk>/',DashBoardAPI.as_view()),
    path('changepass/<int:pk>/', ChangepassAPI.as_view()),
    path('transaction/<int:pk>/',TransactionAPI.as_view()),
    path('information/<int:pk>/',InformationAPI.as_view()),
    path('calendar/<int:pk>/',CalendarAPI.as_view()),
    path('document/', schema_view),
]

