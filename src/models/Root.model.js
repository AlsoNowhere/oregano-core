
export const Root = function(
    title,
    list,
    pasteItems
){
    this.root = true;
    this.title = title;
    this.list = list;
    this.pasteItems = pasteItems;

    Object.freeze(this);
}
