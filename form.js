import Main from "./main.js";
import Datas from "./datas.js";
export default class Form {
  constructor(self) {
    this.self = self;
    this.form();
  }

  form() {
    let patterns = Datas.backstraps.patterns;
    let menu = document.getElementById("menu");
    menu.append("Válassz egy mintát (Choose a pattern):");
    let form = document.createElement("form");
    menu.append(form);
    let select = document.createElement("select");
    form.append(select);
    let option;
    for (const [key] of Object.entries(patterns)) {
      option = document.createElement("option");
      option.value = key;
      option.append(key);
      select.append(option);
    }
    select.addEventListener("click", (e) => {
      this.self.initDraw(select.value);
    });
  }
}
