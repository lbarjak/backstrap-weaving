import Datas from "./datas.js";
export default class Form {
  constructor(self) {
    this.self = self;
    this.form();
  }

  form() {
    let patternDrawing = (e) => {
      console.log(e);
      this.self.initDraw(
        e.target.value,
        301,
        this.self.drawing,
        this.self.selectorOfSheet,
        10,
        14
      );
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
