from django.http import JsonResponse
from django.shortcuts import render
from django.views import View
from django.core.cache import cache
# Create your views here.


class check_user(View):
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        try:
            if cache.get(token) is None:
                return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)
            else:
                return JsonResponse({'message': 'VALID_TOKEN'}, status=200)
        except:
            return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)


class check_admin(View):
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        try:
            if cache.get(token) is None:
                return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)
            else:
                return JsonResponse({'message': 'VALID_TOKEN'}, status=200)
        except:
            return JsonResponse({'message': 'INVALID_TOKEN'}, status=401)
