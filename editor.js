import Datas from "./datas.js";
import PatternEditor from "./patterneditor.js";
import Drawing from "./drawing.js";

export default class Editor {
  constructor() {
    this.selectorOfSheet = "#editor";
    //this.editor = SVG().addTo(this.selectorOfSheet).size(600, 600);
    this.drawing = new Drawing(this.selectorOfSheet);
    //this.rect = this.editor.rect(600, 600).attr({ fill: "gray" });
    this.patternEditor = new PatternEditor().patternEditor;
    this.patternProcessor();
  }

  patternProcessor = () => {
    this.patternEditor();
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
        .replaceAll("black", "f")
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
      const regex = /^[-]*[svf]{4,}[-]*$/g;
      let middle = 301 + 8 - (37 - upperStart - upperEnd) * 8;
      if (upper.length === lower.length) middle += 4;
      let lefty = 0;
      if (upperStart - lowerStart === 1 && upper.length === lower.length)
        lefty = -1;
      if (
        (upperStart - lowerStart === 0 || upperStart - lowerStart === 1) &&
        (upperEnd - lowerEnd === 0 || upperEnd - lowerEnd === 1) &&
        upperFull.match(regex) &&
        lowerFull.match(regex)
      )
        this.drawing.initDraw("myown", middle, 92, 12, lefty);
      else alert("Valami nincs rendben!");
    });

    x.addEventListener("click", () => {
      this.color = "white";
      this.drawing.reset(-1);
      this.patternEditor();
    });
  };
}
