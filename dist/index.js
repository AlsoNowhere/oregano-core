import { component, node, span, MintScope, Store, Resolver, refresh, mIf, mRef, template, mFor, mExtend, div, UpwardRef } from 'mint';

const lineProps = {
    y1: "4",
    y2: "28",
};
class HeaderComponent extends MintScope {
    constructor() {
        super();
        this.headerTitle = "Oregano";
        this.version = "";
    }
}
const Header = component("header", HeaderComponent, { class: "header" }, [
    node("h1", null, [span("{headerTitle}"), span("v{version}")]),
    node("div", { class: "flex" }, [
        node("button", {
            type: "button",
            class: "empty snow-text font-size",
        }, node("span", {
            class: "block absolute middle width-small height",
        })),
        node("button", {
            type: "button",
            class: "empty",
        }, node("svg", {
            class: "absolute middle width height",
            viewBox: "0 0 32 32",
        }, [
            node("line", Object.assign({ x1: "4", x2: "28" }, lineProps)),
            node("line", Object.assign({ x1: "28", x2: "4" }, lineProps)),
        ])),
    ]),
]);

const oreganoSettings = {
    sessionStorageKey: "",
    breadcrumbs: false,
};

class AppStore extends Store {
    constructor() {
        super({
            rootData: null,
            currentItem: null,
            sessionStorageKey: new Resolver(() => oreganoSettings.sessionStorageKey),
            loaded: false,
            currentTitle: new Resolver(function () {
                var _a;
                return (_a = appStore.currentItem) === null || _a === void 0 ? void 0 : _a.title;
            }),
        });
    }
}
const appStore = new AppStore();

class ContentComponent extends MintScope {
    constructor() {
        super();
        this.loaded = new Resolver(() => appStore.loaded);
    }
}
const Content = component("div", ContentComponent, {
    class: "main-content",
}, "_children");

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter$1(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const path = {
    get url() {
        return this.get().join("/");
    },
    get() {
        return window.location.hash
            .replace(/(%20)/g, " ")
            .slice(1)
            .split("/")
            .filter((x) => x !== "");
    },
    set(url) {
        window.location.hash = url.join("/");
    },
};

const wait = (time = 0) => new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    }, time);
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

const time = 300;
const timeToWait = 3000;

class Toaster {
    constructor(target = document.body) {
        this.toast = (message, options, alternateElementTarget) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const _previousTarget = this.target;
            if (alternateElementTarget !== undefined) {
                this.target = alternateElementTarget;
            }
            const theme = typeof options === "string" ? options : (_a = options === null || options === void 0 ? void 0 : options.theme) !== null && _a !== void 0 ? _a : "blueberry";
            const { hasButton, clickToClose, linger, classes, buttonClasses } = typeof options === "string" ? {} : options;
            if (this.toasts.length === 0) {
                this.mountToastContainer();
            }
            this.target = _previousTarget;
            const toast = { element: document.createElement("div") };
            toast.element.classList.add("toast", `toast__${theme}`, ...(classes || []));
            const toastMessageSpan = document.createElement("span");
            toastMessageSpan.textContent = message;
            const toastMessageButton = document.createElement("button");
            toastMessageButton.classList.add("toast__button", "empty", ...(buttonClasses || []));
            {
                const buttonSpan = document.createElement("span");
                buttonSpan.classList.add("fa", "fa-times");
                toastMessageButton.append(buttonSpan);
            }
            const remove = () => __awaiter(this, void 0, void 0, function* () {
                var _b, _c;
                delete toast.remove;
                if (clickToClose === true) {
                    toast.element.removeEventListener("click", remove);
                }
                toastMessageButton.removeEventListener("click", remove);
                toast.element.classList.add("fade-out");
                yield wait(time);
                (_b = toast.element.parentElement) === null || _b === void 0 ? void 0 : _b.removeChild(toast.element);
                this.toasts.splice(this.toasts.indexOf(toast, 1));
                if (this.toasts.length == 0) {
                    this.index = 0;
                    (_c = this.toastContainer.parentElement) === null || _c === void 0 ? void 0 : _c.removeChild(this.toastContainer);
                }
            });
            toast.remove = remove;
            if (clickToClose === true) {
                toast.element.addEventListener("click", remove);
            }
            toastMessageButton.addEventListener("click", remove);
            toast.element.append(toastMessageSpan);
            if (hasButton === undefined) {
                toast.element.append(toastMessageButton);
            }
            this.toastContainer.append(toast.element);
            this.toasts.push(toast);
            this.index++;
            const _timeToWait = typeof linger !== "number"
                ? timeToWait
                : (() => {
                    // ** TS should accept a number as an argument here but....... you know!
                    if (linger < 0 || parseInt(linger + "") !== linger) {
                        console.error("Must provide a positive integer for the property 'linger'.");
                        return timeToWait;
                    }
                    return linger;
                })();
            yield wait(_timeToWait);
            remove();
        });
        this.index = 0;
        this.toasts = [];
        this.target = target;
        {
            const toastContainer = document.createElement("div");
            toastContainer.classList.add("toast-container");
            this.toastContainer = toastContainer;
        }
    }
    getToastIndex(index) {
        return `toast--piece--${index}`;
    }
    mountToastContainer() {
        this.target.append(this.toastContainer);
    }
}
const toaster = new Toaster(document.body);
const toast = (message, theme = "blueberry", alternateElementTarget) => toaster.toast(message, theme, alternateElementTarget);

const resolveLeadingZeroes$1 = (item) => {
    if (typeof item === "number") {
        if (item < 10)
            return "0" + item;
        return "" + item;
    }
    else {
        if (item.length === 1)
            return "0" + item;
        return item;
    }
};
const dateMap = new Map();
dateMap.set("dd/mm/yyyy", ({ d, m, y }) => `${resolveLeadingZeroes$1(d)}/${resolveLeadingZeroes$1(m)}/${y}`);
dateMap.set("dd/mm/yyyy hh:mm", ({ d, m, y, h, min }) => `${resolveLeadingZeroes$1(d)}/${resolveLeadingZeroes$1(m)}/${y} ${resolveLeadingZeroes$1(h)}:${resolveLeadingZeroes$1(min)}`);
dateMap.set("yyyy-mm-dd", ({ d, m, y }) => `${y}-${resolveLeadingZeroes$1(m)}-${resolveLeadingZeroes$1(d)}`);
dateMap.set("dd-mm-yyyy", ({ d, m, y }) => `${resolveLeadingZeroes$1(d)}-${resolveLeadingZeroes$1(m)}-${y}`);
dateMap.set("dd-mm-yyyy hh:mm", ({ d, m, y, h, min }) => `${resolveLeadingZeroes$1(d)}-${resolveLeadingZeroes$1(m)}-${y} ${resolveLeadingZeroes$1(h)}:${resolveLeadingZeroes$1(min)}`);
const getDate = (date = new Date(), type = "dd/mm/yyyy") => {
    const [d, m, y, h, min] = [
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
        date.getHours(),
        date.getMinutes(),
    ];
    const output = dateMap.get(type);
    if (output === undefined) {
        return null;
    }
    return output({ d, m, y, h, min });
};

const styles = (obj) => {
    return Object.entries(obj)
        .filter(([key, value]) => key !== undefined && value !== undefined)
        .map(([key, value]) => `${key}: ${value}`)
        .join("; ");
};

const changePage = (page) => {
    path.set([page, ...path.get().slice(1)]);
};

class Action {
    constructor(type, value) {
        this.type = type;
        this.value = value;
    }
}

class ActionStore extends Store {
    constructor() {
        super({
            getTheme: new Resolver(function () {
                return this.active ? "blueberry" : "snow";
            }),
        });
    }
}
const actionStore = new ActionStore();

class ActionButton {
    constructor({ label, icon, title, square = true, id }, action) {
        this.label = label;
        this.icon = icon;
        this.title = title;
        this.square = square;
        this.action = action;
        this.onClick = function () {
            const buttonScope = this;
            const actionButton = actionButtons.find(({ id }) => id === buttonScope.id);
            actionButton.active = !actionButton.active;
            refresh(actionStore);
        };
        this.id = id;
        this.active = false;
    }
}

var ActionTypes;
(function (ActionTypes) {
    ActionTypes[ActionTypes["init"] = 0] = "init";
    ActionTypes[ActionTypes["add-to-list"] = 1] = "add-to-list";
    ActionTypes[ActionTypes["style"] = 2] = "style";
})(ActionTypes || (ActionTypes = {}));

const actionButtons = [
    new ActionButton({
        icon: "clone",
        label: "M",
        title: "Message to side",
        square: false,
        id: "message-to-side",
    }),
    new ActionButton({
        icon: "sort-numeric-desc",
        title: "Items added to top",
        id: "list-order",
    }, new Action(ActionTypes["add-to-list"], (currentItem, newItem) => {
        currentItem.items.unshift(newItem);
    })),
    // new ActionButton(
    //   {
    //     icon: "level-up",
    //     title: "Large font size",
    //     id: "large-font",
    //   },
    //   new Action(ActionTypes.style, "font-size: 1.5rem;")
    // ),
    // new ActionButton(
    //   {
    //     label: "B",
    //     title: "Bold font",
    //     id: "bold-font",
    //   },
    //   new Action(ActionTypes.style, "font-weight: bold;")
    // ),
    new ActionButton({
        icon: "line-chart",
        title: "Has chart",
        id: "charts",
    }),
    new ActionButton({
        icon: "list",
        label: "H",
        title: "Has heatmap",
        square: false,
        id: "heatmap",
    }, new Action(ActionTypes.init, (item) => {
        if (item.heatmap === undefined) {
            item.heatmap = {};
        }
    })),
];

const getActionAbles = (actions, match) => {
    var _a;
    const _actions = [];
    let i = 0;
    while (i < actions.length) {
        const x = actions[i];
        const a = (_a = actionButtons.find(({ id }) => id === x)) === null || _a === void 0 ? void 0 : _a.action;
        if ((a === null || a === void 0 ? void 0 : a.type) === match) {
            _actions.push(a.value);
        }
        i++;
    }
    return _actions;
};

class UndoConfig {
    constructor(type, { item, path, items }) {
        this.type = type;
        this.item = item;
        this.path = path;
        this.items = items;
    }
}

var UndoConfigs;
(function (UndoConfigs) {
    UndoConfigs["add"] = "add";
    UndoConfigs["paste"] = "paste";
    UndoConfigs["cut"] = "cut";
    UndoConfigs["delete"] = "delete";
})(UndoConfigs || (UndoConfigs = {}));

class Undo {
    constructor(list) {
        this.limit = 1;
        this.list = list;
    }
    maintainLimit() {
        if (this.list.length > this.limit) {
            this.list.pop();
        }
    }
    addDelete(item, path) {
        this.list.push(new UndoConfig(UndoConfigs.delete, {
            item,
            path,
        }));
        this.maintainLimit();
    }
}

class Colour {
    constructor(colour, textColour = "#fff") {
        this.colour = colour;
        this.textColour = textColour;
    }
}

const colours = [
    new Colour("#fff", "#444"),
    new Colour("#3d7fe3"),
    new Colour("#00b112"),
    new Colour("yellow", "#444"),
    new Colour("orange"),
    new Colour("tomato"),
    new Colour("#777"),
    new Colour("#444"),
    new Colour("teal"),
    new Colour("pink"),
    new Colour("purple"),
];

class Item {
    constructor({ title, message, colour, actions = [], items, index, createdAt, heatmap, tags = undefined, } = {}) {
        this.title = title !== null && title !== void 0 ? title : "";
        this.message = message !== null && message !== void 0 ? message : "";
        this.colour = colour !== null && colour !== void 0 ? colour : colours[0].colour;
        this.actions = actions;
        this.items = items !== null && items !== void 0 ? items : [];
        this.heatmap = heatmap;
        this.tags = tags;
        this.index = index !== null && index !== void 0 ? index : appStore.rootData.itemIndex++;
        this.createdAt =
            createdAt !== null && createdAt !== void 0 ? createdAt : Math.floor(Date.now() - appStore.rootData.timestamp_root);
    }
}

const data = {
    root: true,
    timestamp_root: Date.now(),
    title: "Oregano",
    message: "",
    colour: colours[0].colour,
    actions: [],
    items: [],
    tags: [],
    index: 0,
    createdAt: Date.now(),
    pasteItems: [],
    undo: [],
    itemIndex: 1,
};
const defaultData = JSON.stringify(data);

