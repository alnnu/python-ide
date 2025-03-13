self.importScripts("https://cdn.jsdelivr.net/pyodide/v0.27.2/full/pyodide.js")

let pyCompiler

async function CreateCompiler(interruptBuffer) {
    pyCompiler = await loadPyodide()
    pyCompiler.setInterruptBuffer(interruptBuffer)
}

function writeStringToBuffer(str, uint32Array) {
    const encoder = new TextEncoder()
    const encoded = encoder.encode(str)

    if (encoded.length > uint32Array.length) {
        throw new Error("String To big")
    }


    Atomics.wait(uint32Array, uint32Array.length - 1, 1)

    Atomics.store(uint32Array, uint32Array.length - 1, 1)

    for (let i = 0; i < uint32Array.length - 1; i++) {
        Atomics.store(uint32Array, i, encoded[i]);
    }


}

self.addEventListener('message', async (e) => {

    const data = e.data

    if (data.cmd === "load") {

        await CreateCompiler(data.interruptBuffer);


        writeStringToBuffer("read to run", data.output)

        postMessage("loaded")

    }else if(data.cmd === "run"){
        async function runPy(code) {
            try {
                pyCompiler.setStdout({ batched: (msg) => {
                        writeStringToBuffer(msg, data.output)
                        postMessage("log")
                    }})

                pyCompiler.runPython(code)

            } catch (err) {
                writeStringToBuffer(err.toString(), data.output)
                postMessage("error")
            }
        }

        await runPy(data.code)

        postMessage("finished")
    }
})

