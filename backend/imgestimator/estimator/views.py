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
from .drive_funcs import *
from django.core.mail import EmailMessage
from django.template.loader import render_to_string

client_id = "207646957050-smcmm1qoindocqoeuhmpslnr36bm3fic.apps.googleusercontent.com"
client_secret = "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"
refresh_token = "1//04Z6HkUsMF6bhCgYIARAAGAQSNwF-L9Irr28ZskF0uelnghZG-gA-Q4-wmfnaFde2s9fr2QwPUKly0ZstxiUg5HtJENWYL8mEcag"

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
        image = cv2.resize(image, (round(2*image_width),round(2*image_height)), Image.LANCZOS)
        # sr = dnn_superres.DnnSuperResImpl_create()
        # path = 'EDSR_x2.pb'
        # sr.readModel(path)
        # sr.setModel('edsr', 2)
        # image = sr.upsample(image)

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
        image.save("upload.png")
        image_width, image_height = image.size
        with open("upload.png", 'rb') as file_content:
            image_url=upload_file_to_google_drive(file_name, file_content)

        if os.path.exists("upload.png"):
            os.remove("upload.png")
        if os.path.exists("extracted_part1.png"):
            os.remove("extracted_part1.png")
        if image_url:
            data= {"image_url": image_url,
                "image_width": image_width,
                "image_height": image_height,
                "g_api": get_access_token(refresh_token, client_id, client_secret)}

            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"error":"No data available."}, status=status.HTTP_404_NOT_FOUND)

		
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            token = str(refresh.access_token)
            user_data = {
                "name": user.username,
                "email": user.email
            }
            return Response(
                {"token": token, "user_data": user_data}, status=status.HTTP_200_OK
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
            est=estimation.objects.create(
                user_id=user_id,
                name=name,
                image=image,
                polygons=polygons,
                measuring_unit = "",
                height = 0,
                length = 0,
                px_height = 0,
                px_length = 0
            )
            id=est.id
            return Response(
                {"message":"Resquest created.","id":id}, status=status.HTTP_201_CREATED
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
                if key=="image":
                        user_name=end_user.objects.get(email=estimation_record.user_id)  
                        file_name=f"esp_{user_name.username}_{id}"
                        
                        new_image_url=upload_file_to_google_drive(file_name, updates[key].read())
                        if new_image_url:
                            estimation_record.image=new_image_url
                            estimation_record.save()
                            continue
                setattr(estimation_record, key, updates[key])
            estimation_record.save()
            return Response({"id":id},status=status.HTTP_200_OK)
        except ValidationError as e:
            return Response({"error":e.message},status=status.HTTP_400_BAD_REQUEST
                )
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST
            )
        

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
                    "name": data.name,
                    "created_at": data.created_at
                }
                records.append(record)
            return Response(records, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
    def delete(self, request, *args, **kwargs):
        user = request.user
        delete_id = request.query_params.get("id")
        try:
            estimation.objects.filter(id=delete_id).delete()
            return Response({"successfully deleted"},status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
class EmailSend(APIView):
    def post(self, request, *args, **kwargs):
        subject = 'Image Estimation Results'
        from_email = 'test@esparkconsultants.com'
        recipient_list = [request.data.get("email")]
        recipient_name=request.data.get("recipient_name")
        if not recipient_name:
            recipient_name = "Costumer"
        table_data=request.data.get("table")
        html_content = render_to_string('emailformat.html', {
            'recipient_name': recipient_name,
            'estimation_results': table_data,
        })
        email_message = EmailMessage(subject, html_content, from_email, recipient_list)
        email_message.content_subtype = "html"
        email_message.send()
        return Response({"message": "Email sent successfully."})
    

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class EditView(APIView):
    def get(self,request, *args, **kwargs):
        user_id=request.user
        id = request.query_params.get("id")

        try:
            estimation_data = estimation.objects.get(id=id,user_id=user_id)
        except estimation.DoesNotExist:
            return Response({"error":"Record not found."},status=status.HTTP_404_NOT_FOUND
            )
        if estimation_data:
            record = {
                "id": estimation_data.id,
                "user_id": estimation_data.user_id,
                "name": estimation_data.name,
                "image": estimation_data.image,
                "polygons": estimation_data.polygons,
                "unit": estimation_data.measuring_unit,
                "height": estimation_data.height,
                "length": estimation_data.length,
                "px_height": estimation_data.px_height,
                "px_length": estimation_data.px_length,
                "g_api": get_access_token(refresh_token, client_id, client_secret)
            }
            return Response(record, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        

@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
class EstimationDetails(APIView):
    def post(self, request, *args, **kwargs):
        user_id=request.user
        estimation_id=request.data.get("estimation_id")
        image=request.FILES.get("image")
        wear_plate_type_est=request.data.get("wear_plate_type_est")
        wear_plate_type_curr=request.data.get("wear_plate_type_curr")
        wear_plate_area=request.data.get("wear_plate_area")
        wear_plate_weight=request.data.get("wear_plate_weight")
        plate_price=request.data.get("plate_price")
        stich_welding=request.data.get("stich_welding")
        press_break_bends=request.data.get("press_break_bends")
        bolt_holes=request.data.get("bolt_holes")
        impact_type=request.data.get("impact_type")
        zip_code=request.data.get("zip_code")
        est_delivery_date=request.data.get("est_delivery_date")
        perimeter_welding=request.data.get("perimeter_welding")
        fasten_use_studs=request.data.get("fasten_use_studs")
        roll_bends=request.data.get("roll_bends")
        abrasion_type=request.data.get("abrasion_type")
        fab_service=request.data.get("fab_service")
        deliver_site_date=request.data.get("deliver_site_date")
        total_price=request.data.get("total_price")
        try:
            user_name=end_user.objects.get(email=user_id)
            file_name=f"esp_detail_{user_name.username}_{user_name.id}"
            image_url=upload_file_to_google_drive(file_name, image.read())
            estimation_detail.objects.create(
                user_id=user_id,
                estimation_id=estimation_id,
                image=image_url,
                wear_plate_type_est=wear_plate_type_est,
                wear_plate_type_curr=wear_plate_type_curr,
                wear_plate_area=wear_plate_area,
                wear_plate_weight=wear_plate_weight,
                plate_price=plate_price,
                stich_welding=stich_welding,
                press_break_bends=press_break_bends,
                bolt_holes=bolt_holes,
                impact_type=impact_type,
                zip_code=zip_code,
                est_delivery_date=est_delivery_date,
                perimeter_welding=perimeter_welding,
                fasten_use_studs=fasten_use_studs,
                roll_bends=roll_bends,
                abrasion_type=abrasion_type,
                est_fabric_serv=fab_service,
                deliver_site_date=deliver_site_date,
                total_price=total_price,
            )
            return Response({"message":"Resquest created."},status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error":"Invalid form data: " + str(e)},status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, *args, **kwargs):
        est_id=request.query_params.get("est_id")
        est_details_records=estimation_detail.objects.filter(estimation_id=est_id)
        if est_details_records:
            records=[]
            for rec in est_details_records:
                record={
                    "id":rec.id,
                    "user_id":rec.user_id,
                    "estimation_id":rec.estimation_id,
                    "image":rec.image,
                    "wear_plate_type_est":rec.wear_plate_type_est,
                    "wear_plate_type_curr":rec.wear_plate_type_curr,
                    "wear_plate_area":rec.wear_plate_area,
                    "wear_plate_weight":rec.wear_plate_weight,
                    "plate_price":rec.plate_price,
                    "stich_welding":rec.stich_welding,
                    "press_break_bends":rec.press_break_bends,
                    "bolt_holes":rec.bolt_holes,
                    "impact_type":rec.impact_type,
                    "zip_code":rec.zip_code,
                    "est_delivery_date":rec.est_delivery_date,
                    "perimeter_welding":rec.perimeter_welding,
                    "fasten_use_studs":rec.fasten_use_studs,
                    "roll_bends":rec.roll_bends,
                    "abrasion_type":rec.abrasion_type,
                    "fab_service":rec.est_fabric_serv,
                    "deliver_site_date":rec.deliver_site_date,
                    "total_price":rec.total_price,
                    "g_api": get_access_token(refresh_token, client_id, client_secret)
                }
                records.append(record)
            return Response(records, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
        
    def patch(self, request, *args, **kwargs):
        id = request.query_params.get("id")
        updates=request.data
        try:
            est_detail_record=estimation_detail.objects.get(id=id)
        except estimation_detail.DoesNotExist:
            return Response({"error":"Record not found."},status=status.HTTP_404_NOT_FOUND
            )
        try:
            for key in updates:
                if key=="image":
                    continue
                if key=="fab_service":
                    est_detail_record.est_fabric_serv=updates["fab_service"]
                    continue
                setattr(est_detail_record, key, updates[key])
            est_detail_record.save()
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error":str(e)},status=status.HTTP_400_BAD_REQUEST
                )