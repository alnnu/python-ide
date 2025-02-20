import editorTab from "./editor.js"

const consoleTab = document.getElementById("console")
const runButtom = document.getElementById("runButton")
const  clearButtomn = document.getElementById("clearButton")


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

    const worker = new Worker("./workers/worker.js")

    worker.onmessage = (e) => {
        addToOutput(e.data)
    }

    worker.postMessage(editorTab.state.doc.toString())

    runButtom.value = "run"
})

clearButtomn.addEventListener("click", () => {
    consoleTab.innerHTML = ""
})

