
import { update } from "thyme-core";

import { itemColours } from "../data/item-colours.data";

const extraPropertiesUpdate = function(_, element){
    if (element.type === "checkbox" || element.type === "radio") {
        this._item.checked = element.checked;
    }
    else {
        this._item.value = element.value;
    }
}

const nonInputTypes = ["select","textarea","input-with-button"];

export const ManageItem2 = function(){

    this.oninserted = function(){
        if (this.edititem){
            this.title = this.edititem.title;
            this.message = this.edititem.message;
            this.colour = this.edititem.colour;
        }
        else {
            this.title = "";
            this.message = "";
            this.colour = itemColours[0].value;
        }
    }

    this.title = "";
    this.message = "";
    this.colour = itemColours[0].value;

    this.update = update;

    this.altupdate = extraPropertiesUpdate;

    this.submit = function(event){
        event.preventDefault();
        this.onSubmit && this.onSubmit(this.title, this.message, this.colour);
    }

    return dillx(
        <form class="flex" autocomplete="off" submit--="submit" manageformelement---="">

            <div class="grid-small-12 grid-medium-6">
                <label>
                    <span class="required">Title</span>

                    <input name="title"
                        class="large"
                        value-="title"
                        required
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

            <fieldset class="grid-small-12 grid-medium-6 padded" dill-if="showcolour">
                <legend>Colour</legend>

                <ul class="reset-list flex">
                    <li class="margin-right-small" dill-for={itemColours}>

                        <label class="padding-small" style="border-radius:4px;border:4px solid {value}">

                            <input type="radio"
                                name="colour"
                                value-="value"
                                checked-={this.value === this.colour}
                                input--={this.colour = this.value} />
                        </label>
                    </li>
                </ul>
            </fieldset>

            <div class-="classes" dill-for="extrafields">

                <label class-="classes" dill-if={this.type !== "radio"}>
                    <span>{label}</span>

                    <input type-="type"
                        name-="name"
                        class="large"
                        value-="value"
                        checked-="checked"
                        input--="altupdate"
                        dill-if={!nonInputTypes.includes(this.type)} />

                    <select name-="name" class="large" value-="value" input--="altupdate" dill-if={this.type === "select"}>
                        <option value-="value" dill-for="options">{label}</option>
                    </select>

                    <div dill-if={this.type === "input-with-button"}>
                        <input name-="name" class="large margin-bottom-small" />
                        <button type="button" class="apple large" click--="event">Add</button>
                    </div>
                </label>

                <div dill-if={!!this.fieldTemplate}>
                    <div dill-template="fieldTemplate"></div>
                </div>

                <fieldset dill-if={this.type === "radio"}>
                    <legend>{label}</legend>
                    <label dill-for="options">
                        <input type="radio" name-="name" value-="value" checked-="checked" />
                        <span>{label}</span>
                    </label>
                </fieldset>
            </div>

            <div class="grid-small-12">
                <button class="large padded">Save</button>

                <button type="button"
                    class="smoke large margin-left padded"
                    click--="cancel">Cancel</button>
            </div>
        </form>
    )
}
ManageItem2.defaults = {
    extrafields: () => [],
    showcolour: true
}
