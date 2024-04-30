import { component, element, template } from "mint";

export const Message = component("div", null, { class: "list-page__message" }, [
  element(
    "div",
    {
      mIf: "!messageIsArray",
      style: "white-space: pre-wrap; word-wrap: break-word; {currentStyles}",
    },
    template("renderedMessage")
  ),

  element(
    "ul",
    { mIf: "messageIsArray", class: "flex list" },
    element(
      "li",
      {
        mFor: "currentMessage",
        mKey: "_x",
        class: "padded",
        style: "white-space: pre-wrap;",
      },
      "{_x}"
    )
  ),
]);
