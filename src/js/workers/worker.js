self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js");

self.addEventListener('message', async (e) => {

    const code = e.data

    async function CreateCompiler() {
        return await loadPyodide()
    }

    async function runPy(code) {
        const arr = []
        try {

            const pyCompiler = await CreateCompiler()

            pyCompiler.setStdout({ batched: (msg) => arr.push(msg)})

            pyCompiler.runPython(code)

        } catch (err) {
            arr.push(err)
        }

        return(arr)
    }

    let output = await runPy(code)

    postMessage(output)

})

