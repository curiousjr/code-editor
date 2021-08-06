import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";

let editor = new EditorView({
  state: EditorState.create({
    extensions: [basicSetup, javascript()],
  }),
  parent: document.getElementById("ide"),
});
