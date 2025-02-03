function onOpenCvReady() {
    const images = [
        'https://www.worldatlas.com/r/w1200/upload/50/de/fe/shutterstock-117998215.jpg',  // Replace with actual image paths
        'https://good-nature-blog-uploads.s3.amazonaws.com/uploads/2023/08/1920x910-Blog-Header-1-1.jpg',  // Replace with actual image paths
        'https://th.bing.com/th/id/R.1f47a179c2e05a05333a7f69aaf6957a?rik=QI5jx2AEcOgnyg&riu=http%3a%2f%2fwww.chameleonwebservices.co.uk%2fwp-content%2fuploads%2f2015%2f05%2fchameleon-image-7.jpg&ehk=tJlhQBhZfR%2bzIMxyvinl%2fsmX1eb16loPg72oZ%2bo8Zdk%3d&risl=&pid=ImgRaw&r=0'   // Replace with actual image paths
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
