
export const getItemFromPath = (root, path) => {
    let item = root;

    path.forEach(x=>{
        item = item.list[x];
    });

    return item;
}
