
export const Item = function(
    title="",
    message="",
    colour="#fff"
){
    this.title = title;
    this.message = message;
    this.colour = colour;
    this.list = [];

    Object.seal(this);
}
