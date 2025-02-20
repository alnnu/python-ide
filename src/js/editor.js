
import { EditorView } from "https://esm.sh/@codemirror/view";
import { basicSetup } from "https://esm.sh/codemirror";
import { pythonLanguage } from "https://esm.sh/@codemirror/lang-python";

const targetElement = document.getElementById("editor")

const editor =  new EditorView({
    parent: targetElement,
    doc: `print("Hello world")`,
    extensions: [ basicSetup, pythonLanguage]
})

export default editor