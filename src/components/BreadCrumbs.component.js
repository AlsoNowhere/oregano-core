
import { path } from "thyme-core";

import { getItemFromPath } from "../services/get-list-from-path.service";

export const BreadCrumbs = function(){

    this.list = function(){
        let current = this.current.root;
        return [this.current.root.title,...path.path.map(x=>{
            current = current.list[x];
            return current.title;
        })];
    }

    this.changePath = function(){
        path.path = [...path.path.slice(0,this._index)];
        this.current.item = getItemFromPath();
    }

    return dillx(
        <div class="margin-bottom">
            <ul class="reset-list flex">
                <li dill-for="list">
                    <span class="padding hover click-cursor" click--="changePath">{_item}</span>
                    <span class="margin-right padded-top padded-bottom" dill-if={this._index !== this.list().length - 1}>/</span>
                </li>
            </ul>
        </div>
    )
}
