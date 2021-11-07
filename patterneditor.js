import Polygon from "./polygon.js";

export default class PatternEditor {
  constructor(editor) {
    this.editor = editor;
    this.color = "white";
    this.colorsPressed = 0;
    this.colorSwitcher();
  }

  colorSwitcher() {
    let colors = document.getElementById("colors");
    colors.addEventListener("click", () => {
      this.colorsPressed = this.colorsPressed ? 0 : 1;
      colors.value = this.colorsPressed + 2 + " szín";
    });
  }

  patternEditor = () => {
    let draw = (i, shift) => {
      let poly = this.editor.polygon(
        Polygon.hex(shift * 8 + (5 + 16 * i), shift * 41 + 10)
      );
      poly.attr({
        "fill-opacity": 0.0001,
        stroke: "white",
        "stroke-width": 1,
      });
      let lastColor;
      let colorsOrder = {
        0: { white: "red", red: "white", black: "white" },
        1: { white: "red", red: "black", black: "white" },
      };
      poly.on("click", (e) => {
        lastColor = poly.attr("fill");
        if (poly.attr("fill") === "#000000") {
          poly.attr({
            "fill-opacity": 1,
            "stroke-width": 0,
            fill: this.color,
          });
        } else {
          this.color = colorsOrder[this.colorsPressed][lastColor];
          poly.fill(this.color);
        }
      });
      poly.on(["contextmenu", "dblclick"], (e) => {
        e.preventDefault();
        poly.attr({
          "fill-opacity": 0.0001,
          stroke: "white",
          "stroke-width": 1,
          fill: "#000000",
        });
      });
    };
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i <= 36 - j; i++) {
        draw(i, j);
      }
    }
  };
}
