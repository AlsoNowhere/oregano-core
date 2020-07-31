
export const ListOptions = function(){
    return dillx(
        <ul class="absolute pinned top right reset-list flex theme-snow">
            <li dill-if={this._item.message !== ""}>
                <p class="blueberry-text line-height">
                    <span class="fa fa-align-left"></span>
                </p>
            </li>
            <li dill-for="options">
                <button type="button"
                    class="empty square"
                    title-="title"
                    click--="onClick">
                    <span class="fa fa-{icon}"></span>
                </button>
            </li>
        </ul>
    )
}
