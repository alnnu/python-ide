import {EditorView, basicSetup} from "codemirror"
import {pythonLanguage} from "@codemirror/lang-python";

const targetElement = document.getElementById("editor")

const editor =  new EditorView({
    parent: targetElement,
    doc: `print("Hello world")`,
    extensions: [basicSetup, pythonLanguage]
})

export default editor