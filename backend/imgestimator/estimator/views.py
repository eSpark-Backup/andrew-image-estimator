from imaplib import _Authenticator
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import cv2
import numpy as np
from PIL import Image
from cv2 import dnn_superres
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from .models  import *
from django.contrib.auth import authenticate
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

class ExtractCutout(APIView):
    def post(self, request, *args, **kwargs):
        # Get image file and contour data from the POST request
        image_file = request.FILES.get('image')
        contour_data = request.data.get('contour_data')
        image_height = float(request.data.get('image_height'))
        image_width = float(request.data.get('image_width'))
        file_name = request.data.get('file_name')
	

        # Convert contour data from JSON string to a list of dictionaries
        contour_coordinates = json.loads(contour_data)
        
        # Read the image from the uploaded file
        image_content = image_file.read()
        image = cv2.imdecode(np.frombuffer(image_content, np.uint8), cv2.IMREAD_COLOR)
        image = cv2.resize(image, (round(image_width),round(image_height)), Image.LANCZOS)
        sr = dnn_superres.DnnSuperResImpl_create()
        path = 'EDSR_x2.pb'
        sr.readModel(path)
        sr.setModel('edsr', 2)
        image = sr.upsample(image)

        # Create an empty binary mask
        mask = np.zeros_like(image[:, :, 0])

        # Extract and adjust contour coordinates based on image height and width
        contour_coordinates = [(2*int(coord["x1"]), 2*int(coord["y1"]))
                               for coord in contour_coordinates]

        # Convert contour coordinates to NumPy array
        contour_coordinates = np.array(contour_coordinates, dtype=np.int32)
        x, y, w, h = cv2.boundingRect(contour_coordinates)

        # Draw the contour on the binary mask
        cv2.drawContours(mask, [contour_coordinates], 0, 255, thickness=cv2.FILLED)

        # Bitwise AND operation to extract the specific part of the image
        result = cv2.bitwise_and(image, image, mask=mask)
        cropped_image = result[y:y+h, x:x+w]

        cv2.imwrite('extracted_part1.png', cropped_image)
        input = Image.open("extracted_part1.png")
        image = input.convert("RGBA")
        data = list(image.getdata())
        target_color = (0, 0, 0)
        new_data = [(r, g, b, 0) if (r, g, b) == target_color else (r, g, b, a) for (r, g, b, a) in data]
        image.putdata(new_data)
        image.save("C://Users//classic//Downloads//andrew-imageestimator//public//" + file_name)
        image_width, image_height = image.size
        
      
        data= {"image_path": "C://Users//classic//Downloads//andrew-imageestimator//public//" + file_name,
               "image_width": image_width,
               "image_height": image_height}


        return Response(data, status=status.HTTP_200_OK)

		
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            token = str(refresh.access_token)
            return Response(
                {"token": token}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class SignupView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        first_name = request.data.get("first_name")
        last_name = request.data.get("last_name")
        password = request.data.get("password")
        username = str(first_name) + " " + str(last_name)
        try:
            validate_email(email)
        except ValidationError:
            return Response({"error": "Invalid email address"}, status=status.HTTP_400_BAD_REQUEST)
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)

        end_user.objects.create_user(email=email, password=password, username=username)

        return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class CreateEstimtion(APIView):
    def post(self,request, *args, **kwargs):
        user_id=request.user
        polygons={}
        image=""
        name=request.data.get("name")
        if name:
            estimation.objects.create(
                user_id=user_id,
                name=name,
                image=image,
                polygons=polygons
            )
            return Response(
                {"message":"Resquest created."}, status=status.HTTP_201_CREATED
            )
        else:
            return Response({"error":"Name field is required."},status=status.HTTP_400_BAD_REQUEST
            )


@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class UpdateEstimtion(APIView):
    def patch(self,request, *args, **kwargs):
        id = request.query_params.get("id")
        updates=request.data
        try:
            estimation_record=estimation.objects.get(id=id)
        except estimation.DoesNotExist:
            return Response({"error":"Record not found."},status=status.HTTP_404_NOT_FOUND
            )
        try:
            for key in updates:
                setattr(estimation_record, key, updates[key])
            estimation_record.save()
            return Response(status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"error":e.message},status=status.HTTP_400_BAD_REQUEST
                )
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class Dashboard(APIView):
    def get(self,request, *args, **kwargs):
        user_id=request.user

        try:
            estimation_data = estimation.objects.filter(user_id=user_id)
        except estimation.DoesNotExist:
            return Response({"error":"Record not found."},status=status.HTTP_404_NOT_FOUND
            )
        if estimation_data:
            records = []
            for data in estimation_data:
                record = {
                    "id": data.id,
                    "user_id": data.user_id,
                    "name": data.name,
                    "image": data.image,
                    "polygons": data.polygons
                }
                records.append(record)
                return Response(record, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
            