import { AllowedComponentProps } from 'vue';
import { ComponentCustomProperties } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentInternalInstance } from 'vue';
import { ComponentOptionsBase } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { CreateComponentPublicInstanceWithMixins } from 'vue';
import { DebuggerEvent } from 'vue';
import { DefineComponent } from 'vue';
import { getLocalStorage as getLfLocalStorage } from '@dragon-flow/shared/utils';
import { GlobalComponents } from 'vue';
import { GlobalDirectives } from 'vue';
import { LogicFlow } from '@logicflow/core';
import { nextTick as nextTick_2 } from 'vue';
import { OnCleanup } from '@vue/reactivity';
import { Options } from '@logicflow/core';
import { Plugin as Plugin_2 } from 'vue';
import { PropType as PropType_2 } from 'vue';
import { PublicProps } from 'vue';
import { setLocalStorage as setLfLocalStorage } from '@dragon-flow/shared/utils';
import { ShallowRef } from 'vue';
import { ShallowUnwrapRef } from 'vue';
import { Slot } from 'vue';
import { VNodeProps } from 'vue';
import { WatchOptions } from 'vue';
import { WatchStopHandle } from 'vue';

declare function exportNewData(): {
    nodes: any[];
    edges: any[];
} | undefined;

export { getLfLocalStorage }

export declare const Icons: Plugin_2;

declare function importNewData(data: LogicFlow.GraphData): void;

export declare const IntegralDesigner: DefineComponent<globalThis.ExtractPropTypes<{
data: {
type: PropType_2<LogicFlow.GraphConfigData>;
default: () => null;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
useOpen: {
type: PropType_2<boolean>;
default: boolean;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
props: {
type: PropType_2<Options.Common>;
default: () => null;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
panel: {
type: PropType_2<boolean>;
default: boolean;
};
language: {
type: PropType_2<Language>;
default: string;
};
theme: {
type: PropType_2<Theme>;
default: string;
};
fileName: {
type: PropType_2<string>;
default: string;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
timeout: {
type: PropType_2<number>;
default: number;
};
}>, {
provideInstance: ShallowRef<LogicFlow | undefined, LogicFlow | undefined>;
designer: ShallowRef<globalThis.ComponentPublicInstance<CreateComponentPublicInstanceWithMixins<Readonly<globalThis.ExtractPropTypes<{
data: {
type: PropType_2<LogicFlow.GraphConfigData>;
default: () => null;
};
props: {
type: PropType_2<Options.Common>;
default: () => null;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
}>> & Readonly<{
onInit?: ((lf: any) => any) | undefined;
}>, {
renderData: (data: LogicFlow.GraphConfigData) => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
init: (lf: any) => void;
}, PublicProps, {
data: LogicFlow.GraphConfigData;
editable: boolean;
minimap: boolean;
props: Options.Common;
}, true, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<globalThis.ExtractPropTypes<{
data: {
type: PropType_2<LogicFlow.GraphConfigData>;
default: () => null;
};
props: {
type: PropType_2<Options.Common>;
default: () => null;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
}>> & Readonly<{
onInit?: ((lf: any) => any) | undefined;
}>, {
renderData: (data: LogicFlow.GraphConfigData) => void;
}, {}, {}, {}, {
data: LogicFlow.GraphConfigData;
editable: boolean;
minimap: boolean;
props: Options.Common;
}>, {
renderData: (data: LogicFlow.GraphConfigData) => void;
}, {}, {}, {}> | undefined, globalThis.ComponentPublicInstance<CreateComponentPublicInstanceWithMixins<Readonly<globalThis.ExtractPropTypes<{
data: {
type: PropType_2<LogicFlow.GraphConfigData>;
default: () => null;
};
props: {
type: PropType_2<Options.Common>;
default: () => null;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
}>> & Readonly<{
onInit?: ((lf: any) => any) | undefined;
}>, {
renderData: (data: LogicFlow.GraphConfigData) => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
init: (lf: any) => void;
}, PublicProps, {
data: LogicFlow.GraphConfigData;
editable: boolean;
minimap: boolean;
props: Options.Common;
}, true, {}, {}, GlobalComponents, GlobalDirectives, string, {}, any, ComponentProvideOptions, {
P: {};
B: {};
D: {};
C: {};
M: {};
Defaults: {};
}, Readonly<globalThis.ExtractPropTypes<{
data: {
type: PropType_2<LogicFlow.GraphConfigData>;
default: () => null;
};
props: {
type: PropType_2<Options.Common>;
default: () => null;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
}>> & Readonly<{
onInit?: ((lf: any) => any) | undefined;
}>, {
renderData: (data: LogicFlow.GraphConfigData) => void;
}, {}, {}, {}, {
data: LogicFlow.GraphConfigData;
editable: boolean;
minimap: boolean;
props: Options.Common;
}>, {
renderData: (data: LogicFlow.GraphConfigData) => void;
}, {}, {}, {}> | undefined>;
toolbar: ShallowRef<({
$: ComponentInternalInstance;
$data: {};
$props: Partial<{
lf: LogicFlow;
editable: boolean;
useSave: boolean;
useOpen: boolean;
disabled: boolean;
translatePrefix: string;
fileName: string;
}> & Omit<{
readonly editable: boolean;
readonly useSave: boolean;
readonly useOpen: boolean;
readonly disabled: boolean;
readonly translatePrefix: string;
readonly fileName: string;
readonly lf?: LogicFlow | undefined;
} & VNodeProps & AllowedComponentProps & ComponentCustomProps, "lf" | "editable" | "useSave" | "useOpen" | "disabled" | "translatePrefix" | "fileName">;
$attrs: {
[x: string]: unknown;
};
$refs: {
[x: string]: unknown;
};
$slots: Readonly<{
[name: string]: Slot<any> | undefined;
}>;
$root: ComponentPublicInstance | null;
$parent: ComponentPublicInstance | null;
$host: Element | null;
$emit: (event: string, ...args: any[]) => void;
$el: any;
$options: ComponentOptionsBase<Readonly<globalThis.ExtractPropTypes<{
lf: {
type: PropType_2<LogicFlow>;
default: () => undefined;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
useOpen: {
type: PropType_2<boolean>;
default: boolean;
};
disabled: {
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
}>> & Readonly<{}>, {
importXML: (xmlStr: string) => Promise<void>;
downloadProcessAsSvg: () => void;
downloadProcessAsPng: () => void;
zoomReset: () => void;
toggleMinimap: (status?: boolean) => void;
toggleFullscreen: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, {
lf: LogicFlow;
editable: boolean;
useSave: boolean;
useOpen: boolean;
disabled: boolean;
translatePrefix: string;
fileName: string;
}, {}, string, {}, GlobalComponents, GlobalDirectives, string, ComponentProvideOptions> & {
beforeCreate?: (() => void) | (() => void)[];
created?: (() => void) | (() => void)[];
beforeMount?: (() => void) | (() => void)[];
mounted?: (() => void) | (() => void)[];
beforeUpdate?: (() => void) | (() => void)[];
updated?: (() => void) | (() => void)[];
activated?: (() => void) | (() => void)[];
deactivated?: (() => void) | (() => void)[];
beforeDestroy?: (() => void) | (() => void)[];
beforeUnmount?: (() => void) | (() => void)[];
destroyed?: (() => void) | (() => void)[];
unmounted?: (() => void) | (() => void)[];
renderTracked?: ((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[];
renderTriggered?: ((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[];
errorCaptured?: ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void)[];
};
$forceUpdate: () => void;
$nextTick: nextTick_2;
$watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, OnCleanup]) => any : (...args: [any, any, OnCleanup]) => any, options?: WatchOptions): WatchStopHandle;
} & Readonly<{
lf: LogicFlow;
editable: boolean;
useSave: boolean;
useOpen: boolean;
disabled: boolean;
translatePrefix: string;
fileName: string;
}> & Omit<Readonly<globalThis.ExtractPropTypes<{
lf: {
type: PropType_2<LogicFlow>;
default: () => undefined;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
useOpen: {
type: PropType_2<boolean>;
default: boolean;
};
disabled: {
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
}>> & Readonly<{}>, "importXML" | "downloadProcessAsSvg" | "downloadProcessAsPng" | "zoomReset" | "toggleMinimap" | "toggleFullscreen" | ("lf" | "editable" | "useSave" | "useOpen" | "disabled" | "translatePrefix" | "fileName")> & ShallowUnwrapRef<    {
importXML: (xmlStr: string) => Promise<void>;
downloadProcessAsSvg: () => void;
downloadProcessAsPng: () => void;
zoomReset: () => void;
toggleMinimap: (status?: boolean) => void;
toggleFullscreen: () => void;
}> & {} & ComponentCustomProperties & {} & {
$slots: {
default?(_: {}): any;
};
}) | undefined, ({
$: ComponentInternalInstance;
$data: {};
$props: Partial<{
lf: LogicFlow;
editable: boolean;
useSave: boolean;
useOpen: boolean;
disabled: boolean;
translatePrefix: string;
fileName: string;
}> & Omit<{
readonly editable: boolean;
readonly useSave: boolean;
readonly useOpen: boolean;
readonly disabled: boolean;
readonly translatePrefix: string;
readonly fileName: string;
readonly lf?: LogicFlow | undefined;
} & VNodeProps & AllowedComponentProps & ComponentCustomProps, "lf" | "editable" | "useSave" | "useOpen" | "disabled" | "translatePrefix" | "fileName">;
$attrs: {
[x: string]: unknown;
};
$refs: {
[x: string]: unknown;
};
$slots: Readonly<{
[name: string]: Slot<any> | undefined;
}>;
$root: ComponentPublicInstance | null;
$parent: ComponentPublicInstance | null;
$host: Element | null;
$emit: (event: string, ...args: any[]) => void;
$el: any;
$options: ComponentOptionsBase<Readonly<globalThis.ExtractPropTypes<{
lf: {
type: PropType_2<LogicFlow>;
default: () => undefined;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
useOpen: {
type: PropType_2<boolean>;
default: boolean;
};
disabled: {
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
}>> & Readonly<{}>, {
importXML: (xmlStr: string) => Promise<void>;
downloadProcessAsSvg: () => void;
downloadProcessAsPng: () => void;
zoomReset: () => void;
toggleMinimap: (status?: boolean) => void;
toggleFullscreen: () => void;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, {
lf: LogicFlow;
editable: boolean;
useSave: boolean;
useOpen: boolean;
disabled: boolean;
translatePrefix: string;
fileName: string;
}, {}, string, {}, GlobalComponents, GlobalDirectives, string, ComponentProvideOptions> & {
beforeCreate?: (() => void) | (() => void)[];
created?: (() => void) | (() => void)[];
beforeMount?: (() => void) | (() => void)[];
mounted?: (() => void) | (() => void)[];
beforeUpdate?: (() => void) | (() => void)[];
updated?: (() => void) | (() => void)[];
activated?: (() => void) | (() => void)[];
deactivated?: (() => void) | (() => void)[];
beforeDestroy?: (() => void) | (() => void)[];
beforeUnmount?: (() => void) | (() => void)[];
destroyed?: (() => void) | (() => void)[];
unmounted?: (() => void) | (() => void)[];
renderTracked?: ((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[];
renderTriggered?: ((e: DebuggerEvent) => void) | ((e: DebuggerEvent) => void)[];
errorCaptured?: ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void) | ((err: unknown, instance: ComponentPublicInstance | null, info: string) => boolean | void)[];
};
$forceUpdate: () => void;
$nextTick: nextTick_2;
$watch<T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (...args: [R, R, OnCleanup]) => any : (...args: [any, any, OnCleanup]) => any, options?: WatchOptions): WatchStopHandle;
} & Readonly<{
lf: LogicFlow;
editable: boolean;
useSave: boolean;
useOpen: boolean;
disabled: boolean;
translatePrefix: string;
fileName: string;
}> & Omit<Readonly<globalThis.ExtractPropTypes<{
lf: {
type: PropType_2<LogicFlow>;
default: () => undefined;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
useOpen: {
type: PropType_2<boolean>;
default: boolean;
};
disabled: {
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
}>> & Readonly<{}>, "importXML" | "downloadProcessAsSvg" | "downloadProcessAsPng" | "zoomReset" | "toggleMinimap" | "toggleFullscreen" | ("lf" | "editable" | "useSave" | "useOpen" | "disabled" | "translatePrefix" | "fileName")> & ShallowUnwrapRef<    {
importXML: (xmlStr: string) => Promise<void>;
downloadProcessAsSvg: () => void;
downloadProcessAsPng: () => void;
zoomReset: () => void;
toggleMinimap: (status?: boolean) => void;
toggleFullscreen: () => void;
}> & {} & ComponentCustomProperties & {} & {
$slots: {
default?(_: {}): any;
};
}) | undefined>;
toggleTheme: typeof toggleTheme;
toggleLang: typeof toggleLang;
togglePanel: typeof togglePanel;
importNewData: typeof importNewData;
exportNewData: typeof exportNewData;
}, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
dataChanged: (...args: any[]) => void;
}, string, PublicProps, Readonly<globalThis.ExtractPropTypes<{
data: {
type: PropType_2<LogicFlow.GraphConfigData>;
default: () => null;
};
useSave: {
type: PropType_2<boolean>;
default: boolean;
};
useOpen: {
type: PropType_2<boolean>;
default: boolean;
};
editable: {
type: PropType_2<boolean>;
default: boolean;
};
props: {
type: PropType_2<Options.Common>;
default: () => null;
};
minimap: {
type: PropType_2<boolean>;
default: undefined;
};
panel: {
type: PropType_2<boolean>;
default: boolean;
};
language: {
type: PropType_2<Language>;
default: string;
};
theme: {
type: PropType_2<Theme>;
default: string;
};
fileName: {
type: PropType_2<string>;
default: string;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
timeout: {
type: PropType_2<number>;
default: number;
};
}>> & Readonly<{
onDataChanged?: ((...args: any[]) => any) | undefined;
}>, {
data: LogicFlow.GraphConfigData;
editable: boolean;
useSave: boolean;
useOpen: boolean;
translatePrefix: string;
fileName: string;
minimap: boolean;
props: Options.Common;
panel: boolean;
language: Language;
theme: Theme;
timeout: number;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

declare type Language = 'zh_CN' | 'en_US';

export { setLfLocalStorage }

/**
 * @desc index
 * @author DragonTeam <https://www.bpmport.com>
 * @since 2024/7/31 下午3:52
 */
declare type Theme = 'dark' | 'light';

declare function toggleLang(lang?: Language): void;

declare function togglePanel(state?: boolean): void;

declare function toggleTheme(t?: Theme): void;

export { }


declare namespace ui {
    let displayName: string;
    let props: {
        mode: StringConstructor;
        appear: BooleanConstructor;
        persisted: BooleanConstructor;
        onBeforeEnter: (ArrayConstructor | FunctionConstructor)[];
        onEnter: (ArrayConstructor | FunctionConstructor)[];
        onAfterEnter: (ArrayConstructor | FunctionConstructor)[];
        onEnterCancelled: (ArrayConstructor | FunctionConstructor)[];
        onBeforeLeave: (ArrayConstructor | FunctionConstructor)[];
        onLeave: (ArrayConstructor | FunctionConstructor)[];
        onAfterLeave: (ArrayConstructor | FunctionConstructor)[];
        onLeaveCancelled: (ArrayConstructor | FunctionConstructor)[];
        onBeforeAppear: (ArrayConstructor | FunctionConstructor)[];
        onAppear: (ArrayConstructor | FunctionConstructor)[];
        onAfterAppear: (ArrayConstructor | FunctionConstructor)[];
        onAppearCancelled: (ArrayConstructor | FunctionConstructor)[];
    } & {
        name: StringConstructor;
        type: StringConstructor;
        css: {
            type: BooleanConstructor;
            default: boolean;
        };
        duration: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        enterFromClass: StringConstructor;
        enterActiveClass: StringConstructor;
        enterToClass: StringConstructor;
        appearFromClass: StringConstructor;
        appearActiveClass: StringConstructor;
        appearToClass: StringConstructor;
        leaveFromClass: StringConstructor;
        leaveActiveClass: StringConstructor;
        leaveToClass: StringConstructor;
    };
}


declare namespace Ai {
    function beforeMount(e: any, { value: t }: {
        value: any;
    }, { transition: n }: {
        transition: any;
    }): void;
    function mounted(e: any, { value: t }: {
        value: any;
    }, { transition: n }: {
        transition: any;
    }): void;
    function updated(e: any, { value: t, oldValue: n }: {
        value: any;
        oldValue: any;
    }, { transition: o }: {
        transition: any;
    }): void;
    function beforeUnmount(e: any, { value: t }: {
        value: any;
    }): void;
}

declare namespace HJ {
    function install(e: any): void;
}

