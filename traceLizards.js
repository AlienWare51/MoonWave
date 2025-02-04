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

            // Simulate tracing
            const dotRadius = 5;
            let angle = 0;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const traceRadius = Math.min(canvas.width, canvas.height) / 2 - dotRadius;

            function trace() {
                ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Redraw the image

                // Calculate dot position
                const x = centerX + traceRadius * Math.cos(angle);
                const y = centerY + traceRadius * Math.sin(angle);

                // Draw the tracing dot
                ctx.beginPath();
                ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
                ctx.fillStyle = 'red';
                ctx.fill();

                angle += 0.01; // Increment the angle for the next frame

                requestAnimationFrame(trace);
            }

            trace();
        };
        img.onerror = (error) => {
            console.error(`Failed to load image: ${imageSrc}`, error);
        };
    });
}
