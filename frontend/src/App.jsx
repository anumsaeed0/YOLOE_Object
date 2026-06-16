import { useState } from "react"
import ImageUploader from "./components/ImageUploader"
import PromptInput from "./components/PromptInput"
import ResultViewer from "./components/ResultViewer"
import axios from "axios"

export default function App() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [classes, setClasses] = useState("person, car, dog")
  const [conf, setConf] = useState(0.25)
  const [mode, setMode] = useState("text")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleFileChange = (f) => {
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setResult(null)
  }

  const handleDetect = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const form = new FormData()
      form.append("file", file)
      form.append("classes", classes)
      form.append("conf", conf)
      form.append("mode", mode)

      const res = await axios.post("/detect", form)
      setResult(res.data)
    } catch (e) {
      setError(e.response?.data?.detail || "Detection failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4 }}>
        🔍 YOLOE Object Detector
      </h1>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Open-vocabulary detection — describe anything you want to find.
      </p>

      <ImageUploader onFileChange={handleFileChange} preview={preview} />

      <PromptInput
        classes={classes} setClasses={setClasses}
        conf={conf} setConf={setConf}
        mode={mode} setMode={setMode}
      />

      <button
        onClick={handleDetect}
        disabled={!file || loading}
        style={{
          marginTop: 16, padding: "10px 28px", fontSize: 16,
          background: loading ? "#aaa" : "#2563eb", color: "#fff",
          border: "none", borderRadius: 8, cursor: file && !loading ? "pointer" : "not-allowed"
        }}
      >
        {loading ? "Detecting…" : "Run Detection"}
      </button>

      {error && <p style={{ color: "red", marginTop: 12 }}>{error}</p>}

      {result && <ResultViewer result={result} />}
    </div>
  )
}