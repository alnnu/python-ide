self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js");

let pyCompiler;

async function CreateCompiler() {
    pyCompiler = await loadPyodide();
}

self.addEventListener('message', async (e) => {

    const data = e.data

    if (data === ">>load<<") {
        await CreateCompiler();
        postMessage(["read to run"])
    } else if(data === ">>stop<<") {

    } else {
        async function runPy(code) {
            const arr = []
            try {
                pyCompiler.setStdout({ batched: (msg) => arr.push(msg)})

                pyCompiler.runPython(code)

            } catch (err) {
                arr.push(err)
            }

            return(arr)
        }

        let output = await runPy(data)

        postMessage(output)
    }
})

