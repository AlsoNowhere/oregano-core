import { component, MintEvent, MintScope, node, Resolver } from "mint";

import { Field, TField } from "thyme";

import { styles } from "sage";

import { manageStore } from "../../../stores/manage.store";

export type TMessageField = {
  height?: number;
};

class MessageFieldComponent extends MintScope {
  message: Resolver<string | Array<string>>;
  setMessage: Resolver<MintEvent>;
  height: number;

  constructor() {
    super();

    this.message = new Resolver(() => {
      const { message } = manageStore;
      return message;
    });
    this.setMessage = new Resolver(() => manageStore.setMessage);
    this.height = 23;
  }
}

export const MessageField = component(
  "<>",
  MessageFieldComponent,
  null,
  node<TField>(Field, {
    type: "textarea",
    name: "message",
    "[value]": "message",
    label: "Message",
    labelClass: "relative",
    class: "manage-form__message",
    id: "message-field",
    fieldStyles: styles({ height: "{height}rem" }),
    "[onInput]": "setMessage",
  })
);
