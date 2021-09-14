import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript, esLint, snippets } from "@codemirror/lang-javascript";
import { undo, redo } from "@codemirror/history";
import { oneDark } from "@codemirror/theme-one-dark";
import Linter from "eslint4b-prebuilt";
import { linter } from "@codemirror/lint";
import {
  snippetCompletion,
  autocompletion,
  completeAnyWord,
} from "@codemirror/autocomplete";

const commands = {
  undo: undo,
  redo: redo,
};

const extensions = [
  basicSetup,
  oneDark,
  linter(
    esLint(new Linter(), {
      parserOptions: { ecmaVersion: 2019, sourceType: "module" },
      env: {
        browser: true,
        es6: true,
        es2015: true,
        es2017: true,
        es2020: true,
      },
      rules: {
        semi: ["error", "always"],
        "no-undef": "off",
      },
    })
  ),
];

const Editor = {
  EditorView: EditorView,
  EditorState: EditorState,
  extensions: extensions,
  commands: commands,
  snippets: snippets,
  snippetCompletion: snippetCompletion,
  autocompletion: autocompletion,
  completeAnyWord: completeAnyWord,
  javascript: javascript,
};
window.Editor = Editor;