const cleanItem = (item) => {
    item.items = item.items.filter((x) => !!x);
    item.items = item.items.map(cleanItem);
    const { title, message, colour, actions, items, heatmap, tags, index, createdAt, } = item;
    const newItem = new Item({
        title,
        message,
        colour,
        actions,
        items,
        heatmap,
        tags,
        index,
        createdAt,
    });
    return newItem;
};
const cleanData = (item) => {
    cleanItem(item);
};
const initRootData = (item) => {
    const undo = new Undo(item.undo);
    const output = Object.assign(Object.assign({}, item), { undo });
    cleanData(output);
    return output;
};
const loadData$1 = () => __awaiter$1(void 0, void 0, void 0, function* () {
    if (appStore.sessionStorageKey === null) {
        console.warn("Could not LOAD data, no session storage key (appStore.sessionStorageKey) provided");
        return;
    }
    const localData = localStorage.getItem(appStore.sessionStorageKey);
    const data = !localData || localData === "undefined" ? defaultData : localData;
    const parsed = JSON.parse(data);
    if (parsed.timestamp_root === undefined) {
        parsed.timestamp_root = Date.now();
    }
    appStore.rootData = initRootData(parsed);
    saveData();
});
const saveData = () => __awaiter$1(void 0, void 0, void 0, function* () {
    if (appStore.sessionStorageKey === null) {
        console.warn("Could not SAVE data, no session storage key provided");
        return;
    }
    const data = Object.assign({}, appStore.rootData);
    data.undo = data.undo.list;
    localStorage.setItem(appStore.sessionStorageKey, JSON.stringify(data));
});

class AppButtonsStore extends Store {
    constructor() {
        super({
            appButtonsElement: null,
            isList: new Resolver(() => path.get().at(0) === "list"),
        });
    }
}
const appButtonsStore = new AppButtonsStore();

const setFocusOnFirstMainButton = () => __awaiter$1(void 0, void 0, void 0, function* () {
    var _a;
    yield wait();
    const { appButtonsElement } = appButtonsStore;
    if (!appButtonsElement)
        return;
    const addButton = [...appButtonsElement.children].find((x) => x.classList.contains("main-button--add"));
    if (!addButton)
        return;
    (_a = addButton === null || addButton === void 0 ? void 0 : addButton.focus) === null || _a === void 0 ? void 0 : _a.call(addButton);
});

class HasMessageComponent extends MintScope {
    constructor() {
        super();
        this.hasMessage = new Resolver(function () {
            const { message } = listStore.list[this.index];
            return !!message;
        });
    }
}
const HasMessage = component("div", HasMessageComponent, {
    class: "list-page__item-has_message",
}, [
    node("span", {
        mIf: mIf("hasMessage"),
        class: "fa fa-list",
    }),
]);

class ItemCountComponent extends MintScope {
    constructor() {
        super();
        this.itemsLength = new Resolver(function () {
            const { items: { length }, } = listStore.list[this.index];
            return !length ? "" : length + "";
        });
    }
}
const ItemCount = component("span", ItemCountComponent, { class: "list-page__item-items_length" }, span({ mIf: mIf("itemsLength") }, "{itemsLength}"));

class ButtonComponent extends MintScope {
    constructor() {
        super();
        this.type = "button";
        this.theme = "snow";
        this.class = "";
        this.style = undefined;
        this.content = undefined;
        this.id = undefined;
        this.classes = new Resolver(function () {
            if (this.hasExtraButtonLabel)
                return `${this.class} multi-content`;
            return this.class;
        });
        this.hasIcon = new Resolver(function () {
            return this.icon !== undefined;
        });
        this.hasLabel = new Resolver(function () {
            return this.label !== undefined;
        });
        this.isSquare = new Resolver(function () {
            return this.square ? "square" : "";
        });
        this.isLarge = new Resolver(function () {
            return this.large ? "large" : "";
        });
        this.hasExtraButtonLabel = new Resolver(function () {
            return (this.extraButtonLabel !== null && this.extraButtonLabel !== undefined);
        });
        this.getExtraButtonLabel = function () {
            return this.extraButtonLabel;
        };
        this.getContent = function () {
            return this.content;
        };
        this.onClick = null;
    }
}
const Button = component("button", ButtonComponent, {
    "[type]": "type",
    class: "{theme} {classes} {isSquare} {isLarge}",
    "[style]": "style",
    "[title]": "title",
    "[id]": "id",
    "(click)": "onClick",
    mRef: mRef("ref"),
}, [
    node("<>", Object.assign({}, mIf("!_children")), [
        node("<>", Object.assign({}, mIf("!content")), [
            node("span", { mIf: mIf("hasIcon"), class: "icon fa fa-{icon}" }),
            node("span", { mIf: mIf("hasLabel"), class: "label" }, "{label}"),
            node("span", { mIf: mIf("hasExtraButtonLabel"), class: "extra-content" }, node(template("getExtraButtonLabel"))),
        ]),
        node("<>", Object.assign({}, mIf("content")), node(template("getContent"))),
    ]),
    node("<>", Object.assign({}, mIf("_children")), "_children"),
]);

class ColourSelectorComponent$1 extends MintScope {
    constructor() {
        super();
        this.onInput = null;
        this.colourSelectorScope = this;
        this.showColours = false;
        this.colours = [
            "black",
            "green",
            "lightgreen",
            "blue",
            "lightblue",
            "grey",
            "lightgrey",
            "#444",
            "pink",
            "teal",
            "aqua",
            "red",
            "tomato",
            "purple",
        ];
        this.toggleShowColours = function () {
            this.colourSelectorScope.showColours =
                !this.colourSelectorScope.showColours;
            refresh(this.colourSelectorScope);
        };
        this.chooseColour = function () {
            var _a;
            (_a = this.onInput) === null || _a === void 0 ? void 0 : _a.call(this, this._x);
            this.colourSelectorScope.showColours = false;
            refresh(this.colourSelectorScope);
        };
    }
}
component("div", ColourSelectorComponent$1, { class: "relative z-index" }, [
    node(Button, {
        "[large]": "large",
        square: true,
        content: node("span", null, "C"),
        "[colourSelectorScope]": "colourSelectorScope",
        "[onClick]": "toggleShowColours",
    }),
    node("ul", Object.assign(Object.assign({}, mIf("showColours")), { class: "list flex absolute left-gap", style: "top: 2rem; width: 100px;" }), node("li", Object.assign(Object.assign({}, mFor("colours")), { mKey: "_i", class: "width height snow-border pointer", style: "background-color: {_x};", "(click)": "chooseColour" }))),
]);

class FieldInputComponent extends MintScope {
    constructor() {
        super();
        this.type = "text";
        this.style = "";
        this.onKeyDown = null;
        this.onInput = null;
        this.onFocus = null;
        this.onBlur = null;
        this._labelClass = new Resolver(function () {
            return this.labelClass + (this.large ? " large" : "");
        });
        this._inputClass = new Resolver(function () {
            return this.class + (this.large ? " large" : "");
        });
        this.isRequired = new Resolver(function () {
            return this.required ? "required" : "";
        });
        this.hasLabelAbove = new Resolver(function () {
            return !!this.label && !this.labelBeside;
        });
        this.hasLabelBeside = new Resolver(function () {
            return !!this.label && !!this.labelBeside;
        });
    }
}
const FieldInput = component("label", FieldInputComponent, { class: "{_labelClass} {isRequired}", "[style]": "labelStyles" }, [
    node("span", { mIf: mIf("hasLabelAbove") }, "{label}"),
    node("input", {
        "[type]": "type",
        "[name]": "name",
        "[value]": "value",
        "[checked]": "checked",
        "[class]": "_inputClass",
        "[style]": "style",
        "[placeholder]": "placeholder",
        "[required]": "required",
        "[readonly]": "readonly",
        "[id]": "id",
        "(keydown)": "onKeyDown",
        "(input)": "onInput",
        "(focus)": "onFocus",
        "(blur)": "onBlur",
        mRef: mRef("ref"),
    }),
    node("span", { mIf: mIf("hasLabelBeside") }, "{label}"),
]);

const FieldCheckbox = component("div", null, null, node(FieldInput, {
    type: "checkbox",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[class]": "inputClass",
    "[large]": "large",
    "[style]": "style",
    "[required]": "required",
    "[readonly]": "readonly",
    "[id]": "id",
    "[onInput]": "onInput",
    "[ref]": "ref",
}));

const FieldRadio = component("div", null, null, node(FieldInput, {
    type: "radio",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    labelBeside: true,
    "[labelClass]": "labelClass",
    "[labelStyles]": "labelStyles",
    "[class]": "inputClass",
    "[style]": "style",
    "[required]": "required",
    "[readonly]": "readonly",
    "[onInput]": "onInput",
    "[ref]": "ref",
}));

class FieldSelectComponent extends MintScope {
    constructor() {
        super();
        this.style = "";
        this.options = [];
        this.onInput = null;
        this.hasLabel = new Resolver(function () {
            return !!this.label;
        });
    }
}
const FieldSelect = component("label", FieldSelectComponent, { class: "{labelClass} {isRequired}" }, [
    node("span", { mIf: mIf("hasLabel") }, "{label}"),
    node("select", {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[style]": "style",
        "[required]": "required",
        "[readonly]": "readonly",
        "[id]": "id",
        "(input)": "onInput",
        mRef: mRef("ref"),
    }, [
        node("option", {
            mFor: mFor("options"),
            mKey: "value",
            "[value]": "value",
        }, "{name}"),
    ]),
]);

class FieldFieldsetComponent extends MintScope {
    constructor() {
        super();
        this.legend = "";
        this.value = null;
        this.options = [];
        this.isChecked = new Resolver(function () {
            return this.value === this.fieldValue;
        });
        this.fieldValue = new Resolver(() => this.value);
        this.onInput = null;
    }
}
const FieldFieldset = component("fieldset", FieldFieldsetComponent, { "[id]": "id" }, [
    node("legend", { mIf: mIf("legend"), class: "fieldset__legend" }, "{legend}"),
    node("ul", { class: "list flex" }, node("li", { mFor: mFor("options"), mKey: "value", class: "margin-right-small" }, node(FieldRadio, {
        "[name]": "name",
        "[value]": "value",
        "[label]": "label",
        "[class]": "class",
        "[labelClass]": "labelClass",
        "[labelStyles]": "labelStyles",
        "[style]": "style",
        "[checked]": "isChecked",
        "[onInput]": "onInput",
    }))),
]);

class FieldTextareaComponent extends MintScope {
    constructor() {
        super();
        this.resize = false;
        this.style = "";
        this.onInput = null;
        this.hasLabel = new Resolver(function () {
            return !!this.label;
        });
        this.getStyles = new Resolver(function () {
            return (this.resize ? "" : "resize: none; ") + this.style;
        });
        this.getReadonly = new Resolver(function () {
            return this.readonly ? "true" : undefined;
        });
    }
}
const FieldTextarea = component("label", FieldTextareaComponent, { class: "{labelClass} {isRequired}" }, [
    node("span", { mIf: mIf("hasLabel") }, "{label}"),
    node("textarea", {
        "[name]": "name",
        "[value]": "value",
        "[class]": "class",
        "[placeholder]": "placeholder",
        "[style]": "getStyles",
        "[readonly]": "getReadonly",
        "[id]": "id",
        "(input)": "onInput",
        mRef: mRef("ref"),
    }),
]);

const passProps = {
    "[type]": "type",
    "[name]": "name",
    "[value]": "value",
    "[checked]": "checked",
    "[label]": "label",
    "[legend]": "legend",
    "[labelBeside]": "labelBeside",
    "[labelClass]": "labelClass",
    "[labelStyles]": "labelStyles",
    "[class]": "class",
    "[style]": "style",
    "[large]": "large",
    "[required]": "required",
    "[readonly]": "readonly",
    "[id]": "id",
    "[onKeyDown]": "onKeyDown",
    "[onInput]": "onInput",
    "[onFocus]": "onFocus",
    "[onBlur]": "onBlur",
    "[ref]": "ref",
};
class FieldComponent extends MintScope {
    constructor() {
        super();
        this.type = "text";
        this.class = "";
        this.style = undefined;
        this.onKeyDown = null;
        this.onInput = null;
        this.onFocus = null;
        this.onBlur = null;
        this.extend = {};
        this.ref = null;
        this.isInput = new Resolver(function () {
            const inValidTypes = [
                "textarea",
                "select",
                "checkbox",
                "radio",
                "fieldset",
            ];
            return !inValidTypes.includes(this.type);
        });
        this.isCheckbox = new Resolver(function () {
            return this.type === "checkbox";
        });
        this.isRadio = new Resolver(function () {
            return this.type === "radio";
        });
        this.isFieldSet = new Resolver(function () {
            return this.type === "fieldset";
        });
        this.isSelect = new Resolver(function () {
            return this.type === "select";
        });
        this.isTextarea = new Resolver(function () {
            return this.type === "textarea";
        });
    }
}
const Field = component("<>", FieldComponent, { "[class]": "wrapperClasses" }, [
    node(FieldInput, Object.assign({ mIf: mIf("isInput"), mExtend: mExtend("extend") }, passProps)),
    node(FieldCheckbox, Object.assign({ mIf: mIf("isCheckbox"), mExtend: mExtend("extend") }, passProps)),
    node(FieldRadio, Object.assign({ mIf: mIf("isRadio"), mExtend: mExtend("extend") }, passProps)),
    node(FieldFieldset, Object.assign(Object.assign({ mIf: mIf("isFieldSet"), mExtend: mExtend("extend") }, passProps), { "[options]": "options" })),
    node(FieldTextarea, Object.assign(Object.assign({ mIf: mIf("isTextarea"), mExtend: mExtend("extend") }, passProps), { "[resize]": "resize" })),
    node(FieldSelect, Object.assign(Object.assign({ mIf: mIf("isSelect"), mExtend: mExtend("extend") }, passProps), { "[options]": "options" })),
]);

