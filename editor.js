export default class Editor {
  constructor() {
    this.editor = SVG()
      .addTo("#editor")
      .size(600, 600)
      .move(650, 0)
      .fill("#f06");
    this.rectEditor = this.editor.rect(600, 600).attr({ fill: "gray" });
  }
}
