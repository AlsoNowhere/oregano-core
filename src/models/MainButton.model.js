
import { path } from "thyme-core";

import { saveData } from "../services/save-data.service";

import { getItemFromPath } from "../services/get-list-from-path.service";

export const MainButton = function(
    name,
    title,
    icon,
    theme,
    onClick,
    options = {}
){
    this.name = name;
    this.title = title;
    this.icon = icon;
    this.theme = theme;
    this.onClick = onClick;

    this.disabled = options.disabled instanceof Function
        ? options.disabled
        : false;
    this.condition = options.condition instanceof Function
        ? options.condition
        : true;
    this.extraContent = options.extraContent;

    Object.freeze(this);
}

MainButton.addItem = new MainButton("add","Add","plus","blueberry",function(){
    this.state.state = "manage";
});
MainButton.editItem = new MainButton("edit","Edit","pencil","apple",function(){
    this.state.editing = true;
    this.state.state = "manage";
});
MainButton.levelUp = new MainButton("levelUp","Level up","level-up","snow",function(){
        path.path = path.path.slice(0,path.path.length-1);
        this.current.item = getItemFromPath();
    },
    {disabled(){
        return !!this.current.item.root;
    }}
);
MainButton.rootUp = new MainButton("rootUp","Root up","level-up","orange",function(){
    path.path = [];
    this.current.item = getItemFromPath();
},
{disabled(){
    return !!this.current.item.root;
}}
);
MainButton.exportData = new MainButton("exportData","Export data","download","apple",function(){
    this.state.state = "export";
});
MainButton.importData = new MainButton("importData","Import data","upload","snow",function(){
    this.state.state = "import";
});
MainButton.pasteItems = new MainButton("pasteItems","Paste items","paint-brush","apple",function(){
    this.current.item.list.push(...this.current.root.pasteItems);
    this.current.root.pasteItems.length = 0;
    saveData(this.current.root);
},
{
    condition(){
        return this.current.root.pasteItems.length > 0;
    },
    extraContent: `{pasteLength}`
});
MainButton.cutAll = new MainButton("cutAllItems","Cut all items from this list","scissors","orange",function(){
    window.current.root.pasteItems.push(...window.current.item.list);
    window.current.item.list.length = 0;
    saveData(this.current.root);
},
{
    condition: () => window.current.item.list.length > 0
});
MainButton.treeView = new MainButton("treeView","Tree view","list","snow",function(){
    this.state.state = "tree-view";
});
