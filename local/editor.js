import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript, esLint } from "@codemirror/lang-javascript";
import { undo, redo } from "@codemirror/history";
import { oneDark } from "@codemirror/theme-one-dark";
import Linter from "eslint4b-prebuilt";
import { linter } from "@codemirror/lint";

const editorId = typeof window.editorId === "string" ? window.editorId : "ide";

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

const editor = new EditorView({
  state: EditorState.create({
    extensions: extensions,
  }),
  parent: document.getElementById(editorId),
});

window.editor = editor;

window.Editor = {
  EditorState: EditorState,
  extensions: extensions,
  commands: commands,
};