const modalTime = 500;

const closeModal = (target, prop) => {
    target[prop] = "open closing";
    refresh(target);
    setTimeout(() => {
        target[prop] = "";
        refresh(target);
    }, modalTime);
};

class ModalComponent extends MintScope {
    constructor() {
        super();
        this.state = "";
        this.theme = "smoke";
        this.class = "";
        this.hasTitle = new Resolver(function () {
            return this.title !== undefined;
        });
        this.clickOnBackground = function () {
            if (this.closeOnBackgroundClick !== true)
                return;
            if (this._store instanceof Store &&
                typeof this.storeTarget === "string") {
                closeModal(this._store, this.storeTarget);
            }
            else {
                closeModal(this, "state");
            }
        };
    }
}
component("article", ModalComponent, { class: "modal {state}", "(click)": "clickOnBackground" }, node("div", { class: "modal__content {class}" }, [
    node("header", { mIf: mIf("hasTitle"), class: "modal__header {theme}" }, node("h2", null, "{title}")),
    "_children",
]));

const exact = (target, hash) => {
    return target === hash;
};
const contains = (target, hash) => {
    return hash.includes(target);
};
const hasWord = (target, hash) => {
    return (hash.includes(` ${hash} `) ||
        exact(target, hash) ||
        starts(target + " ", hash) ||
        ends(" " + target, hash));
};
const containsAndHyphen = (target, hash) => {
    return target === hash || hash.includes(target + "-");
};
const starts = (target, hash) => {
    return hash.slice(0, target.length) === target;
};
const ends = (target, hash) => {
    return hash.slice(hash.length - target.length) === target;
};

var RouteType;
(function (RouteType) {
    RouteType["exact"] = "exact";
    RouteType["="] = "=";
    RouteType["contains"] = "contains";
    RouteType["*"] = "*";
    RouteType["hasWord"] = "hasWord";
    RouteType["~"] = "~";
    RouteType["containsAndHyphen"] = "containsAndHyphen";
    RouteType["|"] = "|";
    RouteType["starts"] = "starts";
    RouteType["^"] = "^";
    RouteType["ends"] = "ends";
    RouteType["$"] = "$";
})(RouteType || (RouteType = {}));

const logic = {
    [RouteType.exact]: exact,
    [RouteType["="]]: exact,
    [RouteType.contains]: contains,
    [RouteType["*"]]: contains,
    [RouteType.hasWord]: hasWord,
    [RouteType["~"]]: hasWord,
    [RouteType.containsAndHyphen]: containsAndHyphen,
    [RouteType["|"]]: containsAndHyphen,
    [RouteType.starts]: starts,
    [RouteType["^"]]: starts,
    [RouteType.ends]: ends,
    [RouteType["$"]]: ends,
};
class RouterComponent extends MintScope {
    constructor() {
        super();
        this.routes = [];
        this.oninit = function () {
            var _a;
            (_a = this.onDefine) === null || _a === void 0 ? void 0 : _a.call(this, this);
        };
        this.router = function () {
            const routes = this.routes;
            const hash = window.location.hash.replace("#", "").replace(/%20/g, " ");
            {
                let i = 0;
                while (i < routes.length) {
                    const route = routes[i];
                    if (logic[route.type](route.target, hash))
                        return route.content;
                    i++;
                }
            }
            return [];
        };
    }
}
component("<>", RouterComponent, {}, [
    node(template("router")),
]);

class TabsComponent extends MintScope {
    constructor() {
        super();
        const scope = this;
        this.tabs = [];
        this.currentTab = null;
        this.currentTemplate = new Resolver(function () {
            return this.currentTab.template;
        });
        this.tabSelected = new Resolver(function () {
            return this.currentTab !== null;
        });
        this.activeTab = new Resolver(function () {
            return this._x === this.currentTab ? "active" : "";
        });
        this.onpreblueprint = function () {
            if (this.tabs.length === 0)
                return;
            if (this.currentTab !== null)
                return;
            this.currentTab = this.tabs[0];
        };
        this.selectTab = function () {
            var _a;
            scope.currentTab = this._x;
            (_a = scope.onSelectTab) === null || _a === void 0 ? void 0 : _a.call(scope);
            refresh(scope);
        };
    }
}
const Tabs = component("div", TabsComponent, { class: "tabs", mRef: mRef("ref") }, [
    node("ul", { class: "tabs__list" }, node("li", {
        mFor: mFor("tabs"),
        mKey: "name",
        class: "tabs__list-item {activeTab}",
        "(click)": "selectTab",
    }, node("div", null, "{name}"))),
    node("div", { mIf: mIf("tabSelected"), class: "tabs__body" }, node(template({ onevery: true }, "currentTemplate"))),
]);

class TableComponent extends MintScope {
    constructor() {
        super();
        this.columns = [];
        this.rows = [];
    }
}
component("table", TableComponent, { class: "table" }, [
    node("thead", null, node("tr", null, node("th", Object.assign(Object.assign({}, mFor("columns")), { mKey: "id" }), "{title}"))),
    node("tbody", null, node("tr", Object.assign(Object.assign({}, mFor("rows")), { mKey: "id" }), node("td", Object.assign(Object.assign({}, mFor("columns")), { mKey: "id" }), "{cell}"))),
]);

class Tab {
    constructor(name, template) {
        this.name = name;
        this.template = template;
    }
}

const getTextColour = (_colour) => {
    const colour = colours.find(({ colour }) => colour === _colour);
    return (colour === null || colour === void 0 ? void 0 : colour.textColour) || colours[0].colour;
};

class ListItemComponent extends MintScope {
    constructor() {
        super();
        this.style = new Resolver(function () {
            return styles({
                color: getTextColour(listStore.list[this.index].colour),
            });
        });
    }
}
const ListItem = component("<>", ListItemComponent, null, node(Button, {
    theme: "empty",
    "[icon]": "icon",
    square: true,
    class: "list-page__item-button",
    "[onClick]": "onClick",
    "[index]": "index",
}));

const editItem$2 = (event, _, scope) => {
    event.stopPropagation();
    const { index } = scope;
    manageStore.editItem = listStore.list[index];
    manageStore.toEditMethod = "item-button";
    path.set(["manage", ...path.get().slice(1), index]);
    refresh(appStore);
};

class EditListItemComponent extends MintScope {
    constructor() {
        super();
        this.editItem = editItem$2;
    }
}
const EditListItem = component("<>", EditListItemComponent, null, node(ListItem, {
    icon: "pencil",
    "[onClick]": "editItem",
    "[index]": "index",
}));

const cutItem = (event, _, scope) => {
    event.stopPropagation();
    const { index } = scope;
    const item = listStore.list[index];
    appStore.rootData.pasteItems.push(item);
    listStore.list.splice(index, 1);
    saveData();
    refresh(appButtonsStore);
    refresh(listStore);
};

class CutListItemComponent extends MintScope {
    constructor() {
        super();
        this.cutItem = cutItem;
    }
}
const CutListItem = component("<>", CutListItemComponent, null, node(ListItem, {
    icon: "scissors",
    "[onClick]": "cutItem",
    "[index]": "index",
}));

const deleteItem = (event, _, scope) => {
    event.stopPropagation();
    const { index } = scope;
    const item = listStore.list[index];
    listStore.list.splice(index, 1);
    appStore.rootData.undo.addDelete(item, path.get());
    saveData();
    refresh(listStore);
};

class DeleteListItemComponent extends MintScope {
    constructor() {
        super();
        this.deleteItem = deleteItem;
    }
}
const DeleteListItem = component("<>", DeleteListItemComponent, null, node(ListItem, {
    icon: "trash-o",
    "[onClick]": "deleteItem",
    "[index]": "index",
}));

const getItem = (url, item = appStore.rootData) => {
    if (item === null)
        return null;
    if (url.length === 0)
        return item;
    const nextIndex = url.at(0);
    if (nextIndex === "" || nextIndex === undefined)
        return item;
    const nextItem = item.items[nextIndex];
    return getItem(url.slice(1), nextItem);
};

class ListStore extends Store {
    constructor() {
        super({
            breadcrumbs: new Resolver(() => oreganoSettings.breadcrumbs),
            dragIndex: null,
            listElementRef: null,
            item: new Resolver(() => {
                const item = getItem(path.get().slice(1));
                if (item === null)
                    return {};
                return item;
            }),
            list: new Resolver(() => {
                const item = getItem(path.get().slice(1));
                if (item === null)
                    return [];
                return item.items;
            }),
            itemOptions: [
                HasMessage,
                ItemCount,
                EditListItem,
                CutListItem,
                DeleteListItem,
            ],
            hasList: new Resolver(() => listStore.list.length > 0),
            getTextColour: new Resolver(function () {
                return getTextColour(this.colour);
            }),
            messageClass: new Resolver(() => {
                var _a;
                return ((_a = listStore.item.actions) === null || _a === void 0 ? void 0 : _a.includes("message-to-side"))
                    ? "grid-6"
                    : "grid-12";
            }),
            selectItem: function () {
                return __awaiter$1(this, void 0, void 0, function* () {
                    yield wait();
                    refresh(appStore);
                });
            },
            onDragStart() {
                listStore.dragIndex = this._i;
            },
            onDragOver(event) {
                event.preventDefault();
            },
            onDrop(_, __, scope) {
                const index = scope._i;
                const [holdItem] = listStore.list.splice(listStore.dragIndex, 1);
                listStore.list.splice(index, 0, holdItem);
                listStore.dragIndex = null;
                saveData();
                refresh(listStore);
            },
        });
    }
}
const listStore = new ListStore();

class TitleFieldComponent extends MintScope {
    constructor() {
        super();
        this.title = new Resolver(() => manageStore.title);
        this.setTitle = new Resolver(() => manageStore.setTitle);
    }
}
const TitleField = component("<>", TitleFieldComponent, null, node(Field, {
    name: "title",
    "[value]": "title",
    label: "Title",
    required: true,
    id: "title-field",
    "[onInput]": "setTitle",
}));

class MessageFieldComponent extends MintScope {
    constructor() {
        super();
        this.message = new Resolver(() => {
            const { message } = manageStore;
            return message;
        });
        this.setMessage = new Resolver(() => manageStore.setMessage);
        this.height = 23;
    }
}
const MessageField = component("<>", MessageFieldComponent, null, node(Field, {
    type: "textarea",
    name: "message",
    "[value]": "message",
    label: "Message",
    labelClass: "relative",
    class: "manage-form__message",
    id: "message-field",
    fieldStyles: styles({ height: "{height}rem" }),
    "[onInput]": "setMessage",
}));

class ColourSelectorComponent extends MintScope {
    constructor() {
        super();
        this.colours = manageStore.colours;
        this.currentColour = new Resolver(() => manageStore.currentColour);
        this.setColour = manageStore.setColour;
        this.radioStyles = new Resolver(function () {
            return styles({
                "box-shadow": `inset 0 0 1px 5px ${this.value};`,
            });
        });
    }
}
const ColourSelector = component("div", ColourSelectorComponent, {}, node(Field, {
    type: "fieldset",
    name: "colour",
    legend: "Colour",
    "[value]": "currentColour",
    labelClass: "round",
    "[labelStyles]": "radioStyles",
    id: "colour-field",
    "[options]": "colours",
    "[onInput]": "setColour",
}));

class Tag {
    constructor(tag, tagColour = colours[1].colour) {
        this.tag = tag;
        this.tagColour = tagColour;
    }
}

class TagsComponents extends MintScope {
    constructor() {
        super();
        this.tags = new Resolver(() => manageStore.tags);
        this.tagInputRef = new UpwardRef(null);
        this.tagsValue = new Resolver(() => manageStore.tagsValue);
        this.setTabsValue = (_, node) => {
            manageStore.tagsValue = node.value;
        };
        this.addTab = function (event) {
            event.preventDefault();
            if (manageStore.tagsValue === "") {
                toast("No value entered for Tab");
            }
            manageStore.tags.push(new Tag(manageStore.tagsValue));
            manageStore.tagsValue = "";
            refresh(this);
            this.tagInputRef.ref.focus();
        };
        this.removeTab = function () {
            manageStore.tags.splice(this.index, 1);
            refresh(manageStore.tagsScope);
        };
        this.oninit = function () {
            manageStore.tagsScope = this;
        };
    }
}
const Tags = component("form", TagsComponents, {
    "(submit)": "addTab",
}, [
    div({ class: "relative" }, [
        node(Field, {
            label: "Tabs",
            "[value]": "tagsValue",
            "[onInput]": "setTabsValue",
            class: "padding-right-large",
            "[ref]": "tagInputRef",
        }),
        node(Button, {
            type: "submit",
            theme: "blueberry",
            icon: "plus",
            class: "absolute right bottom",
            square: true,
        }),
    ]),
    node("ul", { class: "content-tags" }, node("li", {
        mFor: mFor("tags"),
        mKey: "tag",
        class: "content-tags__tag content-tags__tag--removable",
        style: "background-color: {tagColour};",
    }, [
        span("{tag}"),
        node(Button, {
            theme: "empty",
            icon: "trash-o",
            class: "absolute top right snow-text",
            "[onClick]": "removeTab",
            "[index]": "_i",
        }),
    ])),
]);

