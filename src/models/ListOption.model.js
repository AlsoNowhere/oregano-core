
import { saveData } from "../services/save-data.service";

export const ListOption = function(
    name,
    title,
    icon,
    onClick
){
    this.name = name;
    this.title = title;
    this.icon = icon;
    this.onClick = function(event,element) {
        event.stopPropagation();
        onClick.apply(this,[event,element]);
    }
}

ListOption.editItem = new ListOption("edit","Edit","pencil",function(){
    this.state.state = "manage";
    this.state.editing = true;
    this.state.editIndex = this.listindex;
});


ListOption.cutItem = new ListOption("cut","Cut item","scissors",function() {
    this.current.root.pasteItems.push(this.current.item.list[this.listindex]);
    this.current.item.list.splice(this.listindex,1);
    saveData(this.current.root);
});

ListOption.deleteItem = new ListOption("delete","Delete item","trash-o",function(){
    this.current.item.list.splice(this.listindex,1);
    saveData(this.current.root);
});
