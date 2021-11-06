// Barják László, 2017.06.10.
import Polygon from "./polygon.js";
import Form from "./form.js";
import Editor from "./editor.js";
import Datas from "./datas.js";

export default class Main {
  constructor() {
    this.selectorOfSheet = "#backstrap";
    this.drawing = SVG().addTo(this.selectorOfSheet).size(600, 600);
    this.rect = this.drawing.rect(600, 600).attr({ fill: "gray" });
    new Editor(this);
    new Form(this);
    this.initDraw(
      "keskeny_csíkos",
      301,
      this.drawing,
      this.selectorOfSheet,
      10,
      14
    );
  }

  reset = (selectorOfSheet, from = 72) => {
    clearTimeout(this.timer);
    this.row = 0;
    this.pos = 0;
    Polygon.serNum = 0;
    let hexagons = document.querySelectorAll(
      selectorOfSheet + " > svg > polygon"
    );
    hexagons.forEach((polygon, index) => {
      if (selectorOfSheet == "#editor" && index >= from) polygon.remove();
      if (selectorOfSheet == "#backstrap") polygon.remove();
    });
  };

  initDraw(nameOfPattern, middle, sheet, selectorOfSheet, yShift, maxRow) {
    let draw = () => {
      direction = this.row % 2 ? -1 : 1;
      y = yShift + this.row * 41;
      pattern = this.pattNow[Datas.backstraps.healds[this.row % 2]];
      x = middle - pattern.length * 8;
      x = x + this.pos * 16 + direction * corr * -1;
      color = Datas.backstraps.colors[pattern[this.pos]];
      new Polygon(sheet, x, y, color);
      this.pos = this.pos + direction;
      if (this.pos === pattern.length || this.pos === -1)
        this.pos =
          (++this.row % 2) *
          (this.pattNow[Datas.backstraps.healds[this.row % 2]].length - 1);

      this.timer = setTimeout(() => draw(), 20);

      if (this.row === maxRow) {
        clearTimeout(this.timer);
        this.row = 0;
        this.pos = 0;
      }
    };

    this.timer;
    this.reset(selectorOfSheet);
    this.pattNow = Datas.backstraps.patterns[nameOfPattern];
    let corr = this.pattNow.upper.length === this.pattNow.lower.length ? 4 : 0;
    let direction, x, y, pattern, color;
    draw();
  }
}
