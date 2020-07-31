
import { path } from "thyme-core";

import { getItemFromPath } from "../services/get-list-from-path.service";

import { ListOptions } from "./ListOptions.component";

import { dragDrop } from "../services/drag-drop.service";

export const List = function(){

    this.onpretemplate = function(){
        dragDrop(this,"list");
    }

    this.oninit = function(){
        if (this.clickitem === undefined) {
            this.clickitem = function(){
                path.path = [...path.path,this._index];
                this.updateItem();
            }
        }
    }

    this.updateItem = function(){
        this.current.item = getItemFromPath();
    }

    this.listLength = function(){
        return (this.list instanceof Function ? this.list() : this.list).length;
    }

    return dillx(
        <>
            <style>
                .list-hover:hover {
                    background-color: lightgrey!important;
                }
            </style>
            <ul class="reset-list flex">
                <li class="card grid-small-12"
                    dill-extend="extendAttributes"
                    dill-for="list">
                    <div class="relative click-cursor list-hover hover" click--="clickitem" style="background-color:{colour};">
                        <span class="absolute pinned top left width text-centre line-height blueberry-text font-bold" dill-if={this.listLength() !== 0}>{listLength}</span>
                        <p class="padded-left-medium line-height no-wrap trim">{title}</p>
                        <ListOptions options="options"
                            listindex="_index" />
                    </div>
                </li>
            </ul>
            <p dill-if="isEmpty"> - No items - </p>
        </>
    )
}
