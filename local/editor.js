import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { LanguageSupport } from "@codemirror/language";
import { pythonLanguage } from "@codemirror/lang-python";
import { undo, redo } from "@codemirror/history";
import { oneDark } from "@codemirror/theme-one-dark";
import { linter } from "@codemirror/lint";
import { snippetCompletion, completeFromList } from "@codemirror/autocomplete";

const lintErrors = [];

function lintingSource(editor) {
  const diagnostics = [];
  try {
    lintErrors.splice(0, lintErrors.length);
    const code = editor.state.doc.toString();
    pylint.parse(code);

    const lines = code.split("\n");

    for (const lintError of lintErrors) {
      if (lintError.startsWith("line") && !lintError.includes("<EOF>")) {
        const parts = lintError.split(" ");
        if (parts.length > 2) {
          const positions = parts[1].split(":");
          if (
            positions.length === 2 &&
            !isNaN(positions[0]) &&
            !isNaN(positions[1])
          ) {
            const line = parseInt(positions[0]);
            const char = parseInt(positions[1]);
            let start = 0;

            for (let i = 0; i < line - 1; i++) {
              const codeLine = lines[i];
              if (typeof codeLine === "string") {
                start += codeLine.length + 1;
              }
            }

            let message = "";

            for (let i = 2; i < parts.length; i++) {
              message += parts[i] + " ";
            }

            const end = start + char;

            diagnostics.push({
              from: end,
              to: end,
              severity: "error",
              // source: "lintingSource",
              message: message,
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
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  return diagnostics;
}

const _error = console.error;
console.error = function (message) {
  if (message.startsWith("line")) {
    lintErrors.push(message);
  }
  _error.apply(console, arguments);
};

const snippets = [
  snippetCompletion("def ${name}(${params}) \n\t${}\n", {
    label: "function",
    detail: "definition",
    type: "keyword",
  }),
];

function python() {
  return new LanguageSupport(
    pythonLanguage,
    pythonLanguage.data.of({
      autocomplete: completeFromList(snippets),
    })
  );
}

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
  python: python,
};
window.Editor = Editor;
