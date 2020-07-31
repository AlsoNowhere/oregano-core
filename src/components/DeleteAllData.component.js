
import { Modal, closeModal } from "thyme-x";

import { MainButtonComponent } from "./MainButton.component";

import { MainButton } from "../models/MainButton.model";

import { deleteDataStore } from "../stores/delete-data.store";
import { dataStore } from "../stores/data.store";

export const DeleteAllData = function(){
    return dillx(
        <div>
            <MainButtonComponent dill-for={[
                new MainButton("deleteData","Data all data","trash-o","tomato",() => deleteDataStore.state = "visible")
            ]} />
        </div>
    )
}

export const DeleteDataModal = function(){

    this.state = () => deleteDataStore.state;
    
    this.deleteAllData = function(){
        // localStorage.removeItem(dataStore.key);
        this.cancelDelete();
    }

    this.cancelDelete = function(){
        closeModal(deleteDataStore);
    }

    return dillx(
        <Modal state="state" label="'Are you sure you want to delete all your data?'">
            <div class="padding-medium">
                <button type="button" class="tomato large" click--="deleteAllData">Delete</button>
                <button type="button" class="smoke large" click--="cancelDelete">Cancel</button>
            </div>
        </Modal>
    )
}
