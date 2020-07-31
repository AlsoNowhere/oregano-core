
import { Root } from "../models/Root.model";

import { dataStore } from "../stores/data.store";
import { settingsStore } from "../stores/settings.store";

const defaultData = `{"root":true,"title":"Root","list":[],"pasteItems":[],"undoList":[],"settings":${JSON.stringify(settingsStore)}}`;

export const getData = () => {
    const data = JSON.parse(localStorage.getItem(dataStore.key) || defaultData);

    return new Root(
        data.title||"Root",
        data.list||[],
        data.pasteItems||[],
        data.settings||settingsStore
    );
}
