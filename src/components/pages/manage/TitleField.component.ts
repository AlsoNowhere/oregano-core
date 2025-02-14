import { component, MintEvent, MintScope, node, Resolver } from "mint";

import { Field, TField } from "thyme";

import { manageStore } from "../../../stores/manage.store";

class TitleFieldComponent extends MintScope {
  title: Resolver<string>;
  setTitle: Resolver<MintEvent>;

  constructor() {
    super();

    this.title = new Resolver(() => manageStore.title);
    this.setTitle = new Resolver(() => manageStore.setTitle);
  }
}

export const TitleField = component(
  "<>",
  TitleFieldComponent,
  null,
  node<TField>(Field, {
    name: "title",
    "[value]": "title",
    label: "Title",
    required: true,
    id: "title-field",
    "[onInput]": "setTitle",
  })
);
