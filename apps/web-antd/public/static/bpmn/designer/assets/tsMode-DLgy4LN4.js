var e;import{t,m as i}from"./index-DRKYQZPL.js";import"./vue-BUaGmb0L.js";import"./bpmn-BFVEk1VE.js";import"./highlight.js-DntyhHW_.js";import"./arco-design-BaQ2FBw6.js";
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.47.0(69991d66135e4a1fc1cf0b1ac4ad25d429866a0d)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/var s=Object.defineProperty,r=Object.getOwnPropertyDescriptor,n=Object.getOwnPropertyNames,o=Object.prototype.hasOwnProperty,a={};((e,t,i,a)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let l of n(t))o.call(e,l)||l===i||s(e,l,{get:()=>t[l],enumerable:!(a=r(t,l))||a.enumerable})})(a,i,"default");var l=class{constructor(e,t){this._modeId=e,this._defaults=t,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((()=>this._stopWorker())),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((()=>this._updateExtraLibs()))}dispose(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}async _updateExtraLibs(){if(!this._worker)return;const e=++this._updateExtraLibsToken,t=await this._worker.getProxy();this._updateExtraLibsToken===e&&t.updateExtraLibs(this._defaults.getExtraLibs())}_getClient(){return this._client||(this._client=(async()=>(this._worker=a.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath,inlayHintsOptions:this._defaults.inlayHintsOptions}}),this._defaults.getEagerModelSync()?await this._worker.withSyncedResources(a.editor.getModels().filter((e=>e.getLanguageId()===this._modeId)).map((e=>e.uri))):await this._worker.getProxy()))()),this._client}async getLanguageServiceWorker(...e){const t=await this._getClient();return this._worker&&await this._worker.withSyncedResources(e),t}},c={};function d(e,t,i=0){if("string"==typeof e)return e;if(void 0===e)return"";let s="";if(i){s+=t;for(let e=0;e<i;e++)s+="  "}if(s+=e.messageText,i++,e.next)for(const r of e.next)s+=d(r,t,i);return s}function u(e){return e?e.map((e=>e.text)).join(""):""}c["lib.d.ts"]=!0,c["lib.decorators.d.ts"]=!0,c["lib.decorators.legacy.d.ts"]=!0,c["lib.dom.d.ts"]=!0,c["lib.dom.iterable.d.ts"]=!0,c["lib.es2015.collection.d.ts"]=!0,c["lib.es2015.core.d.ts"]=!0,c["lib.es2015.d.ts"]=!0,c["lib.es2015.generator.d.ts"]=!0,c["lib.es2015.iterable.d.ts"]=!0,c["lib.es2015.promise.d.ts"]=!0,c["lib.es2015.proxy.d.ts"]=!0,c["lib.es2015.reflect.d.ts"]=!0,c["lib.es2015.symbol.d.ts"]=!0,c["lib.es2015.symbol.wellknown.d.ts"]=!0,c["lib.es2016.array.include.d.ts"]=!0,c["lib.es2016.d.ts"]=!0,c["lib.es2016.full.d.ts"]=!0,c["lib.es2017.d.ts"]=!0,c["lib.es2017.full.d.ts"]=!0,c["lib.es2017.intl.d.ts"]=!0,c["lib.es2017.object.d.ts"]=!0,c["lib.es2017.sharedmemory.d.ts"]=!0,c["lib.es2017.string.d.ts"]=!0,c["lib.es2017.typedarrays.d.ts"]=!0,c["lib.es2018.asyncgenerator.d.ts"]=!0,c["lib.es2018.asynciterable.d.ts"]=!0,c["lib.es2018.d.ts"]=!0,c["lib.es2018.full.d.ts"]=!0,c["lib.es2018.intl.d.ts"]=!0,c["lib.es2018.promise.d.ts"]=!0,c["lib.es2018.regexp.d.ts"]=!0,c["lib.es2019.array.d.ts"]=!0,c["lib.es2019.d.ts"]=!0,c["lib.es2019.full.d.ts"]=!0,c["lib.es2019.intl.d.ts"]=!0,c["lib.es2019.object.d.ts"]=!0,c["lib.es2019.string.d.ts"]=!0,c["lib.es2019.symbol.d.ts"]=!0,c["lib.es2020.bigint.d.ts"]=!0,c["lib.es2020.d.ts"]=!0,c["lib.es2020.date.d.ts"]=!0,c["lib.es2020.full.d.ts"]=!0,c["lib.es2020.intl.d.ts"]=!0,c["lib.es2020.number.d.ts"]=!0,c["lib.es2020.promise.d.ts"]=!0,c["lib.es2020.sharedmemory.d.ts"]=!0,c["lib.es2020.string.d.ts"]=!0,c["lib.es2020.symbol.wellknown.d.ts"]=!0,c["lib.es2021.d.ts"]=!0,c["lib.es2021.full.d.ts"]=!0,c["lib.es2021.intl.d.ts"]=!0,c["lib.es2021.promise.d.ts"]=!0,c["lib.es2021.string.d.ts"]=!0,c["lib.es2021.weakref.d.ts"]=!0,c["lib.es2022.array.d.ts"]=!0,c["lib.es2022.d.ts"]=!0,c["lib.es2022.error.d.ts"]=!0,c["lib.es2022.full.d.ts"]=!0,c["lib.es2022.intl.d.ts"]=!0,c["lib.es2022.object.d.ts"]=!0,c["lib.es2022.regexp.d.ts"]=!0,c["lib.es2022.sharedmemory.d.ts"]=!0,c["lib.es2022.string.d.ts"]=!0,c["lib.es2023.array.d.ts"]=!0,c["lib.es2023.d.ts"]=!0,c["lib.es2023.full.d.ts"]=!0,c["lib.es5.d.ts"]=!0,c["lib.es6.d.ts"]=!0,c["lib.esnext.d.ts"]=!0,c["lib.esnext.full.d.ts"]=!0,c["lib.esnext.intl.d.ts"]=!0,c["lib.scripthost.d.ts"]=!0,c["lib.webworker.d.ts"]=!0,c["lib.webworker.importscripts.d.ts"]=!0,c["lib.webworker.iterable.d.ts"]=!0;var g=class{constructor(e){this._worker=e}_textSpanToRange(e,t){let i=e.getPositionAt(t.start),s=e.getPositionAt(t.start+t.length),{lineNumber:r,column:n}=i,{lineNumber:o,column:a}=s;return{startLineNumber:r,startColumn:n,endLineNumber:o,endColumn:a}}},p=class{constructor(e){this._worker=e,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}isLibFile(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!c[e.path.slice(1)])}getOrCreateModel(e){const i=a.Uri.parse(e),s=a.editor.getModel(i);if(s)return s;if(this.isLibFile(i)&&this._hasFetchedLibFiles)return a.editor.createModel(this._libFiles[i.path.slice(1)],"typescript",i);const r=t.getExtraLibs()[e];return r?a.editor.createModel(r.content,"typescript",i):null}_containsLibFile(e){for(let t of e)if(this.isLibFile(t))return!0;return!1}async fetchLibFilesIfNecessary(e){this._containsLibFile(e)&&await this._fetchLibFiles()}_fetchLibFiles(){return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((e=>e.getLibFiles())).then((e=>{this._hasFetchedLibFiles=!0,this._libFiles=e}))),this._fetchLibFilesPromise}},m=class extends g{constructor(e,t,i,s){super(s),this._libFiles=e,this._defaults=t,this._selector=i,this._disposables=[],this._listener=Object.create(null);const r=e=>{if(e.getLanguageId()!==i)return;const t=()=>{const{onlyVisible:t}=this._defaults.getDiagnosticsOptions();t?e.isAttachedToEditor()&&this._doValidate(e):this._doValidate(e)};let s;const r=e.onDidChangeContent((()=>{clearTimeout(s),s=window.setTimeout(t,500)})),n=e.onDidChangeAttached((()=>{const{onlyVisible:i}=this._defaults.getDiagnosticsOptions();i&&(e.isAttachedToEditor()?t():a.editor.setModelMarkers(e,this._selector,[]))}));this._listener[e.uri.toString()]={dispose(){r.dispose(),n.dispose(),clearTimeout(s)}},t()},n=e=>{a.editor.setModelMarkers(e,this._selector,[]);const t=e.uri.toString();this._listener[t]&&(this._listener[t].dispose(),delete this._listener[t])};this._disposables.push(a.editor.onDidCreateModel((e=>r(e)))),this._disposables.push(a.editor.onWillDisposeModel(n)),this._disposables.push(a.editor.onDidChangeModelLanguage((e=>{n(e.model),r(e.model)}))),this._disposables.push({dispose(){for(const e of a.editor.getModels())n(e)}});const o=()=>{for(const e of a.editor.getModels())n(e),r(e)};this._disposables.push(this._defaults.onDidChange(o)),this._disposables.push(this._defaults.onDidExtraLibsChange(o)),a.editor.getModels().forEach((e=>r(e)))}dispose(){this._disposables.forEach((e=>e&&e.dispose())),this._disposables=[]}async _doValidate(e){const t=await this._worker(e.uri);if(e.isDisposed())return;const i=[],{noSyntaxValidation:s,noSemanticValidation:r,noSuggestionDiagnostics:n}=this._defaults.getDiagnosticsOptions();s||i.push(t.getSyntacticDiagnostics(e.uri.toString())),r||i.push(t.getSemanticDiagnostics(e.uri.toString())),n||i.push(t.getSuggestionDiagnostics(e.uri.toString()));const o=await Promise.all(i);if(!o||e.isDisposed())return;const l=o.reduce(((e,t)=>t.concat(e)),[]).filter((e=>-1===(this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code))),c=l.map((e=>e.relatedInformation||[])).reduce(((e,t)=>t.concat(e)),[]).map((e=>e.file?a.Uri.parse(e.file.fileName):null));await this._libFiles.fetchLibFilesIfNecessary(c),e.isDisposed()||a.editor.setModelMarkers(e,this._selector,l.map((t=>this._convertDiagnostics(e,t))))}_convertDiagnostics(e,t){const i=t.start||0,s=t.length||1,{lineNumber:r,column:n}=e.getPositionAt(i),{lineNumber:o,column:l}=e.getPositionAt(i+s),c=[];return t.reportsUnnecessary&&c.push(a.MarkerTag.Unnecessary),t.reportsDeprecated&&c.push(a.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:r,startColumn:n,endLineNumber:o,endColumn:l,message:d(t.messageText,"\n"),code:t.code.toString(),tags:c,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}}_convertRelatedInformation(e,t){if(!t)return[];const i=[];return t.forEach((t=>{let s=e;if(t.file&&(s=this._libFiles.getOrCreateModel(t.file.fileName)),!s)return;const r=t.start||0,n=t.length||1,{lineNumber:o,column:a}=s.getPositionAt(r),{lineNumber:l,column:c}=s.getPositionAt(r+n);i.push({resource:s.uri,startLineNumber:o,startColumn:a,endLineNumber:l,endColumn:c,message:d(t.messageText,"\n")})})),i}_tsDiagnosticCategoryToMarkerSeverity(e){switch(e){case 1:return a.MarkerSeverity.Error;case 3:return a.MarkerSeverity.Info;case 0:return a.MarkerSeverity.Warning;case 2:return a.MarkerSeverity.Hint}return a.MarkerSeverity.Info}},h=class e extends g{get triggerCharacters(){return["."]}async provideCompletionItems(t,i,s,r){const n=t.getWordUntilPosition(i),o=new a.Range(i.lineNumber,n.startColumn,i.lineNumber,n.endColumn),l=t.uri,c=t.getOffsetAt(i),d=await this._worker(l);if(t.isDisposed())return;const u=await d.getCompletionsAtPosition(l.toString(),c);if(!u||t.isDisposed())return;return{suggestions:u.entries.map((s=>{let r=o;if(s.replacementSpan){const e=t.getPositionAt(s.replacementSpan.start),i=t.getPositionAt(s.replacementSpan.start+s.replacementSpan.length);r=new a.Range(e.lineNumber,e.column,i.lineNumber,i.column)}const n=[];return void 0!==s.kindModifiers&&-1!==s.kindModifiers.indexOf("deprecated")&&n.push(a.languages.CompletionItemTag.Deprecated),{uri:l,position:i,offset:c,range:r,label:s.name,insertText:s.name,sortText:s.sortText,kind:e.convertKind(s.kind),tags:n}}))}}async resolveCompletionItem(t,i){const s=t,r=s.uri,n=s.position,o=s.offset,a=await this._worker(r),l=await a.getCompletionEntryDetails(r.toString(),o,s.label);return l?{uri:r,position:n,label:l.name,kind:e.convertKind(l.kind),detail:u(l.displayParts),documentation:{value:e.createDocumentationString(l)}}:s}static convertKind(e){switch(e){case v.primitiveType:case v.keyword:return a.languages.CompletionItemKind.Keyword;case v.variable:case v.localVariable:return a.languages.CompletionItemKind.Variable;case v.memberVariable:case v.memberGetAccessor:case v.memberSetAccessor:return a.languages.CompletionItemKind.Field;case v.function:case v.memberFunction:case v.constructSignature:case v.callSignature:case v.indexSignature:return a.languages.CompletionItemKind.Function;case v.enum:return a.languages.CompletionItemKind.Enum;case v.module:return a.languages.CompletionItemKind.Module;case v.class:return a.languages.CompletionItemKind.Class;case v.interface:return a.languages.CompletionItemKind.Interface;case v.warning:return a.languages.CompletionItemKind.File}return a.languages.CompletionItemKind.Property}static createDocumentationString(e){let t=u(e.documentation);if(e.tags)for(const i of e.tags)t+=`\n\n${b(i)}`;return t}};function b(e){let t=`*@${e.name}*`;if("param"===e.name&&e.text){const[i,...s]=e.text;t+=`\`${i.text}\``,s.length>0&&(t+=` — ${s.map((e=>e.text)).join(" ")}`)}else Array.isArray(e.text)?t+=` — ${e.text.map((e=>e.text)).join(" ")}`:e.text&&(t+=` — ${e.text}`);return t}var f=class e extends g{constructor(){super(...arguments),this.signatureHelpTriggerCharacters=["(",","]}static _toSignatureHelpTriggerReason(e){switch(e.triggerKind){case a.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case a.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case a.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}}async provideSignatureHelp(t,i,s,r){const n=t.uri,o=t.getOffsetAt(i),a=await this._worker(n);if(t.isDisposed())return;const l=await a.getSignatureHelpItems(n.toString(),o,{triggerReason:e._toSignatureHelpTriggerReason(r)});if(!l||t.isDisposed())return;const c={activeSignature:l.selectedItemIndex,activeParameter:l.argumentIndex,signatures:[]};return l.items.forEach((e=>{const t={label:"",parameters:[]};t.documentation={value:u(e.documentation)},t.label+=u(e.prefixDisplayParts),e.parameters.forEach(((i,s,r)=>{const n=u(i.displayParts),o={label:n,documentation:{value:u(i.documentation)}};t.label+=n,t.parameters.push(o),s<r.length-1&&(t.label+=u(e.separatorDisplayParts))})),t.label+=u(e.suffixDisplayParts),c.signatures.push(t)})),{value:c,dispose(){}}}},_=class extends g{async provideHover(e,t,i){const s=e.uri,r=e.getOffsetAt(t),n=await this._worker(s);if(e.isDisposed())return;const o=await n.getQuickInfoAtPosition(s.toString(),r);if(!o||e.isDisposed())return;const a=u(o.documentation),l=o.tags?o.tags.map((e=>b(e))).join("  \n\n"):"",c=u(o.displayParts);return{range:this._textSpanToRange(e,o.textSpan),contents:[{value:"```typescript\n"+c+"\n```\n"},{value:a+(l?"\n\n"+l:"")}]}}},y=class extends g{async provideDocumentHighlights(e,t,i){const s=e.uri,r=e.getOffsetAt(t),n=await this._worker(s);if(e.isDisposed())return;const o=await n.getDocumentHighlights(s.toString(),r,[s.toString()]);return o&&!e.isDisposed()?o.flatMap((t=>t.highlightSpans.map((t=>({range:this._textSpanToRange(e,t.textSpan),kind:"writtenReference"===t.kind?a.languages.DocumentHighlightKind.Write:a.languages.DocumentHighlightKind.Text}))))):void 0}},w=class extends g{constructor(e,t){super(t),this._libFiles=e}async provideDefinition(e,t,i){const s=e.uri,r=e.getOffsetAt(t),n=await this._worker(s);if(e.isDisposed())return;const o=await n.getDefinitionAtPosition(s.toString(),r);if(!o||e.isDisposed())return;if(await this._libFiles.fetchLibFilesIfNecessary(o.map((e=>a.Uri.parse(e.fileName)))),e.isDisposed())return;const l=[];for(let a of o){const e=this._libFiles.getOrCreateModel(a.fileName);e&&l.push({uri:e.uri,range:this._textSpanToRange(e,a.textSpan)})}return l}},S=class extends g{constructor(e,t){super(t),this._libFiles=e}async provideReferences(e,t,i,s){const r=e.uri,n=e.getOffsetAt(t),o=await this._worker(r);if(e.isDisposed())return;const l=await o.getReferencesAtPosition(r.toString(),n);if(!l||e.isDisposed())return;if(await this._libFiles.fetchLibFilesIfNecessary(l.map((e=>a.Uri.parse(e.fileName)))),e.isDisposed())return;const c=[];for(let a of l){const e=this._libFiles.getOrCreateModel(a.fileName);e&&c.push({uri:e.uri,range:this._textSpanToRange(e,a.textSpan)})}return c}},x=class extends g{async provideDocumentSymbols(e,t){const i=e.uri,s=await this._worker(i);if(e.isDisposed())return;const r=await s.getNavigationTree(i.toString());if(!r||e.isDisposed())return;const n=(t,i)=>{var s;return{name:t.text,detail:"",kind:k[t.kind]||a.languages.SymbolKind.Variable,range:this._textSpanToRange(e,t.spans[0]),selectionRange:this._textSpanToRange(e,t.spans[0]),tags:[],children:null==(s=t.childItems)?void 0:s.map((e=>n(e,t.text))),containerName:i}};return r.childItems?r.childItems.map((e=>n(e))):[]}},v=((e=class{}).unknown="",e.keyword="keyword",e.script="script",e.module="module",e.class="class",e.interface="interface",e.type="type",e.enum="enum",e.variable="var",e.localVariable="local var",e.function="function",e.localFunction="local function",e.memberFunction="method",e.memberGetAccessor="getter",e.memberSetAccessor="setter",e.memberVariable="property",e.constructorImplementation="constructor",e.callSignature="call",e.indexSignature="index",e.constructSignature="construct",e.parameter="parameter",e.typeParameter="type parameter",e.primitiveType="primitive type",e.label="label",e.alias="alias",e.const="const",e.let="let",e.warning="warning",e),k=Object.create(null);k[v.module]=a.languages.SymbolKind.Module,k[v.class]=a.languages.SymbolKind.Class,k[v.enum]=a.languages.SymbolKind.Enum,k[v.interface]=a.languages.SymbolKind.Interface,k[v.memberFunction]=a.languages.SymbolKind.Method,k[v.memberVariable]=a.languages.SymbolKind.Property,k[v.memberGetAccessor]=a.languages.SymbolKind.Property,k[v.memberSetAccessor]=a.languages.SymbolKind.Property,k[v.variable]=a.languages.SymbolKind.Variable,k[v.const]=a.languages.SymbolKind.Variable,k[v.localVariable]=a.languages.SymbolKind.Variable,k[v.variable]=a.languages.SymbolKind.Variable,k[v.function]=a.languages.SymbolKind.Function,k[v.localFunction]=a.languages.SymbolKind.Function;var C,D,F=class extends g{static _convertOptions(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:2,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}}_convertTextChanges(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}}},I=class extends F{constructor(){super(...arguments),this.canFormatMultipleRanges=!1}async provideDocumentRangeFormattingEdits(e,t,i,s){const r=e.uri,n=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),o=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),a=await this._worker(r);if(e.isDisposed())return;const l=await a.getFormattingEditsForRange(r.toString(),n,o,F._convertOptions(i));return l&&!e.isDisposed()?l.map((t=>this._convertTextChanges(e,t))):void 0}},A=class extends F{get autoFormatTriggerCharacters(){return[";","}","\n"]}async provideOnTypeFormattingEdits(e,t,i,s,r){const n=e.uri,o=e.getOffsetAt(t),a=await this._worker(n);if(e.isDisposed())return;const l=await a.getFormattingEditsAfterKeystroke(n.toString(),o,i,F._convertOptions(s));return l&&!e.isDisposed()?l.map((t=>this._convertTextChanges(e,t))):void 0}},P=class extends F{async provideCodeActions(e,t,i,s){const r=e.uri,n=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),o=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),a=F._convertOptions(e.getOptions()),l=i.markers.filter((e=>e.code)).map((e=>e.code)).map(Number),c=await this._worker(r);if(e.isDisposed())return;const d=await c.getCodeFixesAtPosition(r.toString(),n,o,l,a);if(!d||e.isDisposed())return{actions:[],dispose:()=>{}};return{actions:d.filter((e=>0===e.changes.filter((e=>e.isNewFile)).length)).map((t=>this._tsCodeFixActionToMonacoCodeAction(e,i,t))),dispose:()=>{}}}_tsCodeFixActionToMonacoCodeAction(e,t,i){const s=[];for(const r of i.changes)for(const t of r.textChanges)s.push({resource:e.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(e,t.span),text:t.newText}});return{title:i.description,edit:{edits:s},diagnostics:t.markers,kind:"quickfix"}}},T=class extends g{constructor(e,t){super(t),this._libFiles=e}async provideRenameEdits(e,t,i,s){const r=e.uri,n=r.toString(),o=e.getOffsetAt(t),a=await this._worker(r);if(e.isDisposed())return;const l=await a.getRenameInfo(n,o,{allowRenameOfImportPath:!1});if(!1===l.canRename)return{edits:[],rejectReason:l.localizedErrorMessage};if(void 0!==l.fileToRename)throw new Error("Renaming files is not supported.");const c=await a.findRenameLocations(n,o,!1,!1,!1);if(!c||e.isDisposed())return;const d=[];for(const u of c){const e=this._libFiles.getOrCreateModel(u.fileName);if(!e)throw new Error(`Unknown file ${u.fileName}.`);d.push({resource:e.uri,versionId:void 0,textEdit:{range:this._textSpanToRange(e,u.textSpan),text:i}})}return{edits:d}}},L=class extends g{async provideInlayHints(e,t,i){const s=e.uri,r=s.toString(),n=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),o=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),a=await this._worker(s);if(e.isDisposed())return null;return{hints:(await a.provideInlayHints(r,n,o)).map((t=>({...t,label:t.text,position:e.getPositionAt(t.position),kind:this._convertHintKind(t.kind)}))),dispose:()=>{}}}_convertHintKind(e){return"Parameter"===e?a.languages.InlayHintKind.Parameter:a.languages.InlayHintKind.Type}};function O(e){D=R(e,"typescript")}function N(e){C=R(e,"javascript")}function K(){return new Promise(((e,t)=>{if(!C)return t("JavaScript not registered!");e(C)}))}function M(){return new Promise(((e,t)=>{if(!D)return t("TypeScript not registered!");e(D)}))}function R(e,t){const i=[],s=new l(t,e),r=(...e)=>s.getLanguageServiceWorker(...e),n=new p(r);return function(){const{modeConfiguration:s}=e;!function(e){for(;e.length;)e.pop().dispose()}(i),s.completionItems&&i.push(a.languages.registerCompletionItemProvider(t,new h(r))),s.signatureHelp&&i.push(a.languages.registerSignatureHelpProvider(t,new f(r))),s.hovers&&i.push(a.languages.registerHoverProvider(t,new _(r))),s.documentHighlights&&i.push(a.languages.registerDocumentHighlightProvider(t,new y(r))),s.definitions&&i.push(a.languages.registerDefinitionProvider(t,new w(n,r))),s.references&&i.push(a.languages.registerReferenceProvider(t,new S(n,r))),s.documentSymbols&&i.push(a.languages.registerDocumentSymbolProvider(t,new x(r))),s.rename&&i.push(a.languages.registerRenameProvider(t,new T(n,r))),s.documentRangeFormattingEdits&&i.push(a.languages.registerDocumentRangeFormattingEditProvider(t,new I(r))),s.onTypeFormattingEdits&&i.push(a.languages.registerOnTypeFormattingEditProvider(t,new A(r))),s.codeActions&&i.push(a.languages.registerCodeActionProvider(t,new P(r))),s.inlayHints&&i.push(a.languages.registerInlayHintsProvider(t,new L(r))),s.diagnostics&&i.push(new m(n,e,t,r))}(),r}export{g as Adapter,P as CodeActionAdaptor,w as DefinitionAdapter,m as DiagnosticsAdapter,y as DocumentHighlightAdapter,I as FormatAdapter,F as FormatHelper,A as FormatOnTypeAdapter,L as InlayHintsAdapter,v as Kind,p as LibFiles,x as OutlineAdapter,_ as QuickInfoAdapter,S as ReferenceAdapter,T as RenameAdapter,f as SignatureHelpAdapter,h as SuggestAdapter,l as WorkerManager,d as flattenDiagnosticMessageText,K as getJavaScriptWorker,M as getTypeScriptWorker,N as setupJavaScript,O as setupTypeScript};
