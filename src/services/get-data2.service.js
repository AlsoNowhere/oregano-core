
import { Root } from "../models/Root.model";

// import { dataStore } from "../stores/data.store";
// import { settingsStore } from "../stores/settings.store";

const defaultData = `{"root":true,"title":"Root","list":[],"pasteItems":[],"undoList":[]}`;

export const getData2 = key => {
    const data = JSON.parse(localStorage.getItem(key) || defaultData);

    return new Root(
        data.title || "Root",
        data.list || [],
        data.pasteItems || [],
        // data.settings||settingsStore
    );
}
