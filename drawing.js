import Polygon from "./polygon.js";
import Datas from "./datas.js";

export default class Drawing {
  constructor(selector) {
    this.selectorOfSheet = selector;
    this.drawing = SVG().addTo(this.selectorOfSheet).size(600, 600);
    this.rect = this.drawing.rect(600, 600).attr({ fill: "gray" });
  }
  reset = (from = 72) => {
    clearTimeout(this.timer);
    this.row = 0;
    this.pos = 0;
    Polygon.serNum = 0;
    let hexagons = document.querySelectorAll(
      this.selectorOfSheet + " > svg > polygon"
    );
    hexagons.forEach((polygon, index) => {
      if (this.selectorOfSheet == "#editor" && index > from) polygon.remove();
      if (this.selectorOfSheet == "#backstrap") polygon.remove();
    });
  };

  initDraw(nameOfPattern, middle, yShift, maxRow, lefty = 0) {
    let draw = () => {
      direction = this.row % 2 ? -1 : 1;
      y = yShift + this.row * 41;
      pattern = this.pattNow[Datas.backstraps.healds[this.row % 2]];
      x = middle - pattern.length * 8;
      x =
        x + (this.row % 2) * lefty * 16 + this.pos * 16 + direction * corr * -1;
      color = Datas.backstraps.colors[pattern[this.pos]];
      new Polygon(this.drawing, x, y, color);
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
    this.reset();
    this.pattNow = Datas.backstraps.patterns[nameOfPattern];
    let corr = this.pattNow.upper.length === this.pattNow.lower.length ? 4 : 0;
    let direction, x, y, pattern, color;
    draw();
  }
}
