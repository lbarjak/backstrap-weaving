import Main from "./main.js";
import Polygon from "./polygon.js";

export default class Editor {
  constructor(self) {
    this.self = self;
    this.editor = SVG().addTo("#editor").size(600, 600);
    this.rect = this.editor.rect(600, 600).attr({ fill: "gray" });
    this.hexagons();
    this.color = "white";
  }

  hexagons = () => {
    let shift = 0;
    for (let i = 0; i <= 36; i++) {
      this.draw(i, shift);
    }
    shift = 1;
    for (let i = 0; i <= 35; i++) {
      this.draw(i, shift);
    }
    let ok = document.getElementById("ok");
    let x = document.getElementById("x");
    let upperFull;
    let lowerFull;
    ok.addEventListener("click", () => {
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
      console.log(upperFull);
      console.log(lowerFull);
      let upperStart = 0;
      let lowerStart = 0;
      while (upperFull[upperStart] === "-") upperStart++;
      while (lowerFull[lowerStart] === "-") lowerStart++;
      let upperEnd = upperFull.length - 1;
      let lowerEnd = lowerFull.length - 1;
      while (upperFull[upperEnd] === "-") upperEnd--;
      while (lowerFull[lowerEnd] === "-") lowerEnd--;
      console.log(
        upperEnd,
        lowerEnd,
        upperStart - lowerStart,
        upperEnd - lowerEnd
      );
      let upper = upperFull.substring(upperStart, upperEnd + 1);
      let lower = lowerFull.substring(lowerStart, lowerEnd + 1);
      console.log(upper);
      console.log(lower);
      let myown = { upper: upper, lower: lower };
      Main.backstraps.patterns.myown = myown;
      const regex = /^[-]*[sv]{4,}[-]*$/g;
      if (
        (upperStart - lowerStart === 0 || upperStart - lowerStart === 1) &&
        (upperEnd - lowerEnd === 0 || upperEnd - lowerEnd === 1) &&
        upperFull.match(regex) &&
        lowerFull.match(regex)
      )
        this.self.initDraw("myown");
      else alert("Valami nincs rendben!");
      let select = document.querySelector("select");
      let option = document.createElement("option");
      option.value = "myown";
      option.selected = true;
      option.append("my own");
      select.append(option);
    });
  };

  draw = (i, shift) => {
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
