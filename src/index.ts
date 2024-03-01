import type { App } from "vue";

import "./assets/sass/tailwind.sass";
import "bootstrap-icons/font/bootstrap-icons.css";

import { TXInput } from "./components";
// exportação padrão com instalação automática
export default {
  install(app: App): void {
    app.component("TXInput", TXInput);
  },
};
// exportação individual
export { TXInput };
