import type { App } from "vue";

import "./assets/sass/tailwind.sass";
import "bootstrap-icons/font/bootstrap-icons.css";

import {
  TxLoading,
  TxNotify,
  TxModal,
  TxButton,
  TxButtonText,
  TxInput,
  TxCheckbox,
} from "./components";
// exportação padrão com instalação automática
export default {
  install(app: App): void {
    app.component("TxLoading", TxLoading);
    app.component("TxNotify", TxNotify);
    app.component("TxModal", TxModal);
    app.component("TxButton", TxButton);
    app.component("TxButtonText", TxButtonText);
    app.component("TxInput", TxInput);
    app.component("TxCheckbox", TxCheckbox);
  },
};
// exportação individual
export {
  TxLoading,
  TxNotify,
  TxModal,
  TxButton,
  TxButtonText,
  TxInput,
  TxCheckbox,
};
