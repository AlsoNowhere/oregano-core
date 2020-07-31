
import { Item } from "../models/Item.model";

export const recurseInputData = (data,item) => {
    const newItem = new Item(data.title,data.message,data.colour);
    if (data.list instanceof Array) {
        data.list.forEach(x=>{
            recurseInputData(x,newItem);
        });
    }
    item.list.push(newItem);
}
