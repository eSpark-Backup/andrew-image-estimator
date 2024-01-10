from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
import json
import cv2
import numpy as np
import io
from PIL import Image

class ExtractCutout(APIView):
    def post(self, request, *args, **kwargs):
        # Get image file and contour data from the POST request
        image_file = request.FILES.get('image')
        contour_data = request.data.get('contour_data')
        image_height = int(request.data.get('image_height'))
        image_width = int(request.data.get('image_width'))
        # print(contour_data)
		
        # Convert contour data from JSON string to a list of dictionaries
        contour_coordinates = json.loads(contour_data)
        # print(contour_coordinates)

        # Read the image from the uploaded file
        image_content = image_file.read()
        image = cv2.imdecode(np.frombuffer(image_content, np.uint8), cv2.IMREAD_COLOR)

        # Create an empty binary mask
        mask = np.zeros_like(image[:, :, 0])

        # Extract and adjust contour coordinates based on image height and width
        contour_coordinates = [(int(coord["x1"]), int(coord["y1"]))
                               for coord in contour_coordinates]
        print(contour_coordinates)

        # Convert contour coordinates to NumPy array
        contour_coordinates = np.array(contour_coordinates, dtype=np.int32)

        # Draw the contour on the binary mask
        cv2.drawContours(mask, [contour_coordinates], 0, 255, thickness=cv2.FILLED)

        # Bitwise AND operation to extract the specific part of the image
        result = cv2.bitwise_and(image, image, mask=mask)
        result = cv2.resize(result, (image_width,image_height))
        # Convert the result to PIL Image format
        result_pil = Image.fromarray(result)

        # Save the PIL Image to a BytesIO buffer
        result_buffer = io.BytesIO()
        result_pil.save(result_buffer, format='JPEG')

        response = HttpResponse(result_buffer.getvalue(), content_type='image/jpeg')
        response['Content-Disposition'] = 'attachment; filename=extracted_image.jpg'
        return response

		
        

