
import { getItemFromPath } from "./get-list-from-path.service";

export const updateItem = () => {
    window.current.item = getItemFromPath();
}

