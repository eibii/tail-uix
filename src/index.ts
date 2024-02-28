import type { App } from "vue";

import "./assets/css/build.css";

import TXInput from "./components/TXInput";
// exportação padrão com instalação automática
export default {
  install(app: App): void {
    app.component("TXInput", TXInput);
  },
};
// exportação individual
export { TXInput };
