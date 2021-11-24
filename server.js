const express = require("express")
const { ZipLog } = require("./zipLog.js")
const cors = require("cors")
const PORT = process.env.PORT || 3001
const app = express()
app.use(cors())

const Z = new ZipLog()

app.post("/insert/:zip", (req, res) => {
    const zip = parseInt(req.params.zip)
    const output = Z.insert(zip)
    if (output.error) {
        res.status(400).json(output)
    } else {
        res.status(200).json(output)
    }
})

app.delete("/delete/:zip", (req, res) => {
    const zip = parseInt(req.params.zip)
    const output = Z.delete(zip)
    if (output.error) {
        res.status(400).json(output)
    } else {
        res.status(200).json(output)
    }
})

app.get("/has/:zip", (req, res) => {
    const zip = parseInt(req.params.zip)
    const output = Z.has(zip)
    res.status(200).json(output)
})

app.get("/display", (req, res) => {
    const output = Z.display()
    res.status(200).json(output)
})

app.listen(PORT, () => {
    console.log(`Starting server at http://localhost:${PORT}`)
})