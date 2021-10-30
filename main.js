// Barják László, 2017.06.10.
import Polygon from "./polygon.js";

export default class Main {
  constructor() {
    this.main();
  }
  main() {
    //var drawing = SVG("backstrap").size(600, 300); until svg.js 2.7.1
    let drawing = SVG().addTo("#backstrap").size(600, 300); //3.1.1
    drawing.rect(600, 300).attr({ fill: "gray" });
    let polygon = new Polygon(drawing);
    let hexagons = [];

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
      timer;
    var pattNow = patterns[nameOfPattern];
    var corr = pattNow.upper.length === pattNow.lower.length ? 4 : 0;

    const draw = () => {
      var dir = row % 2 ? -1 : 1;
      var x,
        y = 4 + row * 41,
        color;
      var pattern = pattNow[patterns.healds[row % 2]];
      x = 299 - pattern.length * 8;
      x = x + pos * 16 + dir * corr * -1;
      color = patterns.colors[pattern[pos]];
      polygon.hexagon(x, y, color);
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
        triangles();
      }
    };

    draw();

    let triangles = () => {
      hexagons = document.querySelectorAll("polygon");
      hexagons.forEach((polygon, index) => console.log(index, polygon.points));
    };

    drawing.click(function () {
      if (!row && !pos) {
        hexagons.forEach((polygon) => polygon.remove());
        //let svg = document.querySelector("svg");
        //svg.innerHTML = "";
        //drawing.rect(600, 300).attr({ fill: "gray" });
        draw();
      }
    });
  }
}
