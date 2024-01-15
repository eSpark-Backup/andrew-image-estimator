import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import cv2
import numpy as np
from PIL import Image
from cv2 import dnn_superres

class ExtractCutout(APIView):
    def post(self, request, *args, **kwargs):
        # Get image file and contour data from the POST request
        image_file = request.FILES.get('image')
        contour_data = request.data.get('contour_data')
        image_height = int(request.data.get('image_height'))
        image_width = int(request.data.get('image_width'))

        # Convert contour data from JSON string to a list of dictionaries
        contour_coordinates = json.loads(contour_data)
        
        # Read the image from the uploaded file
        image_content = image_file.read()
        image = cv2.imdecode(np.frombuffer(image_content, np.uint8), cv2.IMREAD_COLOR)
        image = cv2.resize(image, (image_width,image_height))

        # Create an empty binary mask
        mask = np.zeros_like(image[:, :, 0])

        # Extract and adjust contour coordinates based on image height and width
        contour_coordinates = [(int(coord["x1"]), int(coord["y1"]))
                               for coord in contour_coordinates]

        # Convert contour coordinates to NumPy array
        contour_coordinates = np.array(contour_coordinates, dtype=np.int32)
        x, y, w, h = cv2.boundingRect(contour_coordinates)

        # Draw the contour on the binary mask
        cv2.drawContours(mask, [contour_coordinates], 0, 255, thickness=cv2.FILLED)

        # Bitwise AND operation to extract the specific part of the image
        result = cv2.bitwise_and(image, image, mask=mask)
        cropped_image = result[y:y+h, x:x+w]
        sr = dnn_superres.DnnSuperResImpl_create()
        path = 'EDSR_x2.pb'
        sr.readModel(path)
        sr.setModel('edsr', 2)
        upscaled = sr.upsample(cropped_image)
        cv2.imwrite('extracted_part1.png', upscaled)
        input = Image.open("extracted_part1.png")
        image = input.convert("RGBA")
        data = list(image.getdata())
        target_color = (0, 0, 0)
        new_data = [(r, g, b, 0) if (r, g, b) == target_color else (r, g, b, a) for (r, g, b, a) in data]
        image.putdata(new_data)
        image.save("output_image.png")
        image_width, image_height = image.size
        
      
        data= {"image_path": os.path.abspath("output_image.png"),
               "image_width": image_width,
               "image_height": image_height}


        return Response(data, status=status.HTTP_200_OK)

		
        

