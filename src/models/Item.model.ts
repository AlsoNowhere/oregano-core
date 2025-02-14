import { appStore } from "../stores/app.store";

import { Tag } from "./Tag.model";

import { IData } from "../interfaces/IData.interface";

import { colours } from "../data/colours.data";

import { THeatmap } from "../types/THeatmap.type";

export class Item implements IData {
  title: string;
  message: string;
  colour: string;
  actions: Array<string>;
  items: Array<Item>;
  tags: Array<Tag>;
  index: number;
  createdAt: number;
  heatmap?: THeatmap;

  constructor({
    title,
    message,
    colour,
    actions = [],
    items,
    index,
    createdAt,
    heatmap,
    tags = undefined,
  }: {
    title?: string;
    message?: string;
    colour?: string;
    actions?: Array<string>;
    items?: Array<Item>;
    index?: number;
    createdAt?: number;
    heatmap?: THeatmap;
    tags?: Array<Tag>;
  } = {}) {
    this.title = title ?? "";
    this.message = message ?? "";
    this.colour = colour ?? colours[0].colour;
    this.actions = actions;
    this.items = items ?? [];
    this.heatmap = heatmap;
    this.tags = tags;
    this.index = index ?? appStore.rootData.itemIndex++;
    this.createdAt =
      createdAt ?? Math.floor(Date.now() - appStore.rootData.timestamp_root);
  }
}
