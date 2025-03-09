import editorTab from "./editor.js"

const consoleTab = document.getElementById("console")
const runButtom = document.getElementById("runButton")
const  clearButtomn = document.getElementById("clearButton")

const worker = new Worker("./src/js/workers/worker.js")

const interruptBuffer = new Uint8Array(new SharedArrayBuffer(16));

let message = {cmd: "load", interruptBuffer}

worker.postMessage(message)

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

    if(runButtom.value.toString() === "run") {
        Atomics.store(interruptBuffer, 0, 0)

        runButtom.value = "stop"
        message = { cmd: "run", code: editorTab.state.doc.toString()}
        worker.postMessage(message)

    }else if (runButtom.value === "stop") {

        Atomics.store(interruptBuffer, 0, 2)

        addToOutput(["code execution stopped"])
        runButtom.value = "run"

    }else {
        alert("wait to the compiler to be read")
    }
})

worker.onmessage = (e) => {
    addToOutput(e.data)
    runButtom.value = "run"
}

clearButtomn.addEventListener("click", () => {
    consoleTab.innerHTML = ""
})

