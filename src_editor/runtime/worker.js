// this is needed by Monaco's workers


self.MonacoEnvironment = {
  baseUrl: `../node_modules/monaco-editor/min`,
};
importScripts(
  `../node_modules/monaco-editor/min/vs/base/worker/workerMain.js`,
);
