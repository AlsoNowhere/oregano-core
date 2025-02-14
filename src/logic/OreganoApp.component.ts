import { MintScope } from "mint";

import { appInit } from "./app-init.logic";

import { appStore } from "../stores/app.store";

export class OreganoAppComponent extends MintScope {
  constructor() {
    super();

    this.oninsert = function () {
      appInit();
    };

    appStore.connect(this);
  }
}