class ActionsComponent extends MintScope {
    constructor() {
        super();
        this.actionButtons = actionButtons;
        actionStore.connect(this);
    }
}
const Actions = component("ul", ActionsComponent, { class: "list flex margin-bottom" }, node("li", {
    mFor: mFor("actionButtons"),
    mKey: "id",
    class: "margin-right-small",
}, node(Button, {
    "[theme]": "getTheme",
    "[icon]": "icon",
    "[label]": "label",
    "[title]": "title",
    "[square]": "square",
    "[onClick]": "onClick",
    "[id]": "id",
})));

const defaultManageChildren = [
    div({ class: "grid-9 padding-right-small" }, [
        node(TitleField),
        node(MessageField),
    ]),
    div({ class: "grid-3 padding-left-small" }, [
        node(ColourSelector),
        node(Tags),
    ]),
    div({ class: "grid-12" }, node(Actions)),
];

const createInsert = () => {
    manageStore.title = "";
    manageStore.message = "";
    manageStore.currentColour = manageStore.colours[0].value;
    manageStore.tags = [];
    actionButtons.forEach((x) => (x.active = false));
};
const editInsert = () => {
    var _a;
    manageStore.title = manageStore.editItem.title;
    {
        const message = manageStore.editItem.message;
        manageStore.message = message;
    }
    manageStore.currentColour = manageStore.editItem.colour;
    manageStore.tags = (_a = manageStore.editItem.tags) !== null && _a !== void 0 ? _a : [];
    actionButtons.forEach((x) => (x.active = false));
    (manageStore.editItem.actions || []).forEach((_action) => {
        const actionButton = actionButtons.find(({ id }) => id === _action);
        if (actionButton === undefined)
            return;
        actionButton.active = true;
    });
};
const oninsert = () => __awaiter$1(void 0, void 0, void 0, function* () {
    const isEdit = manageStore.editItem !== null;
    if (!isEdit) {
        createInsert();
    }
    else {
        editInsert();
    }
    yield wait();
    const form = manageStore.manageFormElementRef;
    if (form !== null) {
        const titleElementRef = [...form.elements].find((x) => x.name === "title");
        titleElementRef === null || titleElementRef === void 0 ? void 0 : titleElementRef.focus();
    }
    refresh(manageStore);
});
const createItem = () => {
    const tags = manageStore.tags.length === 0 ? undefined : [...manageStore.tags];
    const newItem = new Item();
    const elements = [...manageStore.manageFormElementRef.elements];
    if (elements.find((x) => x.name === "title")) {
        newItem.title = manageStore.title;
    }
    if (elements.find((x) => x.name === "message")) {
        newItem.message = manageStore.message;
    }
    if (elements.find((x) => x.name === "colour")) {
        newItem.colour = manageStore.currentColour;
    }
    if (!!tags) {
        newItem.tags = tags;
    }
    newItem.actions = actionButtons
        .filter(({ active }) => active)
        .map(({ id }) => id);
    {
        const actions = getActionAbles(newItem.actions, ActionTypes.init);
        actions.forEach((x) => {
            if (x instanceof Function) {
                x(newItem);
            }
        });
    }
    {
        // ** There should only be one action that matches this if any do.
        // ** We don't want several to run.
        const [action] = getActionAbles(listStore.item.actions, ActionTypes["add-to-list"]);
        if (action instanceof Function) {
            action(listStore.item, newItem);
        }
        else {
            listStore.list.push(newItem);
        }
    }
};
const editItem$1 = () => {
    const { editItem } = manageStore;
    {
        const actions = getActionAbles(editItem.actions || [], ActionTypes.init);
        actions.forEach((x) => {
            if (x instanceof Function) {
                x(editItem);
            }
        });
    }
    const elements = [...manageStore.manageFormElementRef.elements];
    if (elements.find((x) => x.name === "title")) {
        editItem.title = manageStore.title;
    }
    if (elements.find((x) => x.name === "message")) {
        editItem.message = manageStore.message;
    }
    if (elements.find((x) => x.name === "colour")) {
        editItem.colour = manageStore.currentColour;
    }
    manageStore.editItem.actions = actionButtons
        .filter(({ active }) => active)
        .map(({ id }) => id);
    {
        const tags = manageStore.tags.length === 0 ? undefined : [...manageStore.tags];
        manageStore.editItem.tags = tags;
    }
    manageStore.editItem = null;
};
const onSubmit = (event) => {
    event.preventDefault();
    if (manageStore.editItem === null) {
        createItem();
    }
    else {
        editItem$1();
    }
    saveData();
    backToList();
    setFocusOnFirstMainButton();
};
class ManageStore extends Store {
    constructor() {
        super({
            defaultChildren: () => defaultManageChildren,
            manageFormElementRef: null,
            title: "",
            message: "",
            colours: colours.map((x) => ({
                value: x.colour,
            })),
            currentColour: colours[0].colour,
            tagsValue: "",
            tags: [],
            tagsScope: null,
            toEditMethod: "main-button",
            editItem: null,
            mainLabel: new Resolver(() => manageStore.editItem !== null ? "Edit" : "Add"),
            saveButtonLabel: new Resolver(() => manageStore.editItem !== null ? "Edit" : "Add"),
            saveButtonTheme: new Resolver(() => manageStore.editItem !== null ? "apple" : "blueberry"),
            setTitle(_, element) {
                manageStore.title = element.value;
            },
            setMessage(_, element) {
                manageStore.message = element.value;
            },
            setColour(_, element) {
                manageStore.currentColour = element.value;
            },
            oninsert,
            onSubmit,
            cancel() {
                if (manageStore.toEditMethod === "item-button") {
                    path.set(path.get().slice(0, -1));
                }
                backToList();
            },
        });
    }
}
const manageStore = new ManageStore();

const backToList = () => {
    manageStore.editItem = null;
    changePage("list");
    refresh(appStore);
};

const appInit = () => __awaiter$1(void 0, void 0, void 0, function* () {
    const [url] = path.get();
    if (url === undefined) {
        path.set(["list"]);
    }
    loadData$1();
    yield wait();
    appStore.loaded = true;
    refresh(appStore);
    // ** This communicates to node on Electron app, does nothing on Browser.
    window.dispatchEvent(new CustomEvent("initial-data-save", { detail: appStore.rootData }));
    // ** When pressing the Esc key on Manage form, return to list page.
    window.addEventListener("keydown", (event) => {
        if (event.code !== "Escape")
            return;
        if (path.get()[0] === "manage") {
            backToList();
        }
    });
});

class OreganoAppComponent extends MintScope {
    constructor() {
        super();
        this.oninsert = function () {
            appInit();
        };
        appStore.connect(this);
    }
}

class PagesComponent extends MintScope {
    constructor() {
        super();
        this.loaded = new Resolver(() => appStore.loaded);
    }
}
const Pages = component("div", PagesComponent, { class: "pages" }, node("div", Object.assign({}, mIf("loaded")), "_children"));

const upLevel = () => {
    path.set(path.get().slice(0, path.get().length - 1));
    refresh(appStore);
};

class BreadcrumbsComponent extends MintScope {
    constructor() {
        super();
        this.crumbs = new Resolver(() => {
            let output = [];
            if (appStore.rootData === null)
                return output;
            const url = path.get();
            if (url.length === 1) {
                output = [{ content: " -- root -- ", isLink: false }];
                return output;
            }
            if (url.length === 1)
                return [{ content: " ", isLink: false }];
            let data = appStore.rootData;
            const crumbs = url.reduce((a, b, i) => {
                const index = i;
                const target = url.slice(0, index + 1).join("/");
                if (i === 0) {
                    a.push({
                        content: data.title,
                        isLink: true,
                        target,
                    });
                    return a;
                }
                data = data.items[b];
                if (data === undefined) {
                    toast("Unable to find this item, returning to home.", "tomato");
                    (() => __awaiter$1(this, void 0, void 0, function* () {
                        yield wait();
                        upLevel();
                    }))();
                    return [];
                }
                a.push({ content: "/", isLink: false });
                if (i !== url.length - 1) {
                    a.push({ content: data.title, isLink: true, target });
                }
                else {
                    a.push({ content: data.title, isLink: false });
                }
                return a;
            }, []);
            output = crumbs;
            return output;
        });
        this.isRoot = new Resolver(function () {
            return this.content === " -- root -- " ? "orange-text" : "";
        });
        this.goToLink = function () {
            return __awaiter$1(this, void 0, void 0, function* () {
                yield wait();
                refresh(listStore);
            });
        };
    }
}
const Breadcrumbs = component("ul", BreadcrumbsComponent, { class: "breadcrumbs" }, node("li", { mFor: mFor("crumbs"), mKey: "_i", class: "breadcrumbs__item" }, [
    node("a", {
        mIf: mIf("isLink"),
        href: "#{target}",
        class: "breadcrumbs__item-link",
        "(click)": "goToLink",
    }, "{content}"),
    node("span", { mIf: mIf("!isLink"), class: "{isRoot}" }, "{content}"),
]));

class ItemOptionsComponent extends MintScope {
    constructor() {
        super();
        this.getItemOptions = function () {
            return listStore.itemOptions.map((x) => node(x, { "[index]": "index" }));
        };
    }
}
const ItemOptions = component("<>", ItemOptionsComponent, null, [
    node(template({ conditionedBy: "index" }, "getItemOptions")),
]);

class ItemTitleComponent extends MintScope {
    constructor() {
        super();
        this.onaftereach = function () {
            return __awaiter$1(this, void 0, void 0, function* () {
                if (this._index === this.index)
                    return;
                this._index = this.index;
                yield wait();
                refresh(this);
            });
        };
        this.backgroundColor = "transparent";
        this.textColor = "#000";
        this.showOverflow = new Resolver(function () {
            const item = listStore.listElementRef.children[this.index];
            if (!item)
                return false;
            const title = item.querySelector(".list-page__item-title");
            const p = item.querySelector(".list-page__item-title-p");
            if (!title || !p)
                return false;
            {
                const container = title.parentElement;
                this.backgroundColor = container.style.backgroundColor;
                this.textColor = container.style.color;
            }
            if (!p || p.offsetWidth === 0)
                return false;
            if (p.offsetWidth < title.offsetWidth)
                return false;
            return true;
        });
        this.url = new Resolver(() => path.get().join("/"));
    }
}
const ItemTitle = component("a", ItemTitleComponent, {
    href: "#{url}/{index}",
    class: "list-page__item-title",
    "(click)": "selectItem",
}, [
    node("p", { class: "list-page__item-title-p" }, "{title}"),
    node("span", {
        mIf: mIf("showOverflow"),
        class: "list-page__item-title-overflow",
    }, "..."),
]);

const checkHeatmapCheckbox = (item, message = item.message, date = new Date()) => {
    if (item.heatmap === undefined) {
        item.heatmap = {};
    }
    const lines = message.split("\n");
    const checkedLines = lines
        .filter((x) => x.includes("--c-c"))
        .map((x) => x.replace("--c-c", ""))
        .map((x) => x.trim());
    const d = getDate(date, "dd-mm-yyyy");
    item.heatmap[d] = checkedLines;
};

const resolveLeadingZeroes = (number) => {
    return number < 10 ? `0${number}` : number;
};

const getResolvedDate = (time = Date.now()) => {
    const date = new Date(time);
    const [minutes, hours, day, month, year] = [
        date.getMinutes(),
        date.getHours(),
        date.getDate(),
        date.getMonth() + 1,
        date.getFullYear(),
    ]
        .map((x) => resolveLeadingZeroes(x))
        .map((x) => Number(x + ""));
    return { minutes, hours, day, month, year };
};

const getTodaysDate = () => {
    return getDate(new Date(), "dd-mm-yyyy");
};

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

