from flask import Flask, request, send_file
from PIL import Image, ImageEnhance
import requests
from io import BytesIO

app = Flask(__name__)

def modify_image(input_url, brightness=1.0, contrast=1.0, rotation=0):
    try:
        # Download the image from the URL
        response = requests.get(input_url)
        response.raise_for_status()  # Ensure the request was successful
        image = Image.open(BytesIO(response.content))

        # Apply modifications
        enhancer = ImageEnhance.Brightness(image)
        image = enhancer.enhance(brightness)

        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(contrast)

        if rotation != 0:
            image = image.rotate(rotation, expand=True)

        # Save the modified image to a BytesIO object
        img_io = BytesIO()
        image.save(img_io, 'PNG')
        img_io.seek(0)
        return img_io
    except Exception as e:
        print(f"Error modifying image: {e}")
        return None

@app.route('/modify_image', methods=['POST'])
def modify_image_route():
    input_url = request.form['image_url']
    brightness = float(request.form['brightness'])
    contrast = float(request.form['contrast'])
    rotation = float(request.form['rotation'])

    modified_img = modify_image(input_url, brightness, contrast, rotation)
    if modified_img:
        return send_file(modified_img, mimetype='image/png')
    else:
        return "Error modifying image", 500

if __name__ == '__main__':
    app.run(debug=True)
