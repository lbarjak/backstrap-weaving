"use strict"; // Barják László, 2017.06.10.

//var drawing = SVG("backstrap").size(600, 300); until svg.js 2.7.1
var drawing = SVG().addTo("#backstrap").size(600, 300); //3.1.1
var rect = drawing.rect(600, 300).attr({ fill: "gray" });

const patterns = {
  hullamos: { upper: "vvvvvsvvvv", lower: "vvvvsvvvvv" },
  lancos: { upper: "vvvvsvsvvvv", lower: "vvvvssvvvv" },
  csikos: { upper: "vvssssssssssvv", lower: "vvsssssssssvv" },
  keresztcsikos: { upper: "vvvvvvvvvvvvvvvvv", lower: "ssssssssssssssss" },
  kigyohatas: {
    upper: "ssssvvvvvvvsssvsssvvvvvvvssss",
    lower: "ssssvvvssssssvvssssssvvvssss",
  },
  keresztes: { upper: "vvvsssvvsssvvsssvvv", lower: "sssvvsssvvsssvvsss" },
  colors: { v: "white", s: "red" },
  healds: { 0: "upper", 1: "lower" },
};
var nameOfPattern = "kigyohatas";
var row = 0,
  pos = 0,
  lengthOfPattern,
  timer;
var pattNow = patterns[nameOfPattern];
var corr = pattNow.upper.length === pattNow.lower.length ? 4 : 0;

let hex = (x, y) => [
  [x + 0, y + 7],
  [x + 7, y + 0],
  [x + 14, y + 7],
  [x + 14, y + 39],
  [x + 7, y + 46],
  [x + 0, y + 39],
];
let poly;
var hexagon = (x, y, color) => {
  poly = drawing.polygon(hex(x, y));
  poly.on("click", (e) =>
    console.log("clicked", e.target.points[0].x, e.target.points[0].y)
  );
  poly.fill(color);
  poly.stroke({ width: 0 });
};

const draw = () => {
  var dir = row % 2 ? -1 : 1;
  var x,
    y = 4 + row * 41,
    color;
  var pattern = pattNow[patterns.healds[row % 2]];
  x = 299 - pattern.length * 8;
  x = x + pos * 16 + dir * corr * -1;
  color = patterns.colors[pattern[pos]];
  hexagon(x, y, color);
  pos = pos + dir;
  if (pos === pattern.length || pos === -1)
    pos =
      (++row % 2) *
      (patterns[nameOfPattern][patterns.healds[row % 2]].length - 1);
  timer = setTimeout(() => draw(), 30);
  if (row === 7) {
    clearTimeout(timer);
    row = 0;
    pos = 0;
  }
};

draw();

// drawing.click(function () {
//   if (!row && !pos) {
//     rect.front();
//     draw();
//   }
// });
