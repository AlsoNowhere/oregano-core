import { MintEvent, refresh, Resolver, Store } from "mint";

import { path, wait } from "sage";

import { FieldsetOption } from "thyme";

import { backToList } from "../services/back-to-list.service";
import { getActionAbles } from "../services/get-actions.service";

import { saveData } from "../logic/load-save.logic";
import { setFocusOnFirstMainButton } from "../logic/set-focus-on-first-main-button.logic";

import { listStore } from "./list.store";

import { Item } from "../models/Item.model";
import { Tag } from "../models/Tag.model";

import { IRootData } from "../interfaces/IRootData.interface";

import { colours } from "../data/colours.data";
import { actionButtons } from "../data/action-buttons.data";

import { ActionTypes } from "../enums/ActionTypes.enum";

import { defaultManageChildren } from "../defaults/manage-children.default";

const createInsert = () => {
  manageStore.title = "";
  manageStore.message = "";
  manageStore.currentColour = manageStore.colours[0].value;
  manageStore.tags = [];
  actionButtons.forEach((x) => (x.active = false));
};

const editInsert = () => {
  manageStore.title = manageStore.editItem.title;
  {
    const message = manageStore.editItem.message;
    manageStore.message = message;
  }

  manageStore.currentColour = manageStore.editItem.colour;
  manageStore.tags = manageStore.editItem.tags ?? [];
  actionButtons.forEach((x) => (x.active = false));
  (manageStore.editItem.actions || []).forEach((_action) => {
    const actionButton = actionButtons.find(({ id }) => id === _action);
    if (actionButton === undefined) return;
    actionButton.active = true;
  });
};

const oninsert = async () => {
  const isEdit = manageStore.editItem !== null;

  if (!isEdit) {
    createInsert();
  } else {
    editInsert();
  }

  await wait();
  const form = manageStore.manageFormElementRef;

  if (form !== null) {
    const titleElementRef = (
      [...form.elements] as Array<HTMLInputElement | HTMLButtonElement>
    ).find((x) => x.name === "title");

    titleElementRef?.focus();
  }

  refresh(manageStore);
};

const createItem = () => {
  const tags =
    manageStore.tags.length === 0 ? undefined : [...manageStore.tags];

  const newItem = new Item();

  const elements = [...manageStore.manageFormElementRef.elements] as Array<
    HTMLInputElement | HTMLButtonElement
  >;

  if (elements.find((x) => x.name === "title")) {
    newItem.title = manageStore.title;
  }
  if (elements.find((x) => x.name === "message")) {
    newItem.message = manageStore.message;
  }
  if (elements.find((x) => x.name === "colour")) {
    newItem.colour = manageStore.currentColour;
  }

  if (!!tags) {
    newItem.tags = tags;
  }

  newItem.actions = actionButtons
    .filter(({ active }) => active)
    .map((x) => x.id);

  {
    const actions = getActionAbles(newItem.actions, ActionTypes.init);
    actions.forEach((x) => {
      if (x instanceof Function) {
        x(newItem);
      }
    });
  }

  {
    // ** There should only be one action that matches this if any do.
    // ** We don't want several to run.
    const [action] = getActionAbles(
      newItem.actions,
      ActionTypes["add-to-list"]
    );
    if (action instanceof Function) {
      action(listStore.item, newItem);
    } else {
      listStore.list.push(newItem);
    }
  }
};

const editItem = () => {
  const { editItem } = manageStore;

  {
    const actions = getActionAbles(editItem.actions || [], ActionTypes.init);
    actions.forEach((x) => {
      if (x instanceof Function) {
        x(editItem);
      }
    });
  }

  const elements = [...manageStore.manageFormElementRef.elements] as Array<
    HTMLInputElement | HTMLButtonElement
  >;

  if (elements.find((x) => x.name === "title")) {
    editItem.title = manageStore.title;
  }
  if (elements.find((x) => x.name === "message")) {
    editItem.message = manageStore.message;
  }
  if (elements.find((x) => x.name === "colour")) {
    editItem.colour = manageStore.currentColour;
  }

  manageStore.editItem.actions = actionButtons
    .filter(({ active }) => active)
    .map((x) => x.id);

  {
    const tags =
      manageStore.tags.length === 0 ? undefined : [...manageStore.tags];
    manageStore.editItem.tags = tags;
  }

  manageStore.editItem = null;
};

const onSubmit: MintEvent<HTMLFormElement> = (event) => {
  event.preventDefault();

  if (manageStore.editItem === null) {
    createItem();
  } else {
    editItem();
  }

  saveData();

  backToList();
  setFocusOnFirstMainButton();
};

class ManageStore extends Store {
  manageFormElementRef: HTMLFormElement | null;
  title: string;
  message: string;
  colours: Array<FieldsetOption>;
  currentColour: string;
  tagsValue: string;
  tags: Array<Tag>;
  tagsScope: {};
  toEditMethod: "main-button" | "item-button";

  editItem: IRootData | Item | null;

  setTitle: MintEvent;
  setMessage: MintEvent;
  setColour: MintEvent;

  onSubmit: MintEvent;

  cancel: () => void;

  constructor() {
    super({
      defaultChildren: () => defaultManageChildren,

      manageFormElementRef: null,
      title: "",
      message: "",
      colours: colours.map(
        (x) =>
          ({
            value: x.colour,
          } as FieldsetOption)
      ),
      currentColour: colours[0].colour,
      tagsValue: "",
      tags: [],
      tagsScope: null,
      toEditMethod: "main-button",

      editItem: null,

      mainLabel: new Resolver(() =>
        manageStore.editItem !== null ? "Edit" : "Add"
      ),

      saveButtonLabel: new Resolver(() =>
        manageStore.editItem !== null ? "Edit" : "Add"
      ),

      saveButtonTheme: new Resolver(() =>
        manageStore.editItem !== null ? "apple" : "blueberry"
      ),

      setTitle(_, element) {
        manageStore.title = element.value;
      },
      setMessage(_, element) {
        manageStore.message = element.value;
      },
      setColour(_, element) {
        manageStore.currentColour = element.value;
      },

      oninsert,

      onSubmit,

      cancel() {
        if (manageStore.toEditMethod === "item-button") {
          path.set(path.get().slice(0, -1));
        }
        backToList();
      },
    });
  }
}

export const manageStore = new ManageStore();
