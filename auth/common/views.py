import hashlib
import jwt
import datetime
import json
import redis

from django.shortcuts import render, get_object_or_404, redirect
from .models import User, Admin
from .forms import RegisterForm, LoginForm, AdminLoginForm, AdminRegisterForm
from django.http import JsonResponse
from django.views import View
from django.utils import timezone
from django.contrib import messages
from auth.settings import SECRET_KEY, ALGORITHM
from django.core.cache import cache


class login_user(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if User.objects.filter(name=data['username']).exists():
                user = User.objects.get(name=data['username'])
                if hashlib.sha256(data['password'].encode('utf-8')).hexdigest() == user.password:
                    payload = {
                        'id': user.id,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),
                        'iat': datetime.datetime.utcnow()
                    }
                    access_token = jwt.encode(payload, SECRET_KEY, ALGORITHM)
                    if cache.get(access_token) is None:
                        cache.set(access_token, 'user', 60*60*2)
                    return JsonResponse({'token': access_token}, status=200)
                else:
                    return JsonResponse({'message': '등록되지 않은 사용자입니다.'}, status=401)
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'INVALID_USER'}, status=401)


class login_admin(View):
    def post(self, request):
        data = json.loads(request.body)
        try:
            if Admin.objects.filter(name=data['username']).exists():
                admin = Admin.objects.get(name=data['username'])
                if hashlib.sha256(data['password'].encode('utf-8')).hexdigest() == admin.password:
                    payload = {
                        'id': admin.id,
                        'admin': True,
                        'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=2),
                        'iat': datetime.datetime.utcnow()
                    }
                    access_token = jwt.encode(payload, SECRET_KEY, ALGORITHM)
                    if cache.get(access_token) is None:
                        cache.set(access_token, 'admin', 60*60*2)
                    return JsonResponse({'token': access_token}, status=200)
                else:
                    return JsonResponse({'message': '등록되지 않은 어드민입니다.'}, status=401)
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'INVALID_ADMIN'}, status=401)


class register_user(View):
    def post(self, request):
        data = json.loads(request.body)
        hashed_password = hashlib.sha256(
            data['password'].encode('utf-8')).hexdigest()
        try:
            if User.objects.filter(name=data['username']).exists():
                return JsonResponse({'message': 'ID_EXISTS'}, status=409)
            elif not User.objects.filter(name=data['username']).exists():
                User(
                    name=data['username'],
                    password=hashed_password,
                    email=data['email'],).save()
                return JsonResponse({'message': 'WELCOME'}, status=200)
        except:
            return JsonResponse({'message': 'INVALID_ID'}, status=401)


class register_admin(View):
    def post(self, request):
        data = json.loads(request.body)
        hashed_password = hashlib.sha256(
            data['password'].encode('utf-8')).hexdigest()
        try:
            if Admin.objects.filter(name=data['username']).exists():
                return JsonResponse({'message': 'ID_EXISTS'}, status=409)
            elif not Admin.objects.filter(name=data['username']).exists():
                Admin(
                    name=data['username'],
                    password=hashed_password,
                    email=data['email']).save()
                return JsonResponse({'message': 'WELCOME'}, status=200)
        except:
            return JsonResponse({'message': 'INVALID_ID'}, status=401)
