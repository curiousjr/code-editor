import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript, esLint } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import Linter from "eslint4b-prebuilt";
import { linter } from "@codemirror/lint";

const editor = new EditorView({
  state: EditorState.create({
    extensions: [
      basicSetup,
      javascript(),
      oneDark,
      linter(esLint(new Linter())),
    ],
  }),
  parent: document.getElementById("ide"),
});

window.editor = editor;
