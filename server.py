from flask import Flask, request, send_file
from PIL import Image, ImageEnhance
import requests
from io import BytesIO

app = Flask(__name__)

IMAGE_URLS = {
    "1": "https://www.worldatlas.com/r/w1200/upload/50/de/fe/shutterstock-117998215.jpg",
    "2": "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png"
}

def modify_image(image, brightness=1.0, contrast=1.0, rotation=0):
    try:
        enhancer = ImageEnhance.Brightness(image)
        image = enhancer.enhance(brightness)

        enhancer = ImageEnhance.Contrast(image)
        image = enhancer.enhance(contrast)

        if rotation != 0:
            image = image.rotate(rotation, expand=True)

        img_io = BytesIO()
        image.save(img_io, 'PNG')
        img_io.seek(0)
        return img_io
    except Exception as e:
        print(f"Error modifying image: {e}")
        return None

@app.route('/modify_image', methods=['POST'])
def modify_image_route():
    image_select = request.form['image_select']
    brightness = float(request.form['brightness'])
    contrast = float(request.form['contrast'])
    rotation = float(request.form['rotation'])

    if image_select in IMAGE_URLS:
        response = requests.get(IMAGE_URLS[image_select])
        response.raise_for_status()
        image = Image.open(BytesIO(response.content))
    else:
        return "Invalid image selection", 400

    modified_img = modify_image(image, brightness, contrast, rotation)
    if modified_img:
        return send_file(modified_img, mimetype='image/png')
    else:
        return "Error modifying image", 500

if __name__ == '__main__':
    app.run(debug=True)
