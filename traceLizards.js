function onOpenCvReady() {
    const images = [
        'lizard1.jpg',  // Replace with actual image paths
        'lizard2.jpg',  // Replace with actual image paths
        'lizard3.jpg'   // Replace with actual image paths
    ];

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    images.forEach((imageSrc, index) => {
        let img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            let imgElement = new cv.Mat(img.height, img.width, cv.CV_8UC4);
            cv.imshow('canvas', imgElement);
            let gray = new cv.Mat();
            cv.cvtColor(imgElement, gray, cv.COLOR_RGBA2GRAY, 0);
            let edges = new cv.Mat();
            cv.Canny(gray, edges, 50, 150, 3, false);

            let contours = new cv.MatVector();
            let hierarchy = new cv.Mat();
            cv.findContours(edges, contours, hierarchy, cv.RETR_CCOMP, cv.CHAIN_APPROX_SIMPLE);

            ctx.drawImage(img, index * img.width, 0);

            for (let i = 0; i < contours.size(); ++i) {
                let color = new cv.Scalar(255, 0, 0);
                cv.drawContours(imgElement, contours, i, color, 1, cv.LINE_8, hierarchy, 100);
            }

            cv.imshow('canvas', imgElement);
            imgElement.delete();
            gray.delete();
            edges.delete();
            contours.delete();
            hierarchy.delete();
        };
    });
}
