import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { LanguageSupport } from "@codemirror/language";
import { pythonLanguage } from "@codemirror/lang-python";
import { undo, redo } from "@codemirror/history";
import { oneDark } from "@codemirror/theme-one-dark";
import { snippetCompletion, completeFromList } from "@codemirror/autocomplete";

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

const extensions = [basicSetup, oneDark];

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
