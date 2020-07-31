
const Tree = function(){
    return dillx(
        <ul>
            <li dill-for="list">
                <p>{title}</p>
                <Tree list="list" dill-if={this.list instanceof Array} />
            </li>
        </ul>
    )
}

export const TreeView = function(){
    return dillx(
        <section class="padded-bowl-large">
            <Tree list="list" />
        </section>
    )
}
TreeView.defaults = {
    list: []
}
