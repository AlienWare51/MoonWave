// Sample data
const data = [
    { x: 0, y: 0 },
    { x: 1, y: 3 },
    { x: 2, y: 6 },
    { x: 3, y: 8 },
    { x: 4, y: 10 },
    { x: 5, y: 7 },
    { x: 6, y: 5 },
    { x: 7, y: 2 },
    { x: 8, y: 1 },
    { x: 9, y: 4 }
];

// Set up SVG
const svg = document.getElementById('lineGraph');
const width = svg.clientWidth;
const height = svg.clientHeight;

// Set up scales
const xScale = d3.scaleLinear().domain([0, d3.max(data, d => d.x)]).range([0, width]);
const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d.y)]).range([height, 0]);

// Create line generator
const line = d3.line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

// Append the path element
svg.innerHTML = `<path class="line" d="${line(data)}"></path>`;

// Create a tooltip
const tooltip = document.createElement('div');
tooltip.style.position = 'absolute';
tooltip.style.padding = '5px';
tooltip.style.background = '#fff';
tooltip.style.border = '1px solid #ccc';
tooltip.style.display = 'none';
document.body.appendChild(tooltip);

// Add circles for data points
data.forEach(d => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', xScale(d.x));
    circle.setAttribute('cy', yScale(d.y));
    circle.setAttribute('r', 5);
    circle.setAttribute('fill', 'steelblue');
    circle.addEventListener('mouseover', () => {
        tooltip.style.display = 'block';
        tooltip.innerHTML = `x: ${d.x}, y: ${d.y}`;
    });
    circle.addEventListener('mousemove', (event) => {
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = event.pageY + 'px';
    });
    circle.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
    svg.appendChild(circle);
});
