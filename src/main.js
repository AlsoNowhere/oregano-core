
// Components
// import { Header } from "./components/Header.component";

// import { List } from "./components/List.component";
import { List2 } from "./components/List2.component";
// import { ManageItem } from "./components/ManageItem.component";
import { ManageItem2 } from "./components/ManageItem2.component";
// import { MainButtons as _MainButtons } from "./components/MainButtons.component";
import { ExportData } from "./components/ExportData.component";
import { ImportData } from "./components/ImportData.component";

// import { Settings } from "./components/Settings.component";
// import { MainButtonComponent } from "./components/MainButton.component";
// import { DeleteAllData, DeleteDataModal } from "./components/DeleteAllData.component";

import { TreeView } from "./components/TreeView.component";

// import { BreadCrumbs } from "./components/BreadCrumbs.component";


//Models
// import { MainButton as _MainButton } from "./models/MainButton.model";
// import { ItemColour as _ItemColour } from "./models/ItemColour.model";
import { Item } from "./models/Item.model";
import { ListOption } from "./models/ListOption.model";
import { MainButton } from "./models/MainButton.model";
import { ExtraField } from "./models/ExtraField.model";

// Services
// import { setUpOregano } from "./services/set-up-oregano.service";
// import { saveData as _saveData } from "./services/save-data.service";
import { getItemFromPath } from "./services/get-list-from-path.service";
// import { getData } from "./services/get-data.service";
import { getData2 } from "./services/get-data2.service";
import { saveService } from "./services/save.service";

// Stores
// import { settingsStore } from "./stores/settings.store";
// import { deleteDataStore } from "./stores/delete-data.store";

import { version } from "./data/version.data";






// Components
// export const List = _List;
// export const MainButtons = _MainButtons;
// export const ManageItem = _ManageItem;
// export const ExportData = _ExportData;
// export const ImportData = _ImportData;

// Models
// export const MainButton = _MainButton;
// export const ItemColour = _ItemColour;
// export const Item = _Item;
// export const ListOption = _ListOption;

// Services
// export const saveData = _saveData;
// export const getItemFromPath = _getItemFromPath;

// Data
// export const itemColours = _itemColours;



export {

// Components
    // Header,

    // List,
    List2,
    // ManageItem,
    ManageItem2,

    ExportData,
    ImportData,

    // Settings,
    // DeleteAllData,
    // DeleteDataModal,

    TreeView,
    // BreadCrumbs,

// Models
    Item,
    ListOption,
    MainButton,
    // MainButtonComponent,
    ExtraField,

// Services
    // setUpOregano,
    getItemFromPath,
    // getData,
    getData2,
    saveService,

// Stores
    // settingsStore,
    // deleteDataStore,

// Data
    version
}
