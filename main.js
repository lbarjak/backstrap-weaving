// Barják László, 2017.06.10.
import Polygon from "./polygon.js";
import Form from "./form.js";

export default class Main {
  static backstraps = {
    patterns: {
      hullámos: { upper: "vvvvvsvvvv", lower: "vvvvsvvvvv" },
      láncos: { upper: "vvvvsvsvvvv", lower: "vvvvssvvvv" },
      csíkos: { upper: "vvssssssssssvv", lower: "vvsssssssssvv" },
      keresztcsíkos: { upper: "vvvvvvvvvvvvvvvvv", lower: "ssssssssssssssss" },
      kígyóhátas: {
        upper: "ssssvvvvvvvsssvsssvvvvvvvssss",
        lower: "ssssvvvssssssvvssssssvvvssss",
      },
      keresztes: { upper: "vvvsssvvsssvvsssvvv", lower: "sssvvsssvvsssvvsss" },
    },
    colors: { v: "white", s: "red" },
    healds: { 0: "upper", 1: "lower" },
  };

  constructor() {
    this.drawing = SVG().addTo("#backstrap").size(600, 600);
    this.rect = this.drawing.rect(600, 600).attr({ fill: "gray" });
    this.editor = SVG()
      .addTo("#editor")
      .size(600, 600)
      .move(650, 0)
      .fill("#f06");
    this.rectEditor = this.editor.rect(600, 600).attr({ fill: "gray" });
    this.polygons = [];
    new Form(this);
    this.row = 0;
    this.pos = 0;
    this.timer;
    this.init("hullámos");
  }

  reset = () => {
    clearTimeout(this.timer);
    this.row = 0;
    this.pos = 0;
    this.polygons = [];
    Polygon.serNum = 0;
    let hexagons = document.querySelectorAll("polygon");
    hexagons.forEach((polygon) => polygon.remove());
    hexagons = document.querySelectorAll("polygon");
  };

  init(nameOfPattern) {
    this.row = 0;
    this.pos = 0;
    this.reset();
    this.pattNow = Main.backstraps.patterns[nameOfPattern];
    this.draw();
  }

  draw = () => {
    this.corr = this.pattNow.upper.length === this.pattNow.lower.length ? 4 : 0;
    let dir = this.row % 2 ? -1 : 1;
    let y = 10 + this.row * 41;
    let pattern = this.pattNow[Main.backstraps.healds[this.row % 2]];
    let x = 299 - pattern.length * 8;
    x = x + this.pos * 16 + dir * this.corr * -1;
    let color = Main.backstraps.colors[pattern[this.pos]];
    let polygon = new Polygon(this.drawing, x, y, color);
    this.polygons.push(polygon);
    this.pos = this.pos + dir;
    if (this.pos === pattern.length || this.pos === -1)
      this.pos =
        (++this.row % 2) *
        (this.pattNow[Main.backstraps.healds[this.row % 2]].length - 1);

    this.timer = setTimeout(() => this.draw(), 20);

    if (this.row === 14) {
      clearTimeout(this.timer);
      this.row = 0;
      this.pos = 0;
    }
  };
}
