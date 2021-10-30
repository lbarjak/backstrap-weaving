// Barják László, 2017.06.10.
import Polygon from "./polygon.js";

export default class Main {
  static patterns = {
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
  static nameOfPattern = "kigyohatas";

  constructor() {
    this.drawing = SVG().addTo("#backstrap").size(600, 300);
    this.rect = this.drawing.rect(600, 300).attr({ fill: "gray" });
    this.main();
  }
  main() {
    //let drawing = SVG().addTo("#backstrap").size(600, 300);
    //let rect = this.drawing.rect(600, 300).attr({ fill: "gray" });
    let polygon = new Polygon(this.drawing);
    let hexagons = [];
    var row = 0,
      pos = 0,
      timer;
    var pattNow = Main.patterns[Main.nameOfPattern];
    var corr = pattNow.upper.length === pattNow.lower.length ? 4 : 0;

    const draw = () => {
      var dir = row % 2 ? -1 : 1;
      var x,
        y = 4 + row * 41,
        color;
      var pattern = pattNow[Main.patterns.healds[row % 2]];
      x = 299 - pattern.length * 8;
      x = x + pos * 16 + dir * corr * -1;
      color = Main.patterns.colors[pattern[pos]];
      polygon.hexagon(x, y, color);
      pos = pos + dir;
      if (pos === pattern.length || pos === -1)
        pos =
          (++row % 2) *
          (Main.patterns[Main.nameOfPattern][Main.patterns.healds[row % 2]]
            .length -
            1);
      timer = setTimeout(() => draw(), 30);
      if (row === 7) {
        clearTimeout(timer);
        row = 0;
        pos = 0;
        polygons();
      }
    };

    draw();

    let polygons = () => {
      hexagons = document.querySelectorAll("polygon");
      hexagons.forEach((polygon, index) => console.log(index, polygon.points));
    };

    this.rect.click(function () {
      if (!row && !pos) {
        hexagons.forEach((polygon) => polygon.remove());
        draw();
      }
    });
  }
}
