import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript, esLint, snippets } from "@codemirror/lang-javascript";
import { undo, redo } from "@codemirror/history";
import { oneDark } from "@codemirror/theme-one-dark";
import { linter } from "@codemirror/lint";
import { snippetCompletion } from "@codemirror/autocomplete";

function checkErrors(source) {
  try {
    pylint.parse(source);
  } catch (e) {
    console.error(e);
  }
}

function lintingSource(view) {
  const diagnostics = [];
  if (view.state.doc.length > 2) {
    diagnostics.push({
      from: 1,
      to: 2,
      severity: "error",
      // source: "lintingSource",
      message: " You made a mistake",
      // actions: [
      //   {
      //     name: "fix this",
      //     apply: function (view, from, to) {
      //       console.log("applied");
      //     },
      //   },
      // ],
    });
  }
  return diagnostics;
}

var _error = console.error;
console.error = function (message) {
  if (message.startsWith("line")) {
    console.log(message);
  }
  _error.apply(console, arguments);
};

const commands = {
  undo: undo,
  redo: redo,
};

const extensions = [basicSetup, oneDark, linter(lintingSource)];

const Editor = {
  EditorView: EditorView,
  EditorState: EditorState,
  extensions: extensions,
  commands: commands,
  snippets: snippets,
  snippetCompletion: snippetCompletion,
  javascript: javascript,
};
window.Editor = Editor;
