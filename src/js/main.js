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

    if(runButtom.value.toString() === "run") {
        runButtom.value = "stop"
        worker.postMessage(editorTab.state.doc.toString())
    }else if (runButtom.value === "stop") {
        worker.postMessage(">>stop<<")
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

