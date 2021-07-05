// // const monaco = window.monaco

// // TODO this is duplicated from _index.html.  fix
// const TSVersion = "3.6.4"
// const MonacoVersion = "0.17.1"

// const LibManager = {
//     libs: {},

//     coreLibPath: `https://unpkg.com/typescript@${TSVersion}/lib/`,

//     getReferencePaths(input) {
//         const rx = /<reference path="([^"]+)"\s\/>/
//         return (input.match(new RegExp(rx.source, "g")) || []).map((s) => {
//             const match = s.match(rx)
//             if (match && match.length >= 2) {
//                 return match[1]
//             } else {
//                 throw new Error(`Error parsing: "${s}".`)
//             }
//         })
//     },

//     basename(url) {
//         const parts = url.split("/")
//         if (parts.length === 0) {
//             throw new Error(`Bad url: "${url}"`)
//         }
//         return parts[parts.length - 1]
//     },

//     async addLib(path, ...args) {
//         if (path.indexOf("http") === 0) {
//             return this._addRemoteLib(path, ...args)
//         }
//         return this._addCoreLib(path, ...args)
//     },

//     async _addCoreLib(fileName, ...args) {
//         return this._addRemoteLib(`${this.coreLibPath}${fileName}`, ...args)
//     },

//     async _addRemoteLib(
//         url,
//         stripNoDefaultLib = true,
//         followReferences = true,
//     ) {
//         const fileName = this.basename(url)

//         if (this.libs[fileName]) {
//             return
//         }

//         const res = await fetch(url)
//         if (res.status === 404) {
//             console.log(
//                 `Check https://unpkg.com/typescript@${TSVersion}/lib/`,
//             )
//         }
//         const rawText = await res.text()


//         const text = stripNoDefaultLib ?
//             rawText.replace('/// <reference no-default-lib="true"/>', "") :
//             rawText

//         if (followReferences) {
//             const paths = this.getReferencePaths(text)
//             if (paths.length > 0) {
//                 console.log(`${fileName} depends on ${paths.join(", ")}`)
//                 for (const path of paths) {
//                     await this._addCoreLib(path, stripNoDefaultLib, followReferences)
//                 }
//             }
//         }

//         // const lib = monaco.languages.typescript.typescriptDefaults.addExtraLib(
//         //     text,
//         //     fileName,
//         // )

//         console.groupCollapsed(`Added '${fileName}'`)
//         console.log(text)
//         console.groupEnd()

//         this.libs[fileName] = lib

//         return lib
//     },
// }


// export class EditorInstance{
//     constructor(initialCode, tag, halfMonacoWidth, nLines){
//         console.log('in EditorInstance',initialCode, tag, halfMonacoWidth, nLines)
//     }

//     setLines(nLines: number) {
//         console.log('in EditorInstance - setLines')
//     }

//     updateOutput() {
//         console.log('in EditorInstance - update output')
//     }
    
//     refreshOutput() {
//         console.log('in EditorInstance - refresh output')
//     }
// }


// export class EditorInstance_old {

//     inputModel: any
//     outputModel: any
//     client: any
//     editor: any
//     model: any

//     constructor(initialCode: string, tag: HTMLElement, widthPix: number, nLines: number) {

//         console.log("trying to create an editor")
//         // create a monaco editor in the specified tag




//         // const editor = monaco.editor.create(tag, {
//         //     value: initialCode,
//         //     language: "typescript",
//         // })
//         // console.log('created')

//         // // set the size of the editor
//         // editor.layout({ width: widthPix, height: 20 * nLines })   // lines converted to pixels


//         const defaultCompilerOptions = {
//             noImplicitAny: true,
//             strictNullChecks: true,
//             strictFunctionTypes: true,
//             strictPropertyInitialization: true,
//             noImplicitThis: true,
//             noImplicitReturns: true,

//             alwaysStrict: true,
//             allowUnreachableCode: false,
//             allowUnusedLabels: false,

//             downlevelIteration: false,
//             noEmitHelpers: false,
//             noLib: false,
//             noStrictGenericChecks: false,
//             noUnusedLocals: false,
//             noUnusedParameters: false,

