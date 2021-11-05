// Barják László, 2017.06.10.
import Polygon from "./polygon.js";
import Form from "./form.js";
import Editor from "./editor.js";
import Datas from "./datas.js";

export default class Main {
  constructor() {
    this.drawing = SVG().addTo("#backstrap").size(600, 600);
    this.rect = this.drawing.rect(600, 600).attr({ fill: "gray" });
    new Editor(this);
    new Form(this);
    this.initDraw("keskeny_csíkos");
  }

  reset = () => {
    clearTimeout(this.timer);
    this.row = 0;
    this.pos = 0;
    Polygon.serNum = 0;
    let hexagons = document.querySelectorAll("#backstrap > svg > polygon");
    hexagons.forEach((polygon) => polygon.remove());
  };

  initDraw(nameOfPattern) {
    let draw = () => {
      direction = this.row % 2 ? -1 : 1;
      y = 10 + this.row * 41;
      pattern = this.pattNow[Datas.backstraps.healds[this.row % 2]];
      x = 299 - pattern.length * 8;
      x = x + this.pos * 16 + direction * corr * -1;
      color = Datas.backstraps.colors[pattern[this.pos]];
      new Polygon(this.drawing, x, y, color);
      this.pos = this.pos + direction;
      if (this.pos === pattern.length || this.pos === -1)
        this.pos =
          (++this.row % 2) *
          (this.pattNow[Datas.backstraps.healds[this.row % 2]].length - 1);

      this.timer = setTimeout(() => draw(), 20);

      if (this.row === 14) {
        clearTimeout(this.timer);
        this.row = 0;
        this.pos = 0;
      }
    };

    this.timer;
    this.reset();
    this.pattNow = Datas.backstraps.patterns[nameOfPattern];
    let corr = this.pattNow.upper.length === this.pattNow.lower.length ? 4 : 0;
    let direction, x, y, pattern, color;
    draw();
  }
}
