import { colours } from "../../data/colours.data";

export const getTextColour = (_colour: string) => {
  const colour = colours.find(({ colour }) => colour === _colour);
  return colour?.textColour || colours[0].colour;
};
