import type { App } from "vue";

import "./assets/sass/tailwind.sass";
import "bootstrap-icons/font/bootstrap-icons.css";

import { TXInput, TXCheckbox } from "./components";
// exportação padrão com instalação automática
export default {
  install(app: App): void {
    app.component("TXInput", TXInput);
    app.component("TXCheckbox", TXCheckbox);
  },
};
// exportação individual
export { TXInput, TXCheckbox };