class HeatmapStore extends Store {
    constructor() {
        super({
            message: "",
            isEditing: false,
            editingDate: null,
            year: "",
            month: "",
            monthStartDay: 0,
            weekDays: ["M", "T", "W", "T", "F", "S", "S"],
            heatmap: new Resolver(() => {
                var _a;
                const { item } = listStore;
                if (item === null)
                    return [];
                const { month, year } = getResolvedDate();
                const isToday = (day) => {
                    const { day: d, month: m, year: y } = getResolvedDate();
                    return d === day && m === month && y === year;
                };
                const message = item.message;
                const checkboxMax = (_a = message.match(/--c/g)) === null || _a === void 0 ? void 0 : _a.length;
                const days = Array(new Date(year, month, 0).getDate())
                    .fill(null)
                    .map((_, i) => {
                    var _a;
                    const d = resolveLeadingZeroes(i + 1);
                    const m = resolveLeadingZeroes(month);
                    const title = `${d}-${m}-${year}`;
                    const output = {
                        hidden: false,
                        title,
                        day: i + 1,
                    };
                    const _styles = {};
                    if (((_a = item.heatmap) === null || _a === void 0 ? void 0 : _a[title]) !== undefined) {
                        const checkedTotal = item.heatmap[title].length;
                        const shadow = Math.floor((checkedTotal / checkboxMax) * 100) / 100;
                        _styles["background-color"] = `rgba(25, 207, 73, ${shadow})`;
                    }
                    if (isToday(i + 1)) {
                        _styles.border = "2px solid orange";
                    }
                    output.style = styles(_styles);
                    return output;
                });
                let initialDay = new Date(year, month - 1, 1).getDay() - 1;
                if (initialDay === -1) {
                    initialDay = 6;
                }
                {
                    let i = initialDay;
                    while (i > 0) {
                        days.unshift({ hidden: true });
                        i--;
                    }
                }
                return days;
            }),
            getShadow: new Resolver(function () {
                return this.title === getTodaysDate()
                    ? "z-index shadow-block-orange"
                    : "";
            }),
            oninsert: function () {
                return __awaiter$1(this, void 0, void 0, function* () {
                    heatmapStore.isEditing = false;
                    heatmapStore.message = listStore.item.message;
                    yield wait();
                    const { item } = listStore;
                    if (!item.actions.includes("heatmap")) {
                        path.set(["list", ...path.get().slice(1)]);
                        refresh(appStore);
                        return;
                    }
                    const date = new Date();
                    const [month, year] = [date.getMonth(), date.getFullYear()];
                    heatmapStore.year = year.toString();
                    heatmapStore.month = months[month];
                    heatmapStore.monthStartDay = new Date(year, month + 1, 1).getDay() - 1;
                    refresh(this);
                });
            },
            editHeatmap(_, element) {
                if (listStore.item.heatmap === undefined)
                    return;
                heatmapStore.isEditing = true;
                heatmapStore.editingDate = element.title;
                heatmapStore.message = listStore.item.message.replace(/--c-c/g, "--c");
                const heatmap = listStore.item.heatmap[heatmapStore.editingDate];
                if (heatmap !== undefined) {
                    heatmapStore.message = heatmapStore.message
                        .split("\n")
                        .map((x) => {
                        const value = x.replace("--c", "").trim();
                        if (heatmap.includes(value)) {
                            return x.replace("--c", "--c-c");
                        }
                        return x;
                    })
                        .join("\n");
                }
                refresh(heatmapStore);
            },
        });
    }
}
const heatmapStore = new HeatmapStore();

const checkItem = (splits, line, index, scope) => {
    const newSplits = [...splits];
    newSplits.splice(index, 1, line.includes("--c-c")
        ? line.replace("--c-c", "--c")
        : line.replace("--c", "--c-c"));
    if (path.get().at(0) === "list") {
        listStore.item.message = newSplits.join("\n");
        if (listStore.item.actions.includes("heatmap")) {
            checkHeatmapCheckbox(listStore.item);
        }
    }
    else if (path.get().at(0) === "heatmap") {
        const [d, m, y] = heatmapStore.editingDate.split("-");
        heatmapStore.message = newSplits.join("\n");
        checkHeatmapCheckbox(listStore.item, heatmapStore.message, new Date(`${y}/${m}/${d}`));
    }
    saveData();
    refresh(scope);
};
const resolveCheckbox = (splits, lineContent, index, scope) => {
    return node(Field, {
        type: "checkbox",
        checked: lineContent.includes("--c-c"),
        label: lineContent.replace(/--c-c/g, "").replace(/--c/g, ""),
        onInput: () => checkItem(splits, lineContent, index, scope),
    });
};
const getTemplate = (message, scope) => {
    const splits = message.split("\n");
    const output = splits.map((x, i) => {
        let element = "p";
        const classes = ["reset-margin"];
        const _styles = {};
        // ** Order is important below
        // ** Checkbox
        if (x.includes("--c")) {
            return resolveCheckbox(splits, x, i, scope);
        }
        // ** Code
        if (x.substring(0, 4) === "--<>") {
            x = x.replace("--<>", "");
            element = "code";
        }
        // ** Font size
        if (/--fs[0-9]{2}/g.test(x.substring(0, 6))) {
            const size = x.substring(4, 6);
            x = x.replace(/--fs[0-9]{2}/, "");
            _styles["font-size"] = size + "px";
        }
        // ** Font Bold
        if (x.substring(0, 3) === "--b") {
            x = x.replace("--b", "");
            classes.push("bold");
        }
        // ** Font Underline
        if (x.substring(0, 3) === "--u") {
            x = x.replace("--u", "");
            classes.push("underline");
        }
        // ** Font Italic
        if (x.substring(0, 3) === "--i") {
            x = x.replace("--i", "");
            classes.push("italic");
        }
        // ** Add gap before and after
        if (x.substring(0, 5) === "--gap") {
            x = x.replace("--gap", "");
            classes.push("margin-top margin-bottom");
        }
        if (x.substring(0, 2) === "--") {
            x = x.replace("--", "");
            return node(element, { class: classes.join(" ") }, [
                span({ class: "fa fa-circle list-page__message-bullet" }),
                span(x),
            ]);
        }
        let content = x;
        return node(element, { class: classes.join(" "), style: styles(_styles) }, content);
    });
    return output;
};
class MessageComponent extends MintScope {
    constructor() {
        super();
        this.message = "";
        this.messageClass = "";
        this.currentStyles = new Resolver(() => {
            const { item } = listStore;
            let str = "";
            const actions = item.actions || [];
            // ** For each action
            actions.forEach((x) => {
                var _a;
                // ** Find the action.
                const action = actionButtons.find((y) => y.id === x);
                // ** Only check actions that affect styles.
                if (((_a = action.action) === null || _a === void 0 ? void 0 : _a.type) !== ActionTypes.style)
                    return;
                str += action.action.value;
            });
            return str;
        });
        this.messageTemplate = function () {
            return getTemplate(this.message, this);
        };
    }
}
const Message = component("div", MessageComponent, { class: "list-page__message {messageClass}" }, [node(template({ conditionedBy: "message" }, "messageTemplate"))]);

class TitleComponent extends MintScope {
    constructor() {
        super();
        this.item = new Resolver(() => listStore.item);
        this.filteredActionButtons = new Resolver(() => {
            if (!listStore.item.actions)
                return [];
            const actions = listStore.item.actions
                .map((x) => {
                const action = actionButtons.find((y) => y.id === x);
                if (!action)
                    return;
                const { title, icon, id } = action;
                return { title, icon, id };
            })
                .filter((x) => !!x);
            return actions;
        });
        this.hasIcon = new Resolver(function () {
            return this.icon !== null;
        });
    }
}
const Title = component("div", TitleComponent, {
    class: "list-page__title",
}, [
    node("h2", null, "{item.title}"),
    node("ul", { class: "list flex align-centre" }, node("li", {
        mFor: mFor("filteredActionButtons"),
        mKey: "id",
        class: "padding-left",
    }, node("span", { "[title]": "title" }, [
        node("span", { mIf: mIf("hasIcon"), class: "fa fa-{icon}" }),
    ]))),
]);

const dragDrop = {
    draggable: true,
    "(dragstart)": "onDragStart",
    "(dragover)": "onDragOver",
    "(drop)": "onDrop",
};

class ListComponent extends MintScope {
    constructor() {
        super();
        listStore.connect(this);
    }
}
const List = component("section", ListComponent, { class: "list-page" }, [
    node("div", { class: "list-page__container" }, node("div", { class: "list-page__container-items" }, [
        node(Breadcrumbs, { mIf: mIf("breadcrumbs") }),
        node(Title),
        node("ul", { mIf: mIf("item.tags"), class: "content-tags" }, node("li", {
            mFor: mFor("item.tags"),
            mKey: "tag",
            class: "content-tags__tag",
            style: "background-color: {tagColour};",
        }, [span("{tag}")])),
        node("div", { class: "flex" }, [
            node(Message, {
                "[message]": "item.message",
                "[messageClass]": "messageClass",
            }),
            div({ class: "list-page__list-container {messageClass}" }, node("ul", {
                mIf: mIf("hasList"),
                mRef: mRef("listElementRef"),
                class: "list list-page__list",
                id: "list-items",
            }, node("li", {
                mFor: mFor("list"),
                mKey: "index",
                class: "list-page__item",
                style: styles({
                    "background-color": "{colour}",
                    color: "{getTextColour}",
                }),
                mExtend: mExtend(dragDrop),
            }, node("div", {
                class: "list-page__item-container",
            }, [
                node(ItemTitle, {
                    "[title]": "title",
                    "[index]": "_i",
                    "[selectItem]": "selectItem",
                }),
                node(ItemOptions, {
                    "[index]": "_i",
                }),
            ])))),
        ]),
    ])),
]);

class ManageComponent extends MintScope {
    constructor() {
        super();
        manageStore.connect(this);
    }
}
const Manage = component("section", ManageComponent, null, node("form", {
    mRef: mRef("manageFormElementRef"),
    class: "form manage-form",
    name: "manage-form",
    autocomplete: "off",
    "(submit)": "onSubmit",
}, [
    node("h2", null, "{mainLabel} item"),
    node("div", { class: "flex" }, [
        node("<>", Object.assign({}, mIf("_children")), "_children"),
        node("<>", Object.assign({}, mIf("!_children")), node(template({ onevery: false }, "defaultChildren"))),
        node("div", { class: "grid-12" }, [
            node(Button, {
                type: "submit",
                "[theme]": "saveButtonTheme",
                "[label]": "saveButtonLabel",
                class: "margin-right padded-small",
                large: true,
                "[saveButtonTheme]": "saveButtonTheme",
            }),
            node(Button, {
                theme: "smoke",
                label: "Cancel",
                class: "large padded-small",
                "[onClick]": "cancel",
            }),
        ]),
    ]),
]));

const simiplifyData = (data) => {
    data = JSON.parse(JSON.stringify(data));
    if (data.message === "")
        delete data.message;
    if (data.colour === colours[0].colour)
        delete data.colour;
    data.items.forEach(simiplifyData);
    return data;
};
class ExportStore extends Store {
    constructor() {
        super({
            currentTitle: new Resolver(() => {
                return listStore.item.title;
            }),
            currentValue: new Resolver(() => {
                if (exportStore.onlyItems) {
                    const { items } = listStore.item;
                    const _items = items.map(simiplifyData);
                    return JSON.stringify(_items);
                }
                const { item } = listStore;
                const _item = simiplifyData(item);
                return JSON.stringify(_item);
            }),
            onlyItems: false,
            formElementRef: null,
            oninsert: () => __awaiter$1(this, void 0, void 0, function* () {
                const form = exportStore.formElementRef;
                yield wait();
                const input = form["export-data"];
                input.select();
            }),
            onChangeOnlyItems: (_, element) => {
                exportStore.onlyItems = element.checked;
                refresh(exportStore);
            },
        });
    }
}
const exportStore = new ExportStore();

const ExportData = component("<>", class ExportDataComponent extends MintScope {
    constructor() {
        super();
        exportStore.connect(this);
    }
}, null, [
    node("section", { class: "other-content__container" }, [
        node("form", {
            name: "export-data",
            class: "form flex",
            mRef: mRef("formElementRef"),
        }, [
            node("h2", { class: "width-full reset-margin margin-bottom-small" }, "{currentTitle}"),
            div(node(Field, {
                type: "checkbox",
                label: "Only items",
                "[checked]": "onlyItems",
                "[onInput]": "onChangeOnlyItems",
            })),
            node(Field, {
                type: "textarea",
                label: "Export data",
                name: "export-data",
                wrapperClasses: "width-full",
                "[value]": "currentValue",
                fieldStyles: styles({
                    height: "300px",
                    "font-size": "1rem",
                    "line-height": "1.1rem",
                    resize: "none",
                }),
            }),
        ]),
    ]),
]);

