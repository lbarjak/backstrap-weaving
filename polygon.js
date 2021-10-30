export default class Polygon {
  constructor(drawing) {
    this.hex = (x, y) => [
      [x + 0, y + 7],
      [x + 7, y + 0],
      [x + 14, y + 7],
      [x + 14, y + 39],
      [x + 7, y + 46],
      [x + 0, y + 39],
    ];
    this.drawing = drawing;
    this.poly;
  }
  hexagon = (x, y, color) => {
    this.poly = this.drawing.polygon(this.hex(x, y));
    this.poly.on("click", (e) =>
      console.log("clicked", e.target.points[0].x, e.target.points[0].y)
    );
    this.poly.fill(color);
    this.poly.stroke({ width: 0 });
  };
}
