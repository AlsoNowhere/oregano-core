import { colours } from "../data/colours.data";

export class Tag {
  tag: string;
  tagColour: string;

  constructor(tag: string, tagColour = colours[1].colour) {
    this.tag = tag;
    this.tagColour = tagColour;
  }
}