const extractData = (object) => {
    const obj = new Item();
    const { title, message, items, colour } = object;
    // ** Be specific about properties to catch errors.
    obj.title = title !== null && title !== void 0 ? title : "";
    obj.message = message !== null && message !== void 0 ? message : "";
    items && (obj.items = items.map(extractData));
    obj.colour = colour !== null && colour !== void 0 ? colour : colours[0].colour;
    return obj;
};
class ImportStore extends Store {
    constructor() {
        super({
            importValue: "",
            currentTitle: new Resolver(() => {
                const item = getItem(path.get().slice(1));
                if (item === null)
                    return "";
                return item.title;
            }),
            importFormElement: null,
            oninsert() {
                importStore.importValue = "";
                (() => __awaiter$1(this, void 0, void 0, function* () {
                    var _a, _b;
                    yield wait();
                    (_b = (_a = this.importFormElement) === null || _a === void 0 ? void 0 : _a["importValue"]) === null || _b === void 0 ? void 0 : _b.focus();
                }))();
            },
            onInput(_, element) {
                importStore.importValue = element.value;
            },
            onSubmit(event) {
                event.preventDefault();
                if (importStore.importValue === "") {
                    toast("No data input", "orange");
                    return;
                }
                try {
                    const parsed = JSON.parse(importStore.importValue);
                    const currentItem = getItem(path.get().slice(1));
                    if (parsed instanceof Array) {
                        const resolved = parsed.map(extractData);
                        currentItem.items.push(...resolved);
                    }
                    else {
                        const obj = extractData(parsed);
                        currentItem.items.push(obj);
                    }
                    saveData();
                    backToList();
                }
                catch (error) {
                    console.error(error);
                    toast("Could not parse this data", "tomato");
                }
            },
        });
    }
}
const importStore = new ImportStore();

class ImportDataComponent extends MintScope {
    constructor() {
        super();
        importStore.connect(this);
    }
}
const ImportData = component("div", ImportDataComponent, { class: "common-page" }, [
    node("div", { class: "other-content" }, node("section", { class: "other-content__container" }, [
        node("h2", { class: "no-margin" }, "Import into - {currentTitle}"),
        node("form", {
            class: "form",
            "(submit)": "onSubmit",
            mRef: mRef("importFormElement"),
        }, [
            node(Field, {
                type: "textarea",
                name: "importValue",
                label: "Enter JSON data here",
                "[value]": "importValue",
                fieldStyles: styles({
                    height: "12rem",
                }),
                "[onInput]": "onInput",
            }),
            node(Button, {
                type: "submit",
                theme: "apple",
                class: "button large padded",
                label: "Import data",
            }),
        ]),
    ])),
]);

class TreeStore extends Store {
    constructor() {
        super({
            showMessage: false,
            currentTitle: new Resolver(() => {
                return listStore.item.title;
            }),
            currentList: new Resolver(() => {
                return listStore.item.items;
            }),
            toggleShowMessage() {
                treeStore.showMessage = !treeStore.showMessage;
                refresh(treeStore);
            },
        });
    }
}
const treeStore = new TreeStore();

class TreeComponent extends MintScope {
    constructor() {
        super();
        this.tree = [];
        this.hasTree = new Resolver(function () {
            var _a;
            return ((_a = this.items) === null || _a === void 0 ? void 0 : _a.length) > 0;
        });
        this.showMessage = new Resolver(() => treeStore.showMessage);
        this.titleClasses = new Resolver(function () {
            return this.showMessage ? "bold" : "";
        });
        this.treeRepeater = () => node(Tree, { mIf: mIf("hasTree"), "[tree]": "items" });
    }
}
const Tree = component("ul", TreeComponent, { class: "tree" }, node("li", { mFor: mFor("tree"), mKey: "_i" }, [
    node("p", { "[class]": "titleClasses" }, "{title}"),
    node("p", { mIf: mIf("showMessage"), class: "tree__message font-size-small" }, "{message}"),
    node(template({ conditionedBy: "showMessage" }, "treeRepeater")),
]));

class TreeViewComponent extends MintScope {
    constructor() {
        super();
        treeStore.connect(this);
    }
}
const TreeView = component("section", TreeViewComponent, { class: "other-content__container" }, [
    node(Field, {
        type: "checkbox",
        wrapperClasses: "margin-bottom",
        label: "Show message",
        "[checked]": "showMessage",
        id: "show-messages-field",
        "[onInput]": "toggleShowMessage",
    }),
    node("h2", { class: "other-content__title" }, "{currentTitle}"),
    node(Tree, { "[tree]": "currentList" }),
]);

class SearchByTitleComponent extends MintScope {
    constructor() {
        super();
        this.includeMessage = new Resolver(() => searchStore.includeMessage);
        this.onCheckIncludeMessage = new Resolver(() => searchStore.onCheckIncludeMessage);
        this.showNoItemFound = new Resolver(() => searchStore.showNoItemFound);
        this.results = new Resolver(() => searchStore.results);
        this.fromMessageClass = new Resolver(() => searchStore.fromMessageClass);
        this.selectRoute = new Resolver(() => searchStore.selectRoute);
    }
}
const SearchByTitle = component("div", SearchByTitleComponent, { class: "padding" }, [
    div({ class: "padding-bottom" }, node(Field, {
        type: "checkbox",
        label: "Include message",
        name: "include-message",
        "[checked]": "includeMessage",
        "[onInput]": "onCheckIncludeMessage",
    })),
    div({ mIf: mIf("showNoItemFound") }, "-- No items found --"),
    node("ul", { class: "list" }, node("li", {
        mFor: mFor("results"),
        mKey: "_i",
        class: "card relative pointer hover {fromMessageClass}",
        style: styles({ "margin-bottom": "2px" }),
        "(click)": "selectRoute",
    }, [
        span({
            class: "absolute smoke-text font-size-small",
            style: styles({ top: "2px", left: "2px" }),
        }, "{path}"),
        span("{title}"),
    ])),
]);

class SearchByTagComponent extends MintScope {
    constructor() {
        super();
        this.showNoTabItemFound = new Resolver(() => searchStore.showNoTabItemFound);
        this.tagSearchResults = new Resolver(() => searchStore.tagSearchResults);
        this.fromMessageClass = new Resolver(() => searchStore.fromMessageClass);
        this.selectRoute = new Resolver(() => searchStore.selectRoute);
    }
}
const SearchByTag = component("div", SearchByTagComponent, { class: "padding" }, [
    div({ mIf: mIf("showNoTabItemFound") }, "-- No items found --"),
    node("ul", { class: "list" }, node("li", {
        mFor: mFor("tagSearchResults"),
        mKey: "_i",
        class: "card relative pointer hover {fromMessageClass}",
        style: styles({ "margin-bottom": "2px" }),
        "(click)": "selectRoute",
    }, [
        span({
            class: "absolute smoke-text font-size-small",
            style: styles({ top: "2px", left: "2px" }),
        }, "{path}"),
        span("{title}"),
    ])),
]);

const resolveIsOnMessage = (message, includeMessage, value) => {
    if (!includeMessage)
        return false;
    if (message instanceof Array)
        return false;
    return message.toLowerCase().includes(value.toLowerCase());
};
const getPath$1 = (route) => {
    // ** We start at the current Item we're in.
    let currentItem = listStore.item;
    // ** We will output a collection of titles that represent the route.
    const outputPath = [currentItem.title];
    for (let locationIndex of route) {
        const newItem = currentItem.items[locationIndex];
        outputPath.push(newItem.title);
        currentItem = newItem;
    }
    return outputPath.join(" / ");
};
// ** Recursive function that looks through each item and its items to match against the
// ** title or the title AND message.
const searchItems = (list, value, { includeMessage }, output = [], currentRoute = []) => {
    for (let [index, { title, message, items }] of list.entries()) {
        const isOnTitle = title.toLowerCase().includes(value.toLowerCase());
        const isOnMessage = resolveIsOnMessage(message, includeMessage, value);
        if (isOnTitle || isOnMessage) {
            // ** Current route defines the path to get to this item e.g. [0,2,1].
            // ** Here we extend the currentRoute to get to this item.
            const route = [...currentRoute, index];
            // ** The path is the word representation of the route.
            const path = getPath$1(route);
            output.push({ title, route, path, isOnTitle });
        }
        if (items instanceof Array) {
            searchItems(items, value, { includeMessage }, output, [
                ...currentRoute,
                index,
            ]);
        }
    }
    return output;
};

const getPath = (route) => {
    // ** We start at the current Item we're in.
    let currentItem = listStore.item;
    // ** We will output a collection of titles that represent the route.
    const outputPath = [currentItem.title];
    for (let locationIndex of route) {
        const newItem = currentItem.items[locationIndex];
        outputPath.push(newItem.title);
        currentItem = newItem;
    }
    return outputPath.join(" / ");
};
// ** Recursive function that looks through each item and its items to match against the
// ** title or the title AND message.
const searchItemTags = (list, value, output = [], currentRoute = []) => {
    for (let [index, { title, items, tags = [] }] of list.entries()) {
        if (!!tags.find(({ tag }) => tag.includes(value))) {
            // ** Current route defines the path to get to this item e.g. [0,2,1].
            // ** Here we extend the currentRoute to get to this item.
            const route = [...currentRoute, index];
            // ** The path is the word representation of the route.
            const path = getPath(route);
            output.push({ title, route, path });
        }
        if (items instanceof Array) {
            searchItemTags(items, value, output, [...currentRoute, index]);
        }
    }
    return output;
};

const tabs = [
    new Tab("By title", () => node(SearchByTitle)),
    new Tab("By Tag", () => node(SearchByTag)),
];
const update = (_, element) => {
    searchStore.value = element.value;
};
const runSearch = (event) => {
    event.preventDefault();
    const { value } = searchStore;
    if (value === "") {
        searchStore.value = "";
        searchStore.results = [];
        searchStore.tagSearchResults = [];
        refresh(searchStore);
        return;
    }
    const { items } = getItem(path.get().slice(1));
    const { includeMessage } = searchStore;
    const results = searchItems(items, value, { includeMessage });
    searchStore.results = results;
    const tagSearchResults = searchItemTags(items, value);
    searchStore.tagSearchResults = tagSearchResults;
    searchStore.searchRun = true;
    refresh(searchStore);
};
const selectRoute = function () {
    path.set(["list", ...path.get().slice(1), ...this.route]);
    searchStore.value = "";
    searchStore.results = [];
    searchStore.tagSearchResults = [];
    refresh(appStore);
};
class SearchStore extends Store {
    constructor() {
        super({
            value: "",
            results: [],
            tagSearchResults: [],
            formElementRef: null,
            searchRun: false,
            includeMessage: false,
            tabs,
            currentTab: tabs[0],
            currentTitle: new Resolver(() => {
                const item = getItem(path.get().slice(1));
                if (item === null)
                    return "";
                return item.title;
            }),
            showNoItemFound: new Resolver(() => {
                return searchStore.searchRun && searchStore.results.length === 0;
            }),
            showNoTabItemFound: new Resolver(() => {
                return (searchStore.searchRun && searchStore.tagSearchResults.length === 0);
            }),
            fromMessageClass: new Resolver(function () {
                return this.isOnTitle ? "" : "border-left-blueberry";
            }),
            update,
            runSearch,
            selectRoute,
            onCheckIncludeMessage(_, element) {
                searchStore.includeMessage = element.checked;
            },
            oninsert: function () {
                var _a, _b;
                return __awaiter$1(this, void 0, void 0, function* () {
                    searchStore.value = "";
                    searchStore.results = [];
                    searchStore.tagSearchResults = [];
                    searchStore.searchRun = false;
                    yield wait();
                    (_b = (_a = searchStore.formElementRef) === null || _a === void 0 ? void 0 : _a.search) === null || _b === void 0 ? void 0 : _b.focus();
                });
            },
        });
    }
}
const searchStore = new SearchStore();

class SearchComponent extends MintScope {
    constructor() {
        super();
        searchStore.connect(this);
    }
}
const Search = component("<>", SearchComponent, null, [
    node("section", { class: "other-content__container" }, [
        node("h2", { class: "reset-margin margin-bottom-small" }, "{currentTitle}"),
        node("form", {
            class: "flex",
            "(submit)": "runSearch",
            autocomplete: "off",
            mRef: mRef("formElementRef"),
        }, [
            div({ class: "flex width-full" }, [
                node(Field, {
                    name: "search",
                    placeholder: "Search ...",
                    wrapperClasses: "flex-grow margin-right-small",
                    "[value]": "value",
                    "[onInput]": "update",
                }),
                node(Button, {
                    type: "submit",
                    icon: "search",
                    class: "square",
                }),
            ]),
        ]),
        node(Tabs, {
            "[tabs]": "tabs",
        }),
    ]),
]);

const createLine = (svgElement, attributes) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    Object.entries(attributes).forEach(([key, value]) => {
        line.setAttribute(key, String(value));
    });
    svgElement.append(line);
};

