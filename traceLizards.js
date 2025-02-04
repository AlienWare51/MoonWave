function onOpenCvReady() {
    const images = [
        'https://th.bing.com/th/id/R.1f47a179c2e05a05333a7f69aaf6957a?rik=QI5jx2AEcOgnyg&riu=http%3a%2f%2fwww.chameleonwebservices.co.uk%2fwp-content%2fuploads%2f2015%2f05%2fchameleon-image-7.jpg&ehk=tJlhQBhZfR%2bzIMxyvinl%2fsmX1eb16loPg72oZ%2bo8Zdk%3d&risl=&pid=ImgRaw&r=0',
        'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2023/09/splinter-tmnt-1987-cropped.jpg', // Master Splinter
        'https://th.bing.com/th/id/OIP.SA01bBacA1Jy0zhYtsU_7wHaEM?rs=1&pid=ImgDetMain'
    ];

    const canvasIds = ['canvas1', 'canvas-splinter', 'canvas3'];

    images.forEach((imageSrc, index) => {
        let img = new Image();
        img.crossOrigin = "Anonymous";  // Add this line
        img.src = imageSrc;
        img.onload = () => {
            const canvas = document.getElementById(canvasIds[index]);
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            if (index === 1) { // Apply ripple effect to Master Splinter's image
                const rippleInterval = 5000; // 5 seconds
                let rippleOn = true;

                function drawRippleEffect() {
                    if (rippleOn) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                        // Draw ripple effect (simple example)
                        ctx.beginPath();
                        ctx.arc(canvas.width / 2, canvas.height / 2, 40, 0, 2 * Math.PI);
                        ctx.strokeStyle = 'blue';
                        ctx.lineWidth = 5;
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc(canvas.width / 2, canvas.height / 2, 30, 0, 2 * Math.PI);
                        ctx.strokeStyle = 'cyan';
                        ctx.lineWidth = 3;
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.arc(canvas.width / 2, canvas.height / 2, 20, 0, 2 * Math.PI);
                        ctx.strokeStyle = 'lightblue';
                        ctx.lineWidth = 2;
                        ctx.stroke();
                    }
                    setTimeout(() => {
                        rippleOn = !rippleOn;
                        drawRippleEffect();
                    }, rippleInterval);
                }

                drawRippleEffect();
            } else {
                // Simulate tracing for lizard images
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
            }
        };
        img.onerror = (error) => {
            console.error(`Failed to load image: ${imageSrc}`, error);
        };
    });
}
