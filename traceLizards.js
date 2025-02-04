function onOpenCvReady() {
    const images = [
        'https://th.bing.com/th/id/R.1f47a179c2e05a05333a7f69aaf6957a?rik=QI5jx2AEcOgnyg&riu=http%3a%2f%2fwww.chameleonwebservices.co.uk%2fwp-content%2fuploads%2f2015%2f05%2fchameleon-image-7.jpg&ehk=tJlhQBhZfR%2bzIMxyvinl%2fsmX1eb16loPg72oZ%2bo8Zdk%3d&risl=&pid=ImgRaw&r=0',
        'https://www.thesprucepets.com/thmb/-QTn07Dcbk51mlkK9iaGyvYBOgs=/2000x1210/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-969103888-5c44a97fc9e77c0001901f03.jpg',
        'https://th.bing.com/th/id/OIP.SA01bBacA1Jy0zhYtsU_7wHaEM?rs=1&pid=ImgDetMain'
    ];

    const canvasIds = ['canvas1', 'canvas2', 'canvas3'];

    images.forEach((imageSrc, index) => {
        let img = new Image();
        img.crossOrigin = "Anonymous";  // Add this line
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.getElementById(canvasIds[index]);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            let imgElement = cv.imread(canvas);
            let gray = new cv.Mat();
            cv.cvtColor(imgElement, gray, cv.COLOR_RGBA2GRAY, 0);
            let edges = new cv.Mat();
            cv.Canny(gray, edges, 50, 150, 3, false);

            let contours = new cv.MatVector();
            let hierarchy = new cv.Mat();
            cv.findContours(edges, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

            function trace() {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                for (let i = 0; i < contours.size(); ++i) {
                    let color = new cv.Scalar(255, 0, 0);
                    cv.drawContours(imgElement, contours, i, color, 2, cv.LINE_8, hierarchy, 0);
                }
                cv.imshow(canvas, imgElement);
                requestAnimationFrame(trace);
            }

            trace();

            imgElement.delete();
            gray.delete();
            edges.delete();
            contours.delete();
            hierarchy.delete();
        };
        img.onerror = (error) => {
            console.error(`Failed to load image: ${imageSrc}`, error);
        };
    });
}
