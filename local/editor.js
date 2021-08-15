import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript, esLint, snippets } from "@codemirror/lang-javascript";
import { undo, redo } from "@codemirror/history";
import { oneDark } from "@codemirror/theme-one-dark";
import Linter from "eslint4b-prebuilt";
import { linter } from "@codemirror/lint";
import { snippetCompletion } from "@codemirror/autocomplete";

const commands = {
  undo: undo,
  redo: redo,
};

const extensions = [
  basicSetup,
  javascript(),
  oneDark,
  linter(esLint(new Linter())),
];

const Editor = {
  EditorView: EditorView,
  EditorState: EditorState,
  extensions: extensions,
  commands: commands,
  snippets: snippets,
  snippetCompletion: snippetCompletion,
};
window.Editor = Editor;
