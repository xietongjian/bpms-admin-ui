import { withInstall } from '#/utils';
import codeEditor from './src/CodeEditor.vue';
import jsonPreview from './src/json-preview/JsonPreview.vue';
import markdownPreview from './src/markdown-preview/MarkdownPreview.vue';

export const CodeEditor = withInstall(codeEditor);
export const JsonPreview = withInstall(jsonPreview);
export const MarkdownPreview = withInstall(markdownPreview);

export * from './src/typing';
