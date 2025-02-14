const editorTab = document.getElementById("editor")
const consoleTab = document.getElementById("console")
const runButtom = document.getElementById("runButton")
const  clearButtomn = document.getElementById("clearButton")


async function CreateCompiler() {

    let pyodide = await loadPyodide()
    consoleTab.innerHTML += "<br/>>>> Ready!"
    return await pyodide
}

function addToOutput(value) {
    for (const valueElement of value) {
        if(consoleTab.getHTML() === "") {
            consoleTab.innerHTML += ">>> " + valueElement
        } else {
            consoleTab.innerHTML += "<br/>>>> " + valueElement
        }
    }

}

async function runPy() {
    const arr = []
    try {
        const pyCompiler = await pyCompilerPromise

        pyCompiler.setStdout({ batched: (msg) => arr.push(msg) })

        console.log(editorTab.innerText)
        pyCompiler.runPython(editorTab.innerText)

        addToOutput(arr)

    } catch (err) {
        arr.push(err)
        addToOutput(arr)
    }
}

const pyCompilerPromise = CreateCompiler()

runButtom.addEventListener("click", async () => {
    runButtom.value = "stop"
    await runPy()

    runButtom.value = "run"
})

clearButtomn.addEventListener("click", () => {
    consoleTab.innerHTML = ""
})

