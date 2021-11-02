export default class Draw {
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
