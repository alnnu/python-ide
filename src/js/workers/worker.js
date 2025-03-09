self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js");

let pyCompiler

async function CreateCompiler(interruptBuffer) {
    pyCompiler = await loadPyodide()
    pyCompiler.setInterruptBuffer(interruptBuffer);
}

self.addEventListener('message', async (e) => {

    const data = e.data

    if (data.cmd === "load") {

        await CreateCompiler(data.interruptBuffer);
        postMessage(["read to run"])

    }else if(data.cmd === "run"){
        async function runPy(code) {
            const arr = []
            try {
                pyCompiler.setStdout({ batched: (msg) => arr.push(msg)})

                pyCompiler.runPython(code)

            } catch (err) {
                arr.push(err.toString())
            }
            return(arr)
        }

        let output = await runPy(data.code)

        postMessage(output)
    }
})

