
import { saveData } from "./save-data.service";

export const dragDrop = (scope,listName) => {
    let index = null;

    scope.dragstart = function(){
        index = this._index;
    }
    scope.dragover = event => event.preventDefault();
    scope.drop = function(){
        if (index === null) {
            return;
        }
        const list = scope[listName] instanceof Function ? scope[listName]() : scope[listName];
        const temporary = list[index];
        list.splice(index,1);
        list.splice(this._index,0,temporary);
        saveData(scope.current.root);
    }

    if (!(scope.extendAttributes instanceof Object)) {
        scope.extendAttributes = {};
    }
    scope.extendAttributes.draggable = "true";
    scope.extendAttributes["dragstart--"] = "dragstart";
    scope.extendAttributes["dragover--"] = "dragover";
    scope.extendAttributes["drop--"] = "drop";
}
