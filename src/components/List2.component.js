
export const List2 = function(){

    this.currentTitle = function(){
        return this.currentItem.title;
    }

    this.currentMessage = function(){
        return this.currentItem.message;
    }

    return dillx(
        <>
            <div dill-template="headertemplate"></div>
            <ul class="reset-list flex">
                <li class="card grid-small-12"
                    click--="onclick"
                    dill-extend="itemattributes"
                    dill-for="list">
                    <div dill-template="itemTemplate"></div>
                </li>
            </ul>
            <p dill-if={(this.list instanceof Function ? this.list() : this.list).length === 0}> - No items - </p>
        </>
    )
}
List2.defaults = {
    itemattributes: {},
    headertemplate: dillx(
        <>
            <h2 class="margin-bottom">{currentTitle}</h2>
            <p class="margin-bottom" style="white-space: pre-wrap;">{currentMessage}</p>
        </>
    ),
    onclick(){}
}
