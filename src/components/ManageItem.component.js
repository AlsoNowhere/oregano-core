
import { update } from "thyme-core";

import { saveData } from "../services/save-data.service";

import { itemColours } from "../data/item-colours.data";

import { Item } from "../models/Item.model";

const fields = ["title","message","colour"];

export const ManageItem = function(){

    this.oninit = function(){
        if (this.cancel === undefined) {
            this.cancel = function(){
                this.state.state = "list";
                this.state.editing = false;
                this.state.editIndex = null;
            }
        }
        if (this.save === undefined) {
            this.save = function(){
                if (!this.state.editing) {
                    this.current.item.list.push(Object.assign(new Item(),this.formdata()));
                    setTimeout(()=>{
                        this.mainbuttonselement && this.mainbuttonselement.children[0].children[0].children[0].focus();
                    },0);
                }
                else {
                    if (this.state.editIndex === null) {
                        Object.assign(this.current.item,this.formdata());
                    }
                    else {
                        Object.assign(this.current.item.list[this.state.editIndex],this.formdata());
                    }
                }
                saveData(this.current.root);
                this.cancel();
            }
        }
    }

    this.oninserted = function(){
        setTimeout(()=>{
            this.titleelement.focus();

        },0);

        if (this.state.editing) {
            let currentItem = this.current.item;
            if (this.state.editIndex !== null) {
                currentItem = currentItem.list[this.state.editIndex];
            }
            this.title = currentItem.title;
            this.message = currentItem.message;
            this.colour = currentItem.colour;
        }
        else {
            this.title = "";
            this.message = "";
            this.colour = "#fff";
        }
    }

    fields.forEach(x=>{
        this[x] = "";
    });

    this.titleelement = null;

    this.update = update;

    this.formdata = function(){
        return fields.reduce((a,b)=>(a[b]=this[b],a),{});
    };

    this.submit = function(event){
        event.preventDefault();
        this.save();
    }

    return dillx(
        <form class="flex" autocomplete="off" submit--="submit">
            <div class="grid-small-12 grid-medium-9">
                <label>
                    <span>Title</span>
                    <input name="title"
                        value-="title"
                        input--="update"
                        titleelement---="" />
                </label>
                <label>
                    <span>Message</span>
                    <textarea name="message"
                        value-="message"
                        input--="update"
                        style="height:200px;resize:none;"></textarea>
                </label>
            </div>
            <fieldset class="grid-small-12 grid-medium-3 padded">
                <legend>Colour</legend>
                <ul class="reset-list flex">
                    <li class="grid-small-4"
                        dill-for={this.colours||itemColours}>
                        <label class="padded margin-right"
                            style="border-radius:4px;border:4px solid {value}">
                            <input type="radio"
                                name="colour"
                                value-="value"
                                checked-={this.value === this.colour}
                                input--="update" />
                        </label>
                    </li>
                </ul>
            </fieldset>

            <div class="grid-small-12">
                <button class="large padded">Save</button>
                <button type="button"
                    class="smoke large margin-left padded"
                    dill-if={this.cancel instanceof Function}
                    click--="cancel">Cancel</button>
            </div>
        </form>
    )
}
