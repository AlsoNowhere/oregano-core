import { TMintContent } from "mint";
export declare class MainButton {
    name: string;
    title: string;
    icon: string;
    disabled: (() => boolean) | false;
    condition: (() => boolean) | true;
    extraButtonLabel?: () => TMintContent;
    onClick: () => void;
    constructor(name: string, title: string, icon: string, onClick: () => void, options?: {
        disabled?: () => boolean;
        condition?: () => boolean;
        extraButtonLabel?: () => TMintContent;
    });
}
