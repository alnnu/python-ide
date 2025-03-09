
import { EditorView } from "https://esm.sh/@codemirror/view";
import { basicSetup } from "https://esm.sh/codemirror";
import { pythonLanguage } from "https://esm.sh/@codemirror/lang-python";

const targetElement = document.getElementById("editor")

const editor =  new EditorView({
    parent: targetElement,
    doc: `import time
from datetime import datetime

print("Start Code")
start_time = datetime.now()

time.sleep(5)

endtime = datetime.now() - start_time
print(f"EndTime: {endtime}")
print("End Code")`,
    extensions: [ basicSetup, pythonLanguage]
})

export default editor