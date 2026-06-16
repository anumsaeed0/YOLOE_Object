export default function PromptInput({ classes, setClasses, conf, setConf, mode, setMode }) {
  return (
    <div style={{ background: "#f8fafc", padding: 16, borderRadius: 8, marginTop: 16 }}>
      <div style={{ marginBottom: 12 }}>
        <label style={{ fontWeight: 600 }}>Detection Mode</label>
        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          {["text", "free"].map((m) => (
            <label key={m} style={{ cursor: "pointer" }}>
              <input
                type="radio" value={m}
                checked={mode === m}
                onChange={() => setMode(m)}
                style={{ marginRight: 4 }}
              />
              {m === "text" ? "Text Prompt" : "Prompt-Free"}
            </label>
          ))}
        </div>
      </div>

      {mode === "text" && (
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontWeight: 600 }}>Classes to detect</label>
          <input
            value={classes}
            onChange={(e) => setClasses(e.target.value)}
            placeholder="e.g. person, car, backpack"
            style={{
              display: "block", width: "100%", marginTop: 6,
              padding: "8px 12px", borderRadius: 6, border: "1px solid #cbd5e1",
              fontSize: 14, boxSizing: "border-box"
            }}
          />
          <small style={{ color: "#888" }}>Comma-separated. Be specific: "red backpack" works great.</small>
        </div>
      )}

      <div>
        <label style={{ fontWeight: 600 }}>
          Confidence Threshold: <strong>{conf}</strong>
        </label>
        <input
          type="range" min={0.05} max={0.95} step={0.05}
          value={conf}
          onChange={(e) => setConf(parseFloat(e.target.value))}
          style={{ display: "block", width: "100%", marginTop: 6 }}
        />
      </div>
    </div>
  )
}