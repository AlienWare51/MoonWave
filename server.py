from flask import Flask, request, send_file
from PIL import Image, ImageEnhance
import io

app = Flask(__name__)

def modify_image(input_path, brightness=1.0, contrast=1.0, rotation=0):
    image = Image.open(input_path)

    # Apply modifications
    enhancer = ImageEnhance.Brightness(image)
    image = enhancer.enhance(brightness)

    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(contrast)

    if rotation != 0:
        image = image.rotate(rotation, expand=True)

    # Save modified image to a BytesIO object
    img_io = io.BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)
    return img_io

@app.route('/modify_image', methods=['POST'])
def modify_image_route():
    brightness = float(request.form['brightness'])
    contrast = float(request.form['contrast'])
    rotation = float(request.form['rotation'])

    # Use one of the base images for demonstration purposes
    modified_img = modify_image('image1.png', brightness, contrast, rotation)
    return send_file(modified_img, mimetype='image/png')

if __name__ == '__main__':
    app.run(debug=True)
