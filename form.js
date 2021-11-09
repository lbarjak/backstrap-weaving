import Datas from "./datas.js";
import Drawing from "./drawing.js";
export default class Form {
  constructor() {
    this.selectorOfSheet = "#backstrap";
    this.drawing = new Drawing(this.selectorOfSheet);
    this.drawing.initDraw("keskeny_csíkos", 301, 10, 14);
    this.form();
  }

  form() {
    let patternDrawing = (e) => {
      this.drawing.initDraw(e.target.value, 301, 10, 14);
    };

    let patterns = Datas.backstraps.patterns;
    let menu = document.getElementById("menu");
    menu.append("Válassz egy mintát (Choose a pattern):");
    let form = document.createElement("form");
    menu.append(form);
    let select = document.createElement("select");
    select.style.borderRadius = "5px";
    form.append(select);
    let option;
    for (const [key] of Object.entries(patterns)) {
      option = document.createElement("option");
      option.value = key;
      option.append(key.replaceAll("_", " "));
      select.append(option);
    }
    select.addEventListener("change", patternDrawing);
  }
}
