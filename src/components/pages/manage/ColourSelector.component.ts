import { MintEvent, MintScope, Resolver, component, node } from "mint";

import { Field, FieldsetOption, TField } from "thyme";

import { styles } from "sage";

import { manageStore } from "../../../stores/manage.store";

class ColourSelectorComponent extends MintScope {
  colours: Array<FieldsetOption>;
  currentColour: Resolver<string>;
  setColour: MintEvent;
  radioStyles: Resolver<string>;

  constructor() {
    super();

    this.colours = manageStore.colours;
    this.currentColour = new Resolver(() => manageStore.currentColour);
    this.setColour = manageStore.setColour;

    this.radioStyles = new Resolver(function () {
      return styles({
        "box-shadow": `inset 0 0 2px 2px ${this.value};`,
      });
    });
  }
}

export const ColourSelector = component(
  "div",
  ColourSelectorComponent,
  {},
  node<TField>(Field, {
    type: "fieldset",
    name: "colour",
    legend: "Colour",
    "[value]": "currentColour",
    labelClass: "round",
    "[labelStyles]": "radioStyles",
    id: "colour-field",
    "[options]": "colours",
    "[onInput]": "setColour",
  })
);
