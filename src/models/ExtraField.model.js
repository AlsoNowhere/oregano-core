
export const ExtraField = function(
    name,
    label,
    type = "text",
    value = null,
    classes = "",
    optionsOrEvent = [],
    fieldTemplate = null,
    data = {}
){
    this.name = name;
    this.label = label;
    this.type = type;
    this.value = value;
    this.classes = classes;
    if (optionsOrEvent instanceof Array) {
        this.options = optionsOrEvent;
    }
    else if (optionsOrEvent instanceof Function) {
        this.event = optionsOrEvent;
    }
    if (type === "radio" || type === "checkbox") {
        this.checked = value || false;
    }
    this.fieldTemplate = fieldTemplate;
    this.data = data;
}
