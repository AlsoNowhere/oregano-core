import { component, MintEvent, MintScope, node, Resolver } from "mint";

import { Field, TField } from "thyme";

import { styles } from "sage";

import { manageStore } from "../../../stores/manage.store";

class MessageFieldComponent extends MintScope {
  message: Resolver<string | Array<string>>;
  setMessage: Resolver<MintEvent>;

  constructor() {
    super();

    this.message = new Resolver(() => {
      const { message } = manageStore;
      return message;
    });
    this.setMessage = new Resolver(() => manageStore.setMessage);
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
    fieldStyles: styles({ height: "23rem", resize: "none" }),
    "[onInput]": "setMessage",
  })
);
