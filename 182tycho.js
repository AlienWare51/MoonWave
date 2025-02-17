<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Interactive Line Graph</title>
    <style>
        svg {
            border: 1px solid #ccc;
            width: 100%;
            height: 400px;
        }
        .line {
            fill: none;
            stroke: steelblue;
            stroke-width: 2px;
        }
    </style>
    <script src="https://d3js.org/d3.v7.min.js"></script>
</head>
<body>
    <h1>Interactive Line Graph</h1>
    <svg id="lineGraph"></svg>
    <script src="lineGraph.js"></script>
</body>
</html>
