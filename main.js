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
    this.drawing = SVG().addTo("#backstrap").size(600, 600);
    this.rect = this.drawing.rect(600, 600).attr({ fill: "gray" });
    this.polygons = [];
    this.init();
  }

  init() {
    this.row = 0;
    this.pos = 0;
    this.timer;
    this.pattNow = Main.patterns[Main.nameOfPattern];
    this.corr = this.pattNow.upper.length === this.pattNow.lower.length ? 4 : 0;

    this.rect.click(() => {
      if (!this.row && !this.pos) {
        this.polygons = [];
        Polygon.serNum = 0;
        let hexagons = document.querySelectorAll("polygon");
        hexagons.forEach((polygon) => polygon.remove());
        this.draw();
      }
    });

    this.draw();
  }

  draw = () => {
    let dir = this.row % 2 ? -1 : 1;
    let y = 10 + this.row * 41;
    let pattern = this.pattNow[Main.patterns.healds[this.row % 2]];
    let x = 299 - pattern.length * 8;
    x = x + this.pos * 16 + dir * this.corr * -1;
    let color = Main.patterns.colors[pattern[this.pos]];
    let polygon = new Polygon(this.drawing, x, y, color);
    this.polygons.push(polygon);
    this.pos = this.pos + dir;
    if (this.pos === pattern.length || this.pos === -1)
      this.pos =
        (++this.row % 2) *
        (Main.patterns[Main.nameOfPattern][Main.patterns.healds[this.row % 2]]
          .length -
          1);

    this.timer = setTimeout(() => this.draw(), 20);

    if (this.row === 14) {
      clearTimeout(this.timer);
      this.row = 0;
      this.pos = 0;
      //this.printPolygons();
    }
  };

  printPolygons = () => {
    this.polygons.forEach((polygon) =>
      console.log(polygon.serNum, polygon.x, polygon.y)
    );
  };
}
