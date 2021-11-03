export default class Polygon {
  static serNum = 0;
  static hex = (x, y) => [
    [x + 0, y + 7],
    [x + 7, y + 0],
    [x + 14, y + 7],
    [x + 14, y + 39],
    [x + 7, y + 46],
    [x + 0, y + 39],
  ];

  constructor(drawing, x, y, color) {
    this.serNum = Polygon.serNum++;
    this.drawing = drawing;
    this.x = x;
    this.y = y;
    this.color = color;
    this.hexagon();
  }

  hexagon = () => {
    let poly = this.drawing.polygon(Polygon.hex(this.x, this.y));
    // poly.on(["mousedown", "touchstart"], (e) => {
    //   console.log(
    //     `Clicked! serNum: ${this.serNum}; x=${e.target.points[0].x}; y=${e.target.points[0].y}`
    //   );
    //   poly.fill(this.color === "red" ? "white" : "red");
    // });
    // poly.on(["mouseup", "mouseout", "touchend", "touchcancel"], () =>
    //   poly.fill(this.color)
    // );
    poly.fill(this.color);
    poly.stroke({ width: 0 });
  };
}
