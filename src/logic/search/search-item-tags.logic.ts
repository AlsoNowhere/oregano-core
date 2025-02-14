import { Item } from "../../models/Item.model";

export const searchItemTags = (
  items: Array<Item>,
  _tags: string,
  output: Array<Item> = []
) => {
  const tags = _tags.split(" ");

  for (let item of items) {
    searchItemTags(item.items, _tags, output);
    if (output.includes(item)) {
      continue;
    }
    for (let tag of tags) {
      if (item.tags === undefined) {
        continue;
      }
      if (!!item.tags.find((x) => x.tag === tag)) {
        output.push(item);
        break;
      }
    }
  }

  return output;
};
