
import { logger } from "sage";

import { MainButton } from "../models/MainButton.model";

export const MainButtons = function(){

    this.onprerender = function(){
        let buttons = this.buttons;
        if (buttons instanceof Function) {
            buttons = buttons();
        }
        if (!(buttons instanceof Array)) {
            logger.error("Oregano core","MainButtons Component","buttons","You must pass an Array to the buttons property.");
        }
        const length = buttons.length;
        buttons = buttons.filter(x=>x instanceof MainButton);
        if (buttons.length < length) {
            logger.warn("Oregano core","MainButtons Component","buttons",`${length - buttons.length} items were filtered out of the list for not being instances of MainButton.model. Please clean your data.`);
        }
        this.buttons = buttons;
    }

    this.pasteLength = () => window.current.root.pasteItems.length;

    return dillx.isolate(
        <ul class="reset-list flex" $mainbuttonselement>
           <li dill-for="buttons">
                <button type="button"
                    title-="title"
                    class-={`${this.theme} square large ${this._index === 0 ? "" : "margin-left"}`}
                    disabled-="disabled"
                    dill-if="condition"
                    click--="onClick">
                    <span class="fa fa-{icon}"></span>
                    <span dill-if={this.extraContent !== undefined} dill-template="extraContent"></span>
                </button>
            </li> 
        </ul>
    )
}