//             esModuleInterop: false,
//             preserveConstEnums: false,
//             removeComments: false,
//             skipLibCheck: false,

//             experimentalDecorators: false,
//             emitDecoratorMetadata: false,

//             // target: monaco.languages.typescript.ScriptTarget.ES2017,
//             // jsx: monaco.languages.typescript.JsxEmit.None,
//         }

//         const myCompilerOptions = {

//             noImplicitAny: true,
//             strictNullChecks: true,
//             strictFunctionTypes: true,
//             strictPropertyInitialization: true,
//             noImplicitThis: true,
//             noImplicitReturns: true,

//             alwaysStrict: true,
//             allowUnreachableCode: false,
//             allowUnusedLabels: false,
//         }


//         const sharedEditorOptions = {
//             minimap: {
//                 enabled: false,
//             },
//             automaticLayout: true,
//             scrollBeyondLastLine: false,
//         }

//         // console.log('loading extraLibs')
//         // for (const path of extraLibs) {
//         //     await LibManager.addLib(path);
//         // }


//         // console.log('monaco', monaco, window.monaco)

//         // console.log("about to set JS defaults")
//         window.monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
//             noSemanticValidation: false,
//             noSyntaxValidation: false,
//         })

//         // console.log("about to set compiler options")
//         const compilerOptions = Object.assign({},
//             defaultCompilerOptions,
//             myCompilerOptions,
//         )

//         window.monaco.languages.typescript.typescriptDefaults.setCompilerOptions(
//             compilerOptions,
//         )

//         console.log('options set')


//         console.log("about to create model with code", initialCode)
//         this.model = window.monaco.editor.createModel(
//             initialCode,
//             "typescript",
//             window.monaco.Uri.file('input.ts'), // this seems necessary
//         )


//         console.log("about to create editor in tag", tag)

//         this.editor = window.monaco.editor.create(
//             tag, // document.getElementById("input"),
//             Object.assign({
//                 model: this.model,
//             }, sharedEditorOptions),
//         )

//         // set the size of the editor
//         this.editor.layout({ width: widthPix, height: 20 * nLines })   // lines converted to pixels



//         console.log("should have an editor")
//         return


//         //     initialCode,
//         //     "typescript",
//         //     monaco.Uri.file('input.ts'), // this seems necessary
//         // )

//         // this.inputModel = monaco.editor.createModel(
//         //     initialCode,
//         //     "typescript",
//         //     monaco.Uri.file('input.ts'), // this seems necessary
//         // )

//         // this.outputModel = monaco.editor.createModel(
//         //     "",
//         //     "javascript",
//         //     monaco.Uri.file("output.js"),
//         // )

//         // inputEditor = monaco.editor.create(
//         //     document.getElementById("input"),
//         //     Object.assign({
//         //         model: this.inputModel,
//         //     }, sharedEditorOptions),
//         // )

//         // outputEditor = monaco.editor.create(
//         //     document.getElementById("output"),
//         //     Object.assign({
//         //         model: this.outputModel,
//         //     }, sharedEditorOptions),
//         // )


//         this.editor.addCommand(
//             monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
//             runJavaScript,
//         )

//         this.editor.addCommand(
//             monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
//             runJavaScript,
//         )

//         this.editor.addCommand(
//             monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KEY_F,
//             prettify,
//         )

//         this.updateOutput()
//         this.editor.onDidChangeModelContent(() => {
//             this.updateOutput()
//         })

//     }

//     setLines(nLines: number) {
//         let halfMonacoWidth = 800   // always.  if you change, then also change the css file (.halfMonaco)
//         this.inputModel.layout({ width: halfMonacoWidth, height: 20 * nLines })   // lines converted to pixels
//         this.outputModel.layout({ width: halfMonacoWidth, height: 20 * nLines })   // lines converted to pixels
//     }


//     updateOutput() {
//                     // @ts-ignore    // TODO
//         monaco.languages.typescript.getTypeScriptWorker().then((worker) => {
//             worker(this.inputModel.uri).then((client, a) => {
//                 if (typeof this.client === "undefined") {

