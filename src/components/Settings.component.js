
import { Field } from "thyme-x";

import { settingsStore } from "../stores/settings.store";

import { Option } from "../models/Option.model";
import { saveData } from "../services/save-data.service";

export const Settings = function(){

    this.oninit = function(){
        this.mainButtonsOptions.forEach(x=>x.reset());
        this.itemButtonsOptions.forEach(x=>x.reset());
    }

    this.mainButtonsOptions = [
        new Option("add","Add item",["mainButtons","add"]),
        new Option("edit","Edit item",["mainButtons","edit"]),
        new Option("level-up","Level up",["mainButtons","levelUp"]),
        new Option("root-up","Root up",["mainButtons","rootUp"]),
        new Option("export-data","Export data",["mainButtons","exportData"]),
        new Option("import-data","Import data",["mainButtons","importData"]),
        new Option("paste-items","Paste items",["mainButtons","pasteItems"]),
        new Option("cutAll-items","Cut all items",["mainButtons","cutAllItems"]),
        new Option("treeView","Tree view",["mainButtons","treeView"]),
    ];

    this.itemButtonsOptions = [
        new Option("edit","Edit item",["itemButtons","edit"]),
        new Option("cut","Cut item",["itemButtons","cut"]),
        new Option("delete","Delete item",["itemButtons","delete"]),
    ];

    this.active = "";
    this.overflow = "";

    this.openAside = function(){
        this.overflow = this.active === "" ? "overflow-y trim-x" : "";
        this.active = this.active === "" ? "active" : "";
    }

    this.toggle = function(){
        settingsStore[this._item.settingsRoute[0]][this._item.settingsRoute[1]] = !settingsStore[this._item.settingsRoute[0]][this._item.settingsRoute[1]];
        Object.assign(this.current.root.settings.mainButtons, settingsStore.mainButtons);
        Object.assign(this.current.root.settings.itemButtons, settingsStore.itemButtons);
        Object.keys(this.mainButtonsOptions).forEach(x=>this.mainButtonsOptions[x].reset());
        Object.keys(this.itemButtonsOptions).forEach(x=>this.itemButtonsOptions[x].reset());
        saveData(this.current.root);
    }

    return dillx(
        <>
            <style>
                aside.settings .list {
                    right: -220px;
                    width: 220px;
                    transition: 0.3s;
                }
                aside.settings .list.active {
                    right: 0px;
                    width: 220px;
                }
                aside.settings .list+ div {
                    right: 0px;
                }
                // aside.settings .list.active + div {
                    // right: 24px;
                // }
                aside.settings .list.active + div button {
                    background-color: #fff;
                }
            </style>
            <aside class="settings absolute pinned top right padded-right height-full {overflow}">
                <div class="fixed list relative height-full padded padded-top-large theme-snow overflow-y {active}">
                    <h3 class="padded-top-medium">Main buttons</h3>
                    <ul class="reset-list">
                        <li dill-for="mainButtonsOptions">
                            <Field type="'checkbox'"
                                classes="'flex space-between'"
                                name="name"
                                label="label"
                                checked="value"
                                oninput="toggle" />
                        </li>
                    </ul>
                    <h3>Item buttons</h3>
                    <ul class="reset-list">
                        <li dill-for="itemButtonsOptions">
                            <Field type="'checkbox'"
                                classes="'flex space-between'"
                                name="name"
                                label="label"
                                checked="value"
                                oninput="toggle" />
                        </li>
                    </ul>
                </div>
                <div class="flex flex-end fixed pinned top">
                    <button type="button" class="empty large square" click--="openAside">
                        <span class="fa fa-bars"></span>
                    </button>
                </div>
            </aside>
        </>
    )
}
