import { div, node } from "mint";

import { TitleField } from "../components/pages/manage/TitleField.component";
import { MessageField } from "../components/pages/manage/MessageField.component";
import { ColourSelector } from "../components/pages/manage/ColourSelector.component";
import { Tags } from "../components/pages/manage/Tags.component";
import { Actions } from "../components/pages/manage/Actions.component";

export const defaultManageChildren = [
  div({ class: "grid-9 padding-right-small" }, [
    node(TitleField),
    node(MessageField),
  ]),
  div({ class: "grid-3 padding-left-small" }, [
    node(ColourSelector),
    node(Tags),
  ]),
  div({ class: "grid-12" }, node(Actions)),
];
