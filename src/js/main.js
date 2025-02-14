const editorTab = document.getElementById("editor")
const consoleTab = document.getElementById("console")
const runButtom = document.getElementById("runButton")
const  clearButtomn = document.getElementById("clearButton")


async function CreateCompiler() {

    let pyodide = await loadPyodide()
    consoleTab.innerHTML += "<br/>> Ready!"
    return await pyodide
}

function addToOutput(value) {
    if(consoleTab.getHTML() === "") {
        consoleTab.innerHTML += "> " + value
    } else {
        consoleTab.innerHTML += "<br/>> " + value
    }
}

async function runPy() {
    try {
        const pyCompiler = await pyCompilerPromise
        const output = pyCompiler.runPython(editorTab.textContent)
        addToOutput(output)
    } catch (err) {
        addToOutput(err)
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

