import Main from "./main.js";
export default class Form {
  constructor(self) {
    this.self = self;
    this.form();
  }

  form() {
    let patterns = Main.backstraps.patterns;
    let menu = document.getElementById("menu");
    menu.append("Válassz egy mintát:");
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
      this.self.init(select.value);
    });
  }
}
