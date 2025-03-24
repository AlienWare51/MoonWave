class AlphaControl {
    // Generalized function to draw polyinverse dots with alpha control
    static drawPolyinverseDotsWithAlpha(canvasId, color, alpha) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;
        const scale = 50;

        ctx.fillStyle = color;
        ctx.globalAlpha = alpha; // Set alpha transparency for dots

        for (let x = -50; x <= 50; x += 0.1) {
            if (x === 0) continue; // Avoid division by zero
            const y = 1 / x;

            const canvasX1 = centerX + x * scale;
            const canvasY1 = centerY - y * scale;
            const canvasX2 = centerX - x * scale;
            const canvasY2 = centerY - y * scale;

            ctx.beginPath();
            ctx.arc(canvasX1, canvasY1, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(canvasX2, canvasY2, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1.0; // Reset alpha for other elements
    }

    // Function to draw an opaque image at the center of a canvas
    static drawLizardImage(canvasId, imageUrl) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            // Resize the image to 25% of its original size
            const scaledWidth = img.width * 0.25;
            const scaledHeight = img.height * 0.25;

            // Calculate the center position
            const centerX = (canvas.width - scaledWidth) / 2;
            const centerY = (canvas.height - scaledHeight) / 2;

            // Draw the image at full opacity
            ctx.globalAlpha = 1.0;
            ctx.drawImage(img, centerX, centerY, scaledWidth, scaledHeight);
        };

        img.src = imageUrl;
    }

    // Function to generate a sequence based on user input
    static generateSequence(number) {
        if (!Number.isInteger(number) || number < 0) {
            throw new Error("Please provide a non-negative integer.");
        }
        return ".".repeat(number); // Returns a string with 'number' dots
    }
}

// Draw content in both float containers
const imageUrl = 'https://th.bing.com/th/id/OIP.3VW0YxQ8DvTrLezsCqCLPgHaE7?rs=1&pid=ImgDetMain'; // Replace with your image URL

AlphaControl.drawPolyinverseDotsWithAlpha('plot1', 'blue', 0.5); // 50% transparency for dots
AlphaControl.drawLizardImage('plot1', imageUrl);

AlphaControl.drawPolyinverseDotsWithAlpha('plot2', 'red', 0.5); // 50% transparency for dots
AlphaControl.drawLizardImage('plot2', imageUrl);

// Form handling for the return box
document.getElementById("returnBoxForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission from reloading the page

    const input = document.getElementById("numberInput").value;
    const resultElement = document.getElementById("result");

    try {
        const number = parseInt(input, 10);
        const sequence = AlphaControl.generateSequence(number);
        resultElement.textContent = `Result: ${sequence}`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});
