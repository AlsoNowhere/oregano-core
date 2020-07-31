
export const MainButtonComponent = function(){
    return dillx(
        <div>
            <button type="button"
                class="{theme} square large margin-right"
                title-="title"
                dill-if="condition"
                disabled-="disabled"
                click--="onClick">
                <span class="fa fa-{icon}"></span>
            </button>
        </div>
    )
}
