from django.urls import path

from mau_mau import views

urlpatterns = [
    path('', views.index, name="index"),
    path('mau/', views.mau_mau, name="mau"),
]
