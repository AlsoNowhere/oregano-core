import { Resolver, Store, refresh } from "mint";

import { path, wait } from "sage";

import { Line } from "basil";

import { getItem } from "../services/get-item.service";

import { Item } from "../models/Item.model";

interface ICoords {
  x: number;
  y: number;
  label: string;
}

const flattenData = (() => {
  let index = 0;
  return (list: Array<Item>, arr?: Array<ICoords>) => {
    if (!(arr instanceof Array)) {
      arr = [];
      index = 0;
    }
    list.forEach((item) => {
      if (item.title.includes(" -- ")) {
        const [label, y] = item.title.split(" -- ");
        arr.push({ x: index++, y: parseFloat(y), label });
      }
      item.items instanceof Array && flattenData(item.items, arr);
    });
    return arr;
  };
})();

const loadData = () => {
  const data = flattenData(graphStore.currentList);
  const maxY = Math.ceil(data.reduce((a, b) => (b.y > a ? b.y : a), -Infinity));
  const minY = Math.floor(data.reduce((a, b) => (b.y < a ? b.y : a), Infinity));
  new Line(graphStore.svgElementRef, data, {
    xLabelsAreVertical: true,
    borderColour: "lightgrey",
    pointColour: "#3d7fe3",
    lineColour: "#3d7fe3",
    pointSize: 3,
    tooltip: true,
    maxY,
    minY,
    interval: 0.5,
  });
};

class GraphStore extends Store {
  currentTitle: string;
  currentList: Array<Item>;
  showGraph: boolean;
  svgElementRef: SVGElement | null;

  constructor() {
    super({
      currentTitle: new Resolver(() => {
        const item = getItem(path.get().slice(1));
        if (item === null) return "";
        return item.title;
      }),

      currentList: new Resolver(() => {
        const item = getItem(path.get().slice(1));
        if (item === null) return [];
        return item.items;
      }),

      svgClass: new Resolver(() => {
        return `visibility: ${graphStore.showGraph ? "visible" : "hidden"};`;
      }),

      showGraph: false,
      svgElementRef: null,

      oninsert: async function () {
        graphStore.showGraph = false;
        await wait();
        refresh(graphStore);
        await wait(300);
        graphStore.showGraph = true;
        refresh(graphStore);
        loadData();
      },
    });
  }
}

export const graphStore = new GraphStore();
