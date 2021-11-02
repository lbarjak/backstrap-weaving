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

  hexagon() {
    let poly;
    for (let i = 0; i < 37; i++) {
      poly = this.editor.polygon(Editor.hex(5 + 16 * i, 10));
      poly.attr({ "fill-opacity": 0 });
      poly.stroke({ color: "white", width: 1 });
    }
  }
}
