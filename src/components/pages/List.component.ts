import {
  MintScope,
  component,
  div,
  node,
  mFor,
  mIf,
  mRef,
  span,
  mExtend,
} from "mint";

import { styles } from "sage";

import { Breadcrumbs } from "../additions/Breadcrumbs.component";
import { ItemOptions } from "./list/ItemOptions.component";
import { ItemTitle } from "./list/ItemTitle.component";
import { Message } from "./list/Message.component";
import { Title } from "./list/Title.component";

import { listStore } from "../../stores/list.store";

import { dragDrop } from "../../data/drag-drop.data";

class ListComponent extends MintScope {
  constructor() {
    super();

    listStore.connect(this);
  }
}

export const List = component(
  "section",
  ListComponent,
  { class: "list-page" },
  [
    node(
      "div",
      { class: "list-page__container" },
      node("div", { class: "list-page__container-items" }, [
        node(Breadcrumbs, { mIf: mIf("breadcrumbs") }),

        node(Title),

        node(
          "ul",
          { mIf: mIf("item.tags"), class: "content-tags" },
          node(
            "li",
            {
              mFor: mFor("item.tags"),
              mKey: "tag",
              class: "content-tags__tag",
              style: "background-color: {tagColour};",
            },
            [span("{tag}")]
          )
        ),

        node("div", { class: "flex" }, [
          node(Message, {
            "[message]": "item.message",
            "[messageClass]": "messageClass",
          }),

          div(
            { class: "list-page__list-container {messageClass}" },
            node(
              "ul",
              {
                mIf: mIf("hasList"),
                mRef: mRef("listElementRef"),
                class: "list list-page__list",
                id: "list",
              },
              node(
                "li",
                {
                  mFor: mFor("list"),
                  mKey: "index",
                  class: "list-page__item",
                  style: styles({
                    "background-color": "{colour}",
                    color: "{getTextColour}",
                  }),
                  mExtend: mExtend(dragDrop),
                },
                node(
                  "div",
                  {
                    class: "list-page__item-container",
                  },
                  [
                    node(ItemTitle, {
                      "[title]": "title",
                      "[index]": "_i",
                      "[selectItem]": "selectItem",
                    }),
                    node(ItemOptions, {
                      "[index]": "_i",
                    }),
                  ]
                )
              )
            )
          ),
        ]),
      ])
    ),
  ]
);
