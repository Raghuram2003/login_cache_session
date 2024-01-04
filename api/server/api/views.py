from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password,check_password
from .models import User
from django.core.cache import cache
import jwt
from django.utils import timezone
from django.shortcuts import get_object_or_404
#memurai serveer = 6379

header = {  
  "alg": "HS256",  
  "typ": "JWT"  
}   
secret = "raghuram"

@api_view(['GET'])
def api_home(request):
    return Response({"message":"home page"})

@api_view(['GET'])
def users(request):
    users = User.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)


@api_view(['POST'])
def register(request):
    users = User.objects.all()
    for user in users:
        if user.username == request.data['username']:
            return HttpResponse("Username already exists")
    request.data['password'] = make_password(request.data['password'])
    user_serializer = UserSerializer(data=request.data)
    if user_serializer.is_valid():
        user_serializer.save()
    token = jwt.encode(
        {'username':user_serializer.data['username'],
         'userId':user_serializer.data['id']},
         secret,algorithm='HS256',headers=header)
    print(token)
    response = {    
        "username":user_serializer.data['username'],
        "id":user_serializer.data['id'],
        "token":token,
        "time":user_serializer.data['sessionStart']
    }
    # cache.set(token,"ok",timeout=300)
    return Response(response)

@api_view(['POST'])
def login(request):
    request_useraname = request.data['username']
    request_password = request.data['password']
    try:
        user = User.objects.get(username = request_useraname)
    except:
        return Response({"message":"User does not exist"})
    serializer = UserSerializer(user,data=request.data)
    if serializer.is_valid():
        serializer.validated_data['sessionStart']=timezone.now()
        serializer.save()
    token = jwt.encode(
        {'username':serializer.data['username'],
         'userId':serializer.data['id']},
         secret,algorithm='HS256',headers=header)
    response = {
            'username' : serializer.data['username'],
            'id' : serializer.data['id'],
            'token' : token
        }
    return Response(response)

# @api_view(['POST'])
# def get_cache(request):
#     if cache.get(request.data['token']):
#         token = request.data['token']
#         decoded = jwt.decode(token,secret,algorithms='HS256')
#         return Response(decoded)
#     else:
#         return Response({"message":"no cache"})
    
# @api_view(['POST'])
# def delete_cache(request):
#     if cache.get(request.data['token']):
#         cache.delete(request.data['token'])
#         return Response({"message":"deleted"})
    
# @api_view(['GET'])
# def clear_cache(request):
#     cache.clear()
#     return Response({"message":"cache cleared"})

@api_view(['POST'])
def time_delta(request):
    token = request.data['token']
    decoded = jwt.decode(token,secret,algorithms='HS256')
    try:
        user = User.objects.get(username = decoded['username'])
    except:
        return Response({"message":"user does not exist"})
    timeDelta = timezone.now()-user.sessionStart
    print(timeDelta.seconds)
    if timeDelta.seconds>300:
        return Response({"message":"Session Expired"})
    else:
        user.sessionStart = timezone.now()
        user.save()
        serializer = UserSerializer(user,data={'username':user.username,'password':user.password,'sessionStart':user.sessionStart,'id':user.id})
        if serializer.is_valid():
            serializer.save()
        else:
            print("serializer invalid")
            print(serializer.data)
        return Response(decoded)
   
@api_view(["POST"])
def time(request):
    user = User.objects.get(username = request.data['username'])
    timeDelta = timezone.now()-user.sessionStart
    return Response({"timeDelta":timeDelta.seconds})