import editorTab from "./editor.js"

const consoleTab = document.getElementById("console")
const runButtom = document.getElementById("runButton")
const  clearButtomn = document.getElementById("clearButton")

const worker = new Worker("./src/js/workers/worker.js")

const interruptBuffer = new Uint8Array(new SharedArrayBuffer(16));
const output = new Int32Array(new SharedArrayBuffer(2056));

let message = {cmd: "load", interruptBuffer,output}

worker.postMessage(message)



runButtom.addEventListener("click", async () => {

    if(runButtom.value.toString() === "run") {

        Atomics.store(interruptBuffer, 0, 0)

        runButtom.value = "stop"

        message = { cmd: "run", code: editorTab.state.doc.toString(), output}

        worker.postMessage(message)

    }else if (runButtom.value === "stop") {

        Atomics.store(interruptBuffer, 0, 2)

        runButtom.value = "stopping"

        runButtom.disabled = true

    }else {
        alert("wait to the compiler to be read")
    }
})

function readStringFromBuffer(uint32Array) {
    const decoder = new TextDecoder()

    consoleTab.innerHTML += ">>> " + decoder.decode(uint32Array.slice(0, uint32Array.length - 1)) + "<br/>"


    Atomics.store(output,uint32Array.length - 1 , 0);

    Atomics.notify(output,uint32Array.length - 1)
}


worker.onmessage = (e) => {

    readStringFromBuffer(output)


    if(e.data === "finished" || e.data === "loaded") {
        runButtom.value = "run"

        runButtom.disabled = false
    }



}

clearButtomn.addEventListener("click", () => {
    consoleTab.innerHTML = ""
})


