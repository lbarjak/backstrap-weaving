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
    this.rect.on("mousedown", (e) => this.hexagon());
  }

  hexagon = () => {
    let color = "white";
    for (let i = 0; i < 37; i++) {
      let poly = this.editor.polygon(Editor.hex(5 + 16 * i, 10));
      poly.on("click", (e) => {
        console.log("clicked", poly.attr("fill"));
        if (poly.attr("fill") === "#000000") {
          poly.attr({
            "fill-opacity": 1,
            "stroke-width": 0,
            fill: color,
          });
        } else {
          poly.attr({
            "fill-opacity": 1,
            "stroke-width": 0,
          });
          poly.fill((color = poly.attr("fill") === "white" ? "red" : "white"));
        }
      });
      poly.on("contextmenu", (e) => {
        e.preventDefault();
        poly.attr({
          "fill-opacity": 0.0001,
          stroke: "white",
          "stroke-width": 1,
        });
      });
      poly.attr({
        "fill-opacity": 0.0001,
        stroke: "white",
        "stroke-width": 1,
      });
      //poly.fill("white");
      //poly.stroke({ color: "white", width: 1 });
    }
  };
}