// import { createRect } from "./create-rect.service";
const addBorder = function () {
    const that = this;
    const { x: x1, y } = that.offset;
    const y1 = that.graphHeight + y;
    const common = {
        x1,
        y1,
        style: `stroke-width: 1px; stroke: ${that.options.borderColour};`,
        // style: `stroke-width: 5px; stroke: pink;`,
    };
    // Vertical
    createLine(that.element, Object.assign(Object.assign({}, common), { x2: x1, y2: y }));
    // Horizontal
    createLine(that.element, Object.assign(Object.assign({}, common), { x2: x1 + that.graphWidth, y2: y1 }));
    // createRect(that.element, {
    //   x: that.offset.x,
    //   y: that.offset.y,
    //   width: that.graphWidth,
    //   height: that.graphHeight,
    //   style: "fill: rgba(0, 100, 0, 0.2);",
    // });
};

const isValidElement = (element) => {
    const valid = element.nodeName === "svg" || element.nodeName === "canvas";
    return valid;
};

const createRect = (svgElement, attributes) => {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    Object.entries(attributes).forEach(([key, value]) => {
        rect.setAttribute(key, String(value));
    });
    svgElement.append(rect);
    return rect;
};

const defaultTextHeight = 16;
const textLineHeight = 1.2;
const defaultXTextSize = (defaultTextHeight * 7) / 16;
const defaultPointColour = "#000";
const defaultLineColour = "#000";
const defaultPointSize = 2;
const defaultLinkThickness = 1;
const defaultBorderColour = "#000";
const defaultInterval = 0.2;

const createText = (svgElement, attributes = {}, textContent = "") => {
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("font-size", defaultTextHeight.toString());
    Object.entries(attributes).forEach(([key, value]) => {
        text.setAttribute(key, String(value));
    });
    text.textContent = textContent;
    svgElement.append(text);
    return text;
};

const reset = function () {
    const that = this;
    Array.from(that.element.children).forEach((x) => that.element.removeChild(x));
};

const getMax = (data, property) => {
    return data.reduce((a, b) => (b[property] > a ? b[property] : a), -Infinity);
};

const getMin = (data, property) => {
    return data.reduce((a, b) => (b[property] < a ? b[property] : a), Infinity);
};

const resolveInformation = function () {
    const that = this;
    const element = that.element;
    const data = that.lineData;
    const { clientWidth: width, clientHeight: height } = element;
    // This is the edge around the SVG elements and the SVG Element.
    const gap = that.options.pointSize * 2;
    that.graphWidth = width * 0.9 - gap;
    this.graphHeight = height * 0.9 - gap;
    that.minX = getMin(data, "x");
    that.maxX = getMax(data, "x");
    this.minY = this.options.minY;
    this.maxY = (() => {
        const maxY = this.options.maxY;
        return this.minY === maxY ? this.minY + 1 : maxY;
    })();
    this.offset = { x: width * 0.1, y: gap };
    const deltaX = that.maxX - that.minX;
    const deltaY = that.maxY - that.minY;
    that.xPart = that.graphWidth / deltaX;
    that.yPart = that.graphHeight / deltaY;
};

const generateChartLines = function () {
    const that = this;
    const data = that.lineData;
    that.addLines.apply(that, [data]);
    that.addCircles.apply(that, [data]);
};

const transform = (x, y) => `transform-origin: ${x}px ${y}px; transform: rotate(90deg);`;
const addLabels = function () {
    const that = this;
    const data = that.lineData;
    // ** Top and bottom of y labels
    // createText(that.element, { x: 0, y: defaultTextHeight }, String(that.maxY));
    // createText(that.element, { x: 0, y: that.graphHeight }, String(that.minY));
    const textSize = defaultXTextSize;
    // let pacing = 0;
    const delta = that.graphWidth / (data.length - 1);
    data.forEach((point, index) => {
        // if (index === data.length - 1) return;
        // const x = point.x * that.xPart - that.xPart * that.minX + that.offset.x + 0;
        // const y = that.graphHeight;
        // if (pacing < textSize) {
        //   pacing += textSize;
        //   createText(
        //     that.element,
        //     {
        //       x,
        //       y,
        //       "font-size": defaultXTextSize,
        //       style: that.options.xLabelsAreVertical ? transform(x, y) : "",
        //     },
        //     point.label
        //   );
        // } else {
        //   pacing = 0;
        // }
        const x = that.offset.x + delta * index - textSize / 2;
        const y = that.offset.y + that.graphHeight + textSize / 2;
        createText(that.element, {
            x,
            y,
            "font-size": textSize,
            style: that.options.xLabelsAreVertical ? transform(x, y) : "",
        }, point.label);
        if (index !== 0) {
            const x1 = x + textSize / 2;
            createLine(that.element, {
                x1: x1,
                y1: y,
                x2: x1,
                y2: that.offset.y,
                style: `stroke-width: 1px; stroke: ${that.options.borderColour};`,
            });
        }
    });
};

const toSignificantFigures = (num, figures) => {
    const str = String(num);
    const digits = str.split("");
    if (digits[0] === "0" && digits[1] !== ".") {
        throw "Whoops";
    }
    let i = 0;
    let added = 0;
    const output = [];
    while (i < digits.length && added < figures) {
        const item = digits[i];
        i++;
        output.push(item);
        if (item === ".")
            continue;
        if (item === "0" && added === 0)
            continue;
        added++;
    }
    return output.join("");
};

const addIntervals = function () {
    const that = this;
    // const yTextsWeCanHave = Math.floor(
    //   (that.element.clientHeight - defaultTextHeight) / (defaultTextHeight * 2)
    // );
    // const interval = Number(
    //   toSignificantFigures(String((that.maxY - that.minY) / yTextsWeCanHave), 3)
    // );
    // const intervals = [0];
    // const delta = that.maxY - that.minY;
    const intervals = [];
    {
        let i = that.minY;
        while (i < that.maxY) {
            intervals.push(i);
            i = Number(toSignificantFigures(i + that.options.interval, 3));
        }
    }
    const spacing = that.graphHeight / intervals.length;
    intervals.push(that.maxY);
    // {
    //   let i = interval;
    //   while (i <= delta) {
    //     intervals.push(i);
    //     i += interval;
    //   }
    // }
    const x1 = that.offset.x;
    const x2 = that.offset.x + that.graphWidth;
    intervals.reverse().forEach((interval, index) => {
        //   const yIndexPart = (that.minY + i) * that.yPart;
        //   const yIndexPartPrevious = that.yPart * that.minY;
        //   const offset = that.offset.y;
        //   const y = that.graphHeight - (yIndexPart - yIndexPartPrevious + offset);
        const y = that.offset.y + spacing * index;
        if (index !== intervals.length - 1) {
            createLine(that.element, {
                x1,
                y1: y,
                x2,
                y2: y,
                style: `stroke-width: 1px; stroke: ${that.options.borderColour};`,
            });
        }
        //   const value = round(that.minY + i);
        createText(that.element, { x: that.options.pointSize, y: y + defaultTextHeight / 2 }, String(interval));
    });
};

// import { defaultXTextSize } from "../../data/default-data";
const addLines = function (data) {
    const that = this;
    const lineColour = that.options.lineColour;
    const lineThickness = that.options.lineThickness;
    // const textSize = defaultXTextSize;
    // let pacing = 0;
    data.forEach((point, index) => {
        if (index === 0) {
            // pacing += textSize;
            return;
        }
        const [cx, cy] = [
            point.x * that.xPart - that.xPart * that.minX + that.offset.x,
            that.graphHeight -
                (point.y * that.yPart - that.yPart * that.minY + that.offset.y),
        ];
        const previous = data[index - 1];
        const [previousCX, previousCY] = [
            previous.x * that.xPart - that.xPart * that.minX + that.offset.x,
            that.graphHeight -
                (previous.y * that.yPart - that.yPart * that.minY + that.offset.y),
        ];
        // if (pacing < textSize) {
        //   pacing += textSize;
        //   createLine(that.element, {
        //     x1: cx,
        //     y1: 0,
        //     x2: cx,
        //     y2: that.graphHeight,
        //     style: `stroke-width:1px;stroke:lightgrey;`,
        //   });
        // } else {
        //   pacing = 0;
        // }
        createLine(that.element, {
            x1: previousCX,
            y1: previousCY,
            x2: cx,
            y2: cy,
            style: `stroke-width: ${lineThickness}px; stroke: ${lineColour};`,
        });
    });
};

const createCircle = (svgElement, attributes) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    Object.entries(attributes).forEach(([key, value]) => {
        circle.setAttribute(key, String(value));
    });
    svgElement.append(circle);
    return circle;
};

const addCircles = function (data) {
    const that = this;
    const pointColour = that.options.pointColour;
    const pointSize = that.options.pointSize;
    data.forEach((point) => {
        const [cx, cy] = [
            point.x * that.xPart - that.xPart * that.minX + that.offset.x,
            that.graphHeight -
                (point.y * that.yPart - that.yPart * that.minY + that.offset.y),
        ];
        const circle = createCircle(that.element, {
            cx,
            cy,
            r: pointSize,
            // style: `stroke: ${pointColour}; fill: transparent;`,
            style: `stroke: ${pointColour}; fill: ${pointColour};`,
        });
        circle.addEventListener("mouseenter", () => {
            const [rect, text] = that.tooltip;
            that.element.append(rect);
            that.element.append(text);
            const x = cx + 140 + 10 + 5 > that.element.clientWidth
                ? that.element.clientWidth - (140 + 10)
                : cx + 10;
            rect.setAttribute("x", String(x));
            rect.setAttribute("y", String(cy + 10));
            text.setAttribute("x", String(x + 5));
            text.setAttribute("y", String(cy + 10 + defaultTextHeight));
            text.textContent = `${point.label} -- ${point.y}`;
        });
        circle.addEventListener("mouseleave", () => {
            const [rect, text] = that.tooltip;
            rect.parentElement.removeChild(rect);
            text.parentElement.removeChild(text);
        });
    });
};

const resolveOptions = (_options, lineData) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const options = {
        tooltip: (_a = _options.tooltip) !== null && _a !== void 0 ? _a : false,
        minY: (_b = _options.minY) !== null && _b !== void 0 ? _b : getMin(lineData, "y"),
        maxY: (_c = _options.maxY) !== null && _c !== void 0 ? _c : getMax(lineData, "y"),
        borderColour: (_d = _options.borderColour) !== null && _d !== void 0 ? _d : defaultBorderColour,
        lineColour: (_e = _options.lineColour) !== null && _e !== void 0 ? _e : defaultLineColour,
        lineThickness: (_f = _options.lineThickness) !== null && _f !== void 0 ? _f : defaultLinkThickness,
        pointColour: (_g = _options.pointColour) !== null && _g !== void 0 ? _g : defaultPointColour,
        pointSize: (_h = _options.pointSize) !== null && _h !== void 0 ? _h : defaultPointSize,
        xLabelsAreVertical: (_j = _options.xLabelsAreVertical) !== null && _j !== void 0 ? _j : true,
        interval: (_k = _options.interval) !== null && _k !== void 0 ? _k : defaultInterval,
    };
    return options;
};

class Line {
    constructor(element, lineData, options = {}) {
        this.reset = reset;
        this.resolveInformation = resolveInformation;
        this.generateChartLines = generateChartLines;
        this.addBorder = addBorder;
        this.addLabels = addLabels;
        this.addIntervals = addIntervals;
        this.addLines = addLines;
        this.addCircles = addCircles;
        if (!isValidElement(element))
            throw new Error("Element provided to Line not a HTMLElement");
        this.element = element;
        this.lineData = lineData;
        this.options = resolveOptions(options, lineData);
        this.tooltip = null;
        if (this.options.tooltip === true) {
            this.tooltip = [
                createRect(element, {
                    width: 140,
                    height: defaultTextHeight * textLineHeight + 2,
                    style: "stroke: #000; stroke-width: 1px; fill: #fff;",
                }),
                createText(element),
            ];
        }
        this.graphWidth = null;
        this.graphHeight = null;
        this.xPart = null;
        this.yPart = null;
        this.minX = null;
        this.maxX = null;
        this.minY = null;
        this.maxY = null;
        (function init() {
            this.reset();
            this.resolveInformation();
            this.addBorder();
            this.addIntervals();
            this.addLabels();
            this.generateChartLines();
        }).apply(this);
    }
}

