import { ComponentOptionsMixin } from 'vue';
import { default as default_2 } from 'bpmn-js/lib/Modeler';
import { DefineComponent } from 'vue';
import { PropType as PropType_2 } from 'vue';
import { PublicProps } from 'vue';
import { ShallowRef } from 'vue';

declare const __VLS_component: DefineComponent<    {
xml: {
type: PropType_2<string>;
default: undefined;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
theme: {
type: PropType_2<"dark" | "light">;
default: string;
};
local: {
type: PropType_2<"en_US" | "zh_CN">;
default: string;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
panel: {
type: PropType_2<boolean>;
default: boolean;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
fileName: {
type: PropType_2<string>;
default: string;
};
timeout: {
type: PropType_2<number>;
default: number;
};
}, {
provideModeler: ShallowRef<default_2<null> | undefined>;
toggleLang: (lang?: "zh_CN" | "en_US") => void;
toggleTheme: (theme?: "dark" | "light") => void;
togglePanel: typeof togglePanel;
createNewProcess: (xml?: string) => Promise<void> | undefined;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"xml-changed": (...args: any[]) => void;
}, string, PublicProps, Readonly<globalThis.ExtractPropTypes<{
xml: {
type: PropType_2<string>;
default: undefined;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
theme: {
type: PropType_2<"dark" | "light">;
default: string;
};
local: {
type: PropType_2<"en_US" | "zh_CN">;
default: string;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
panel: {
type: PropType_2<boolean>;
default: boolean;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
fileName: {
type: PropType_2<string>;
default: string;
};
timeout: {
type: PropType_2<number>;
default: number;
};
}>> & {
"onXml-changed"?: ((...args: any[]) => any) | undefined;
}, {
translatePrefix: string;
local: "en_US" | "zh_CN";
fileName: string;
xml: string;
minimap: boolean;
useSave: boolean;
theme: "dark" | "light";
panel: boolean;
timeout: number;
}, {}>;

declare function __VLS_template(): {
    toolbar?(_: {}): any;
    designer?(_: {}): any;
};

declare type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};

export declare const IntegralDesigner: __VLS_WithTemplateSlots<typeof __VLS_component, ReturnType<typeof __VLS_template>>;

declare function togglePanel(state?: boolean): void;

export { }
