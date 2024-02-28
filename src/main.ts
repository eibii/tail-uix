import type { App } from "vue";

import "./assets/sass/tailwind.sass";

import TXInput from "./components/TXInput";
// exportação individual
export { TXInput };
// exportação padrão com instalação automática
export default {
  install(app: App): void {
    app.component("TXInput", TXInput);
  },
};
