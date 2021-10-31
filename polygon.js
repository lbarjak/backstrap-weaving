export default class Polygon {
  static serNum = 0;

  constructor(drawing, x, y, color) {
    this.serNum = Polygon.serNum++;
    this.drawing = drawing;
    this.x = x;
    this.y = y;
    this.color = color;
    this.poly;
  }

  hex = (x, y) => [
    [x + 0, y + 7],
    [x + 7, y + 0],
    [x + 14, y + 7],
    [x + 14, y + 39],
    [x + 7, y + 46],
    [x + 0, y + 39],
  ];

  hexagon = () => {
    this.poly = this.drawing.polygon(this.hex(this.x, this.y));
    this.poly.on("click", (e) =>
      console.log(
        "clicked",
        this.serNum,
        e.target.points[0].x,
        e.target.points[0].y
      )
    );
    this.poly.fill(this.color);
    this.poly.stroke({ width: 0 });
  };
}