const flattenData = (() => {
    let index = 0;
    return (list, arr) => {
        if (!(arr instanceof Array)) {
            arr = [];
            index = 0;
        }
        list.forEach((item) => {
            if (item.title.includes(" -- ")) {
                const [label, y] = item.title.split(" -- ");
                arr.push({ x: index++, y: parseFloat(y), label });
            }
            item.items instanceof Array && flattenData(item.items, arr);
        });
        return arr;
    };
})();
const loadData = () => {
    const data = flattenData(graphStore.currentList);
    const maxY = Math.ceil(data.reduce((a, b) => (b.y > a ? b.y : a), -Infinity));
    const minY = Math.floor(data.reduce((a, b) => (b.y < a ? b.y : a), Infinity));
    new Line(graphStore.svgElementRef, data, {
        xLabelsAreVertical: true,
        borderColour: "lightgrey",
        pointColour: "#3d7fe3",
        lineColour: "#3d7fe3",
        pointSize: 3,
        tooltip: true,
        maxY,
        minY,
        interval: 0.5,
    });
};
class GraphStore extends Store {
    constructor() {
        super({
            currentTitle: new Resolver(() => {
                const item = getItem(path.get().slice(1));
                if (item === null)
                    return "";
                return item.title;
            }),
            currentList: new Resolver(() => {
                const item = getItem(path.get().slice(1));
                if (item === null)
                    return [];
                return item.items;
            }),
            svgClass: new Resolver(() => {
                return `visibility: ${graphStore.showGraph ? "visible" : "hidden"};`;
            }),
            showGraph: false,
            svgElementRef: null,
            oninsert: function () {
                return __awaiter$1(this, void 0, void 0, function* () {
                    graphStore.showGraph = false;
                    yield wait();
                    refresh(graphStore);
                    yield wait(300);
                    graphStore.showGraph = true;
                    refresh(graphStore);
                    loadData();
                });
            },
        });
    }
}
const graphStore = new GraphStore();

class GraphviewComponent extends MintScope {
    constructor() {
        super();
        graphStore.connect(this);
    }
}
const GraphView = component("section", GraphviewComponent, { class: "common-page" }, [
    node("div", { class: "other-content__container" }, [
        node("div", { class: "other-content__title margin-bottom" }, "{currentTitle}"),
        div({
            mIf: mIf("!showGraph"),
        }, "Loading..."),
        node("svg", {
            mIf: mIf("showGraph"),
            class: "svgClass",
            viewBox: "0 0 836 420",
            style: styles({
                width: "836px",
                height: "420px",
            }),
            mRef: mRef("svgElementRef"),
        }),
    ]),
]);

class HeatmapComponent extends MintScope {
    constructor() {
        super();
        heatmapStore.connect(this);
    }
}
const Heatmap = component("section", HeatmapComponent, { class: "common-page" }, [
    node("h2", { class: "reset-margin margin-bottom" }, "Heat map"),
    div({ mIf: mIf("!isEditing") }, [
        node("p", { class: "reset-margin margin-bottom" }, "{month} - {year}"),
        node("ul", { class: "list flex", style: "width:224px;" }, node("li", {
            mFor: mFor("weekDays"),
            mKey: "_i",
            class: "relative width height",
        }, span({ class: "block absolute middle bold" }, "{_x}"))),
        node("ul", { class: "list flex", style: "width:224px;" }, node("li", {
            mFor: mFor("heatmap"),
            mKey: "_i",
            class: "relative width height",
        }, [
            node("span", {
                mIf: mIf("hidden"),
                class: "block absolute middle width height smoke-bg border rounded unselect",
            }),
            node("span", {
                mIf: mIf("!hidden"),
                class: "block absolute middle width height border rounded {getShadow} text-centre line-height bold font-size-small hover pointer unselect",
                "[title]": "title",
                "[style]": "style",
                "(click)": "editHeatmap",
            }, "{day}"),
        ])),
    ]),
    div({ mIf: mIf("isEditing") }, [
        div({ class: "margin-bottom" }, node(Button, {
            icon: "level-up",
            square: true,
            large: true,
            onClick() {
                heatmapStore.isEditing = false;
                refresh(heatmapStore);
            },
        })),
        node("p", { class: "reset-margin margin-bottom" }, "Edit date: {editingDate}"),
        node(Message, { "[message]": "message" }),
    ]),
]);

class AltButtonsComponent extends MintScope {
    constructor() {
        super();
        this.backToList = () => {
            if (manageStore.toEditMethod === "item-button") {
                path.set(path.get().slice(0, -1));
                manageStore.toEditMethod = "main-button";
            }
            backToList();
        };
    }
}
const AltButtons = component("div", AltButtonsComponent, { class: "alt-buttons" }, node("ul", { class: "list" }, node("li", null, node(Button, {
    theme: "blueberry",
    icon: "arrow-left",
    large: true,
    square: true,
    "[onClick]": "backToList",
}))));

class PrimaryButtonsComponent extends MintScope {
    constructor() {
        super();
        appButtonsStore.connect(this);
    }
}
const PrimaryButtons = component("div", PrimaryButtonsComponent, null, [
    div({
        mIf: mIf("isList"),
        mRef: mRef("appButtonsElement"),
        class: "list-page__main-buttons",
    }, "_children"),
    node(AltButtons, { mIf: mIf("!isList") }),
]);

const addItem = () => {
    changePage("manage");
    refresh(appStore);
};

class AddAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.addItem = addItem;
    }
}
const AddAppButton = component("<>", AddAppButtonComponent, {}, node(Button, {
    theme: "blueberry",
    icon: "plus",
    title: "Add",
    large: true,
    square: true,
    class: "main-button--add margin-right-small",
    id: "add-button",
    "[onClick]": "addItem",
}));

const editItem = () => {
    if (!(listStore.item instanceof Item) &&
        listStore.item.root !== true)
        return;
    manageStore.editItem = listStore.item;
    path.set(["manage", ...path.get().slice(1)]);
    manageStore.toEditMethod = "main-button";
    refresh(appStore);
};

const appButtonProps = {
    large: true,
    square: true,
    class: "margin-right-small",
};

class EditAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.editItem = editItem;
    }
}
const EditAppButton = component("<>", EditAppButtonComponent, null, node(Button, {
    theme: "apple",
    icon: "pencil",
    title: "Edit this item",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "editItem",
}));

class UpLevelAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.showButton = new Resolver(() => {
            return path.get().length > 1;
        });
        this.upLevel = upLevel;
    }
}
const UpLevelAppButton = component("<>", UpLevelAppButtonComponent, {}, node(Button, {
    mIf: mIf("showButton"),
    theme: "snow",
    icon: "level-up",
    title: "Up one level",
    mExtend: mExtend(appButtonProps),
    id: "up-level-button",
    "[onClick]": "upLevel",
}));

const upToRoot = () => {
    path.set(path.get().slice(0, 1));
    refresh(appButtonsStore);
    refresh(listStore);
};

class UpToRootAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.upToRoot = upToRoot;
        this.disabled = () => path.get().length === 1;
    }
}
const UpToRootAppButton = component("<>", UpToRootAppButtonComponent, {}, node(Button, {
    theme: "orange",
    icon: "home",
    title: "Up to root",
    mExtend: mExtend(appButtonProps),
    id: "up-to-root",
    "[onClick]": "upToRoot",
    "[disabled]": "disabled",
}));

const pasteItems = () => {
    const { pasteItems } = appStore.rootData;
    listStore.list.push(...pasteItems);
    pasteItems.length = 0;
    saveData();
    refresh(appButtonsStore);
    refresh(listStore);
};

class PasteAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.hasPasteItems = new Resolver(() => { var _a; return !!((_a = appStore.rootData) === null || _a === void 0 ? void 0 : _a.pasteItems.length); });
        this.pasteItems = pasteItems;
        this.pastItemsCount = new Resolver(() => {
            return appStore.rootData.pasteItems.length.toString();
        });
    }
}
const PasteAppButton = component("<>", PasteAppButtonComponent, null, node(Button, {
    mIf: mIf("hasPasteItems"),
    theme: "apple",
    icon: "paint-brush",
    extraButtonLabel: [node("span", null, "{pastItemsCount}")],
    title: "Paste items",
    id: "paste-item-button",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "pasteItems",
    "[pastItemsCount]": "pastItemsCount",
}));

const saveToFile = () => {
    window.dispatchEvent(new CustomEvent("saveToFile", { detail: appStore.rootData }));
};

class SaveAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.save = saveToFile;
    }
}
const SaveAppButton = component("<>", SaveAppButtonComponent, null, node(Button, {
    theme: "blueberry",
    icon: "floppy-o",
    title: "Save data to file",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "save",
}));

class SecondaryButtonsComponent extends MintScope {
    constructor() {
        super();
        this.isList = new Resolver(() => appButtonsStore.isList);
    }
}
const SecondaryButtons = component("div", SecondaryButtonsComponent, null, [
    div({
        mIf: mIf("isList"),
        class: "list-page__main-buttons",
    }, "_children"),
]);

class ExportAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.openExport = function () {
            path.set(["export", ...path.get().slice(1)]);
            refresh(appStore);
        };
    }
}
const ExportAppButton = component("<>", ExportAppButtonComponent, null, node(Button, {
    theme: "apple",
    icon: "upload",
    title: "Export",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openExport",
}));

class ImportAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.openImport = function () {
            path.set(["import", ...path.get().slice(1)]);
            refresh(appStore);
        };
    }
}
const ImportAppButton = component("<>", ImportAppButtonComponent, null, node(Button, {
    theme: "snow",
    icon: "download",
    title: "Import",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openImport",
}));

class TreeAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.openTreeView = function () {
            path.set(["tree", ...path.get().slice(1)]);
            refresh(appStore);
        };
    }
}
const TreeAppButton = component("<>", TreeAppButtonComponent, null, node(Button, {
    theme: "snow",
    icon: "list",
    title: "Show tree view",
    id: "tree-button",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openTreeView",
}));

class SearchAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.openSearch = function () {
            path.set(["search", ...path.get().slice(1)]);
            refresh(appStore);
        };
    }
}
const SearchAppButton = component("<>", SearchAppButtonComponent, null, node(Button, {
    theme: "blueberry",
    icon: "search",
    title: "Search",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openSearch",
}));

class GraphAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.showButton = new Resolver(() => {
            var _a;
            return (_a = listStore.item.actions) === null || _a === void 0 ? void 0 : _a.includes("charts");
        });
        this.openGraph = function () {
            path.set(["graph-view", ...path.get().slice(1)]);
            refresh(appStore);
        };
    }
}
const GraphAppButton = component("<>", GraphAppButtonComponent, null, node(Button, {
    mIf: mIf("showButton"),
    theme: "snow",
    icon: "line-chart",
    title: "Graph",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openGraph",
}));

class HeatmapAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.showButton = new Resolver(() => {
            var _a;
            return (_a = listStore.item.actions) === null || _a === void 0 ? void 0 : _a.includes("heatmap");
        });
        this.openHeatmap = function () {
            path.set(["heatmap", ...path.get().slice(1)]);
            refresh(appStore);
        };
    }
}
const HeatmapAppButton = component("<>", HeatmapAppButtonComponent, null, node(Button, {
    mIf: mIf("showButton"),
    theme: "blueberry",
    icon: "list",
    title: "Heatmap",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "openHeatmap",
}));

// ** Make sure non of these are ids on any elements or the page will scroll there.
const allRoutes = [
    ["list", node(List)],
    ["manage", node(Manage)],
    ["export", node(ExportData)],
    ["import", node(ImportData)],
    ["tree", node(TreeView)],
    ["search", node(Search)],
    ["graph-view", node(GraphView)],
    ["heatmap", node(Heatmap)],
];

const allPrimaryButtons = [
    node(AddAppButton),
    node(EditAppButton),
    node(UpLevelAppButton),
    node(UpToRootAppButton),
    node(PasteAppButton),
];
const AllPrimaryButtons = component("<>", null, null, [
    node(PrimaryButtons, null, [...allPrimaryButtons]),
]);

const cutAllItems = () => {
    const { item } = listStore;
    const { items } = item;
    appStore.rootData.pasteItems.push(...items);
    item.items.length = 0;
    saveData();
    refresh(appButtonsStore);
    refresh(listStore);
};

class CutAllAppButtonComponent extends MintScope {
    constructor() {
        super();
        this.cutAllItems = cutAllItems;
    }
}
const CutAllAppButton = component("<>", CutAllAppButtonComponent, null, node(Button, {
    theme: "orange",
    icon: "scissors",
    title: "Cut all items",
    id: "cut-all-item-button",
    mExtend: mExtend(appButtonProps),
    "[onClick]": "cutAllItems",
}));

const allSecondaryButtons = [
    node(ExportAppButton),
    node(ImportAppButton),
    node(TreeAppButton),
    node(SearchAppButton),
    node(GraphAppButton),
    node(HeatmapAppButton),
    node(CutAllAppButton),
    node(SaveAppButton),
];
const AllSecondaryButtons = component("<>", null, null, [
    node(SecondaryButtons, null, [...allSecondaryButtons]),
]);

export { Actions, AddAppButton, AllPrimaryButtons, AllSecondaryButtons, ColourSelector, Content, CutListItem, DeleteListItem, EditAppButton, EditListItem, ExportAppButton, ExportData, GraphAppButton, GraphView, HasMessage, Header, Heatmap, HeatmapAppButton, ImportAppButton, ImportData, ItemCount, List, Manage, MessageField, OreganoAppComponent, Pages, PasteAppButton, PrimaryButtons, SaveAppButton, Search, SearchAppButton, SecondaryButtons, Tags, TitleField, TreeAppButton, TreeView, UpLevelAppButton, UpToRootAppButton, allPrimaryButtons, allRoutes, allSecondaryButtons, oreganoSettings };
