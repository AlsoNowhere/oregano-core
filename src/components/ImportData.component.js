
import { update } from "thyme-core";

import { Field } from "thyme-x";

// import { recurseInputData } from "../services/recurse-input-data.service";
// import { saveData } from "../services/save-data.service";

export const ImportData = function(){

    this.oninserted = function(){
        this.importvalue = "";
    }

    this.formSubmit = function(event){
        event.preventDefault();
    //     const json = JSON.parse(this.importvalue);

    //     recurseInputData(json,this.current.item);

    //     saveData(this.current.root);
    //     this.importvalue = "";
    //     this.state.state = "list";

        this.submit(this.importvalue);
    }

    this.importvalue = "";
    this.onInput = update;

    return dillx(
        // <section>
            <form submit--="formSubmit">
                <Field type="'textarea'"
                    name="'importvalue'"
                    label="'Enter JSON data here'"
                    value="importvalue" />
                <button class="large padded">Import data</button>
            </form>
        // </section>
    )
}