//                     // expose global
//                     this.client = client
//                     //   constructor: ƒ ()
//                     //   getCompilationSettings: ƒ ()
//                     //   getCompilerOptionsDiagnostics: ƒ ()
//                     //   getCompletionEntryDetails: ƒ ()
//                     //   getCompletionsAtPosition: ƒ ()
//                     //   getCurrentDirectory: ƒ ()
//                     //   getDefaultLibFileName: ƒ ()
//                     //   getDefinitionAtPosition: ƒ ()
//                     //   getEmitOutput: ƒ ()
//                     //   getFormattingEditsAfterKeystroke: ƒ ()
//                     //   getFormattingEditsForDocument: ƒ ()
//                     //   getFormattingEditsForRange: ƒ ()
//                     //   getNavigationBarItems: ƒ ()
//                     //   getOccurrencesAtPosition: ƒ ()
//                     //   getQuickInfoAtPosition: ƒ ()
//                     //   getReferencesAtPosition: ƒ ()
//                     //   getScriptFileNames: ƒ ()
//                     //   getScriptKind: ƒ ()
//                     //   getScriptSnapshot: ƒ ()
//                     //   getScriptVersion: ƒ ()
//                     //   getSemanticDiagnostics: ƒ ()
//                     //   getSignatureHelpItems: ƒ ()
//                     //   getSyntacticDiagnostics: ƒ ()
//                     //   isDefaultLibFileName: ƒ ()
//                     //   updateExtraLibs: ƒ ()
//                     //   _getModel: ƒ ()


//                 }

//             // @ts-ignore    // TODO
//             this.client.getEmitOutput(this.inputModel.uri.toString()).then((result) => {
//                     this.outputModel.setValue(result.outputFiles[0].text)
//                 })
//             })
//         })



//         // console() {
//         //     if (!window.ts) {
//         //         return
//         //     }

//         //     console.log(`Using TypeScript ${window.ts.version}`)

//         //     console.log("Available globals:")
//         //     console.log("\twindow.ts", window.ts)
//         //     console.log("\twindow.client", window.client)
//         // },

//     }

//     refreshOutput() {
//         this.inputModel.setValue(this.inputModel.getValue())
//     }



//     // window.MonacoEnvironment = {
//     //     getWorkerUrl(workerId, label) {
//     //         return `worker.js?version=${MonacoVersion}`
//     //     },
//     // }



//     // for(const path of extraLibs) {
//     //     await LibManager.addLib(path)
//     // }







// }

// /* Run */

// function runJavaScript() {
//     // console.clear(); // to hide the stack trace
//     setTimeout(() => {
//             // @ts-ignore    // TODO
//             eval(this.outputModel.getValue())
//     }, 0)
// }



// // if the focus is outside the editor
// window.addEventListener(
//     "keydown",
//     (event) => {
//         // console.log('keydown', event)
//         const S_KEY = 83 // this is the function key
//         if (event.keyCode == S_KEY && (event.metaKey || event.ctrlKey)) {
//             event.preventDefault()
//         }

//         if (
//             event.keyCode === 13 &&
//             (event.metaKey || event.ctrlKey) &&
//             event.target instanceof Node &&
//             event.target === document.body
//         ) {
//             console.log('keydown ctrl-enter', event.keyCode)
//             event.preventDefault()
//             runJavaScript()
//         }
//     },

//     false,
// )

// function prettify() {
//     const PRETTIER_VERSION = "1.14.3"

//     // require([
//     //     `https://unpkg.com/prettier@${PRETTIER_VERSION}/standalone.js`,
//     //     `https://unpkg.com/prettier@${PRETTIER_VERSION}/parser-typescript.js`,
//     // ], (prettier, {
//     //     parsers,
//     // }) => {
//     //     const cursorOffset = State.inputModel.getOffsetAt(
//     //         inputEditor.getPosition(),
//     //     )

//     //     const formatResult = prettier.formatWithCursor(
//     //         this.inputModel.getValue(), {
//     //         parser: parsers.typescript.parse,
//     //         cursorOffset,
//     //     },
//     //     )

//     //     this.inputModel.setValue(formatResult.formatted)
//     //     const newPosition = this.inputModel.getPositionAt(
//     //         formatResult.cursorOffset,
//     //     )
//     //     inputEditor.setPosition(newPosition)
//     // })
// }
