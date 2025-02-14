import {
  MintScope,
  MintEvent,
  UpwardRef,
  component,
  div,
  node,
  refresh,
  span,
  Resolver,
  mFor,
} from "mint";

import { toast } from "sage";

import { Button, Field, TButton, TField } from "thyme";

import { manageStore } from "../../../stores/manage.store";

import { Tag } from "../../../models/Tag.model";

class TagsComponents extends MintScope {
  tags: Resolver<Array<Tag>>;

  setTabsValue: MintEvent<HTMLInputElement>;
  addTab: MintEvent<HTMLFormElement>;
  removeTab: () => void;

  tagInputRef: UpwardRef<HTMLInputElement>;

  tagsValue: Resolver<string>;

  constructor() {
    super();

    this.tags = new Resolver(() => manageStore.tags);

    this.tagInputRef = new UpwardRef(null);

    this.tagsValue = new Resolver(() => manageStore.tagsValue);

    this.setTabsValue = (_, node) => {
      manageStore.tagsValue = node.value;
    };

    this.addTab = function (event) {
      event.preventDefault();
      if (manageStore.tagsValue === "") {
        toast("No value entered for Tab");
      }
      manageStore.tags.push(new Tag(manageStore.tagsValue));
      manageStore.tagsValue = "";
      refresh(this);
      this.tagInputRef.ref.focus();
    };

    this.removeTab = function () {
      manageStore.tags.splice(this.index, 1);
      refresh(manageStore.tagsScope);
    };

    this.oninit = function () {
      manageStore.tagsScope = this;
    };
  }
}

export const Tags = component(
  "form",
  TagsComponents,
  {
    "(submit)": "addTab",
  },
  [
    div({ class: "relative" }, [
      node<TField>(Field, {
        label: "Tabs",
        "[value]": "tagsValue",
        "[onInput]": "setTabsValue",
        class: "padding-right-large",
        "[ref]": "tagInputRef",
      }),

      node(Button, {
        type: "submit",
        theme: "blueberry",
        icon: "plus",
        class: "absolute right bottom",
        square: true,
      }),
    ]),

    node(
      "ul",
      { class: "content-tags" },
      node(
        "li",
        {
          mFor: mFor("tags"),
          mKey: "tag",
          class: "content-tags__tag content-tags__tag--removable",
          style: "background-color: {tagColour};",
        },
        [
          span("{tag}"),
          node<TButton & { "[index]" }>(Button, {
            theme: "empty",
            icon: "trash-o",
            class: "absolute top right snow-text",
            "[onClick]": "removeTab",
            "[index]": "_i",
          }),
        ]
      )
    ),
  ]
);
