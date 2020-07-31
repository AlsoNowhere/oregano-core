
import { logger } from "sage";

import { getItemFromPath } from "./get-list-from-path.service";
import { getData } from "./get-data.service";
import { dataStore } from "../stores/data.store";
import { settingsStore } from "../stores/settings.store";

export const setUpOregano = (scope,key) => {
    if (key === undefined || typeof key !== "string") {
        logger.error("Oregano core","setUpOregano","key","You must pass a string key to connect to localStorage.");
    }

    dataStore.key = key;

    const root = getData();
    Object.keys(settingsStore.mainButtons).forEach(x=>root.settings.mainButtons[x]===undefined&&(root.settings.mainButtons[x]=true));
    Object.keys(settingsStore.itemButtons).forEach(x=>root.settings.itemButtons[x]===undefined&&(root.settings.itemButtons[x]=true));
    Object.assign(settingsStore.mainButtons,root.settings.mainButtons);
    Object.assign(settingsStore.itemButtons,root.settings.itemButtons);
    getItemFromPath.root = root;
    scope.current = {
        root,
        item: getItemFromPath(),
    };

    scope.state = new function State(){
        this.state = "list";
        this.editing = false;
        this.editIndex = null;
        Object.seal(this);
    }();
}
