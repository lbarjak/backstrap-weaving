export default class Editor {
  static hex = (x, y) => [
    [x + 0, y + 7],
    [x + 7, y + 0],
    [x + 14, y + 7],
    [x + 14, y + 39],
    [x + 7, y + 46],
    [x + 0, y + 39],
  ];

  constructor() {
    this.editor = SVG().addTo("#editor").size(600, 600);
    this.rect = this.editor.rect(600, 600).attr({ fill: "gray" });
    this.hexagon();
    this.color = "white";
  }

  hexagon = () => {
    let shift = 0;
    for (let i = 0; i <= 36; i++) {
      this.draw(i, shift);
    }
    shift = 1;
    for (let i = 0; i <= 35; i++) {
      this.draw(i, shift);
    }
  };

  draw = (i, shift) => {
    let poly = this.editor.polygon(
      Editor.hex(shift * 8 + (5 + 16 * i), shift * 41 + 10)
    );
    poly.on("click", (e) => {
      if (poly.attr("fill") === "#000000") {
        poly.attr({
          "fill-opacity": 1,
          "stroke-width": 0,
          fill: this.color,
        });
      } else {
        poly.attr({
          "fill-opacity": 1,
          "stroke-width": 0,
        });
        poly.fill(
          (this.color = poly.attr("fill") === "white" ? "red" : "white")
        );
      }
    });
    poly.on(["contextmenu", "dblclick"], (e) => {
      e.preventDefault();
      this.color = "white";
      poly.attr({
        "fill-opacity": 0.0001,
        stroke: "white",
        "stroke-width": 1,
        fill: "#000000",
      });
    });
    poly.attr({
      "fill-opacity": 0.0001,
      stroke: "white",
      "stroke-width": 1,
    });
    //poly.fill("white");
    //poly.stroke({ color: "white", width: 1 });
  };
}
