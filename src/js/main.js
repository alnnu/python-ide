import editorTab from "./editor.js"

const consoleTab = document.getElementById("console")
const runButtom = document.getElementById("runButton")
const  clearButtomn = document.getElementById("clearButton")

const worker = new Worker("./src/js/workers/worker.js")

worker.postMessage(">>load<<")

function addToOutput(value) {
    for (const valueElement of value) {
        if(consoleTab.getHTML() === "") {
            consoleTab.innerHTML += ">>> " + valueElement
        } else {
            consoleTab.innerHTML += "<br/>>>> " + valueElement
        }
    }

}


runButtom.addEventListener("click", async () => {
    runButtom.value = "stop"
    worker.postMessage(editorTab.state.doc.toString())

})

worker.onmessage = (e) => {
    addToOutput(e.data)
    runButtom.value = "run"
}

clearButtomn.addEventListener("click", () => {
    consoleTab.innerHTML = ""

})

