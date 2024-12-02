import { ComponentOptionsMixin } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes as ExtractPropTypes_2 } from 'vue';
import { PropType as PropType_2 } from 'vue';
import { PublicProps } from 'vue';
import { default as TippyPopover } from './common/TippyPopover.vue';

export declare const BpmnMocker: DefineComponent<    {
xml: {
type: PropType_2<string>;
default: undefined;
};
loading: {
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
}, {
createNewProcess: (xml: string) => Promise<void>;
setSequenceFlows: (flows: string[]) => void;
toggleLang: (lang?: "zh_CN" | "en_US") => void;
toggleTheme: (theme?: "dark" | "light") => void;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"mocker-init": (...args: any[]) => void;
"mocker-destroy": (...args: any[]) => void;
}, string, PublicProps, Readonly<ExtractPropTypes_2<    {
xml: {
type: PropType_2<string>;
default: undefined;
};
loading: {
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
}>> & {
"onMocker-init"?: ((...args: any[]) => any) | undefined;
"onMocker-destroy"?: ((...args: any[]) => any) | undefined;
}, {
local: "en_US" | "zh_CN";
xml: string;
loading: boolean;
theme: "dark" | "light";
}, {}>;

export declare const BpmnPresetViewer: DefineComponent<    {
procInstId: {
type: PropType_2<string>;
required: true;
};
modelKey: {
type: PropType_2<string>;
required: true;
};
theme: {
type: PropType_2<"dark" | "light">;
default: string;
};
local: {
type: PropType_2<"en_US" | "zh_CN">;
default: string;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
toolbar: {
type: PropType_2<boolean>;
default: boolean;
};
showDownload: {
type: PropType_2<boolean>;
default: boolean;
};
fileName: {
type: PropType_2<string>;
default: string;
};
}, {
reloadViewerXML: (modelKey?: string, procInstId?: string) => Promise<void>;
downloadProcess: (type?: "xml" | "bpmn" | "svg" | "png", fName?: string) => Promise<void>;
toggleTheme: (theme?: "dark" | "light") => void;
toggleLang: (lang?: "zh_CN" | "en_US") => void;
downloadProcessAsPng: (name: any) => Promise<void>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"viewer-init": (...args: any[]) => void;
"element-hover": (...args: any[]) => void;
"data-change": (...args: any[]) => void;
}, string, PublicProps, Readonly<ExtractPropTypes_2<    {
procInstId: {
type: PropType_2<string>;
required: true;
};
modelKey: {
type: PropType_2<string>;
required: true;
};
theme: {
type: PropType_2<"dark" | "light">;
default: string;
};
local: {
type: PropType_2<"en_US" | "zh_CN">;
default: string;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
toolbar: {
type: PropType_2<boolean>;
default: boolean;
};
showDownload: {
type: PropType_2<boolean>;
default: boolean;
};
fileName: {
type: PropType_2<string>;
default: string;
};
}>> & {
"onViewer-init"?: ((...args: any[]) => any) | undefined;
"onElement-hover"?: ((...args: any[]) => any) | undefined;
"onData-change"?: ((...args: any[]) => any) | undefined;
}, {
local: "en_US" | "zh_CN";
theme: "dark" | "light";
translatePrefix: string;
toolbar: boolean;
showDownload: boolean;
fileName: string;
}, {}>;

export declare const BpmnViewer: DefineComponent<    {
xml: {
type: PropType_2<string>;
default: undefined;
};
theme: {
type: PropType_2<"dark" | "light">;
default: string;
};
local: {
type: PropType_2<"en_US" | "zh_CN">;
default: string;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
loading: {
type: PropType_2<boolean>;
default: boolean;
};
toolbar: {
type: PropType_2<boolean>;
default: boolean;
};
inPreset: {
type: PropType_2<boolean>;
default: boolean;
};
showDownload: {
type: PropType_2<boolean>;
default: boolean;
};
fileName: {
type: PropType_2<string>;
default: string;
};
}, {
createNewProcess: (xml: string) => Promise<void>;
setPassedNodes: (nodeIds: string[]) => void;
setActiveNodes: (nodeIds: string[]) => void;
setProcessingMarker: (nodeIds: string[]) => void;
getModeler: () => any;
toggleLang: (lang?: "zh_CN" | "en_US") => void;
toggleTheme: (theme?: "dark" | "light") => void;
downloadProcess: (type?: "xml" | "bpmn" | "svg" | "png", fName?: string) => Promise<void>;
downloadProcessAsPng: (name: any) => Promise<void>;
}, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {
"viewer-init": (...args: any[]) => void;
"viewer-destroy": (...args: any[]) => void;
"element-hover": (...args: any[]) => void;
}, string, PublicProps, Readonly<ExtractPropTypes_2<    {
xml: {
type: PropType_2<string>;
default: undefined;
};
theme: {
type: PropType_2<"dark" | "light">;
default: string;
};
local: {
type: PropType_2<"en_US" | "zh_CN">;
default: string;
};
translatePrefix: {
type: PropType_2<string>;
default: string;
};
loading: {
type: PropType_2<boolean>;
default: boolean;
};
toolbar: {
type: PropType_2<boolean>;
default: boolean;
};
inPreset: {
type: PropType_2<boolean>;
default: boolean;
};
showDownload: {
type: PropType_2<boolean>;
default: boolean;
};
fileName: {
type: PropType_2<string>;
default: string;
};
}>> & {
"onViewer-init"?: ((...args: any[]) => any) | undefined;
"onViewer-destroy"?: ((...args: any[]) => any) | undefined;
"onElement-hover"?: ((...args: any[]) => any) | undefined;
}, {
local: "en_US" | "zh_CN";
xml: string;
loading: boolean;
theme: "dark" | "light";
translatePrefix: string;
toolbar: boolean;
inPreset: boolean;
showDownload: boolean;
fileName: string;
}, {}>;

export { TippyPopover }

export { }
