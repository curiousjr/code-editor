import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";

const editor = new EditorView({
  state: EditorState.create({
    extensions: [basicSetup, javascript(), oneDark],
  }),
  parent: document.getElementById("ide"),
});

window.editor = editor;
