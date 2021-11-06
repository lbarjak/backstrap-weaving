import Polygon from "./polygon.js";
import Datas from "./datas.js";

export default class Editor {
  constructor(self) {
    this.self = self;
    this.selectorOfSheet = "#editor";
    this.editor = SVG().addTo(this.selectorOfSheet).size(600, 600);
    this.rect = this.editor.rect(600, 600).attr({ fill: "gray" });
    this.hexagons();
    this.color = "white";
  }

  hexagons = () => {
    let shift = 0;
    for (let i = 0; i <= 36; i++) {
      this.drawEmptyHexagons(i, shift);
    }
    shift = 1;
    for (let i = 0; i <= 35; i++) {
      this.drawEmptyHexagons(i, shift);
    }
    let ok = document.getElementById("ok");
    let x = document.getElementById("x");
    let upperFull;
    let lowerFull;
    let opt = false;
    ok.addEventListener("click", () => {
      if (this.self.row === 0) {
        let polygons = document.querySelectorAll("#editor > svg > polygon");
        let fillAttributes = [];
        polygons.forEach((hex) => {
          fillAttributes.push(
            hex.getAttribute("fill") === null ? "-" : hex.getAttribute("fill")
          );
        });
        let fillAttributeString = fillAttributes
          .join("")
          .replaceAll("red", "s")
          .replaceAll("white", "v")
          .replaceAll("#000000", "-");
        upperFull = fillAttributeString.substring(0, 37);
        lowerFull = fillAttributeString.substring(37, 73);
        let upperStart = 0;
        let lowerStart = 0;
        while (upperFull[upperStart] === "-") upperStart++;
        while (lowerFull[lowerStart] === "-") lowerStart++;
        let upperEnd = upperFull.length - 1;
        let lowerEnd = lowerFull.length - 1;
        while (upperFull[upperEnd] === "-") upperEnd--;
        while (lowerFull[lowerEnd] === "-") lowerEnd--;
        let upper = upperFull.substring(upperStart, upperEnd + 1);
        let lower = lowerFull.substring(lowerStart, lowerEnd + 1);
        let myown = { upper: upper, lower: lower };
        Datas.backstraps.patterns.myown = myown;
        const regex = /^[-]*[sv]{4,}[-]*$/g;
        let middle = 301 + 8 - (37 - upperStart - upperEnd) * 8;
        if (upper.length === lower.length) middle += 4;
        let lefty = 0;
        if (upperStart - lowerStart === 1) lefty = -1;
        if (
          (upperStart - lowerStart === 0 || upperStart - lowerStart === 1) &&
          (upperEnd - lowerEnd === 0 || upperEnd - lowerEnd === 1) &&
          upperFull.match(regex) &&
          lowerFull.match(regex)
        )
          this.self.initDraw(
            "myown",
            middle,
            this.editor,
            this.selectorOfSheet,
            92,
            12,
            lefty
          );
        else alert("Valami nincs rendben!");
      }
    });

    x.addEventListener("click", () => {
      if (this.self.row === 0) {
        this.self.reset(this.selectorOfSheet, -1);
        let shift = 0;
        for (let i = 0; i <= 36; i++) {
          this.drawEmptyHexagons(i, shift);
        }
        shift = 1;
        for (let i = 0; i <= 35; i++) {
          this.drawEmptyHexagons(i, shift);
        }
      }
    });
  };

  drawEmptyHexagons = (i, shift) => {
    let poly = this.editor.polygon(
      Polygon.hex(shift * 8 + (5 + 16 * i), shift * 41 + 10)
    );
    poly.attr({
      "fill-opacity": 0.0001,
      stroke: "white",
      "stroke-width": 1,
    });

    poly.on("click", (e) => {
      if (poly.attr("fill") === "#000000") {
        poly.attr({
          "fill-opacity": 1,
          "stroke-width": 0,
          fill: this.color,
        });
      } else {
        poly.fill(
          (this.color = poly.attr("fill") === "white" ? "red" : "white")
        );
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
}
