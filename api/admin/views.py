import json
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.db import connection
from django.http import JsonResponse


class userlist(APIView):
    def get(self, request):
        cursor = connection.cursor()
        cursor.execute("SELECT id, name, email FROM common_user")
        data = cursor.fetchall()
        users = []
        for datum in data:
            row = {}
            row['id'] = datum[0]
            row['name'] = datum[1]
            row['email'] = datum[2]
            users.append(row)
        return Response(json.dumps(users))

    def delete(self, request):
        data = json.loads(request.body)
        try:
            cursor = connection.cursor()
            cursor.execute(
                "DELETE FROM common_user WHERE name = %s", [data['name']])
            return JsonResponse({'message': 'DELETE_SUCCESS'}, status=200)
        except Exception as e:
            print(e)
            return JsonResponse({'message': 'DELETE_FAILED'}, status=401)
