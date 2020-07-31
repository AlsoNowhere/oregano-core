
import { settingsStore } from "../stores/settings.store";

export const Option = function(
    name,
    label,
    settingsRoute
){
    this.name = name;
    this.label = label;
    this.settingsRoute = settingsRoute;
    this.value = settingsStore[settingsRoute[0]][settingsRoute[1]];
    this.reset = function(){
        this.value = settingsStore[settingsRoute[0]][settingsRoute[1]];
    }
    
    Object.seal(this);
}
