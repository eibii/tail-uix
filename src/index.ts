import type { App } from "vue";

import "./assets/sass/tailwind.sass";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  TXInput,
  TXCheckbox,
  TXLoading,
  TXButton,
  TXButtonText,
} from "./components";
// exportação padrão com instalação automática
export default {
  install(app: App): void {
    app.component("TXInput", TXInput);
    app.component("TXCheckbox", TXCheckbox);
    app.component("TXLoading", TXLoading);
    app.component("TXButton", TXButton);
    app.component("TXButtonText", TXButtonText);
  },
};
// exportação individual
export { TXLoading, TXInput, TXCheckbox, TXButton, TXButtonText };
