export default function ResultViewer({ result }) {
  return (
    <div style={{ marginTop: 24 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>
        Results — {result.count} detection{result.count !== 1 ? "s" : ""}
      </h2>

      <img
        src={result.image}
        alt="annotated"
        style={{ maxWidth: "100%", borderRadius: 8, border: "1px solid #e2e8f0" }}
      />

      {result.detections.length > 0 && (
        <table style={{ width: "100%", marginTop: 16, borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#f1f5f9" }}>
              <th style={th}>#</th>
              <th style={th}>Label</th>
              <th style={th}>Confidence</th>
              <th style={th}>Bounding Box</th>
            </tr>
          </thead>
          <tbody>
            {result.detections.map((d, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #e2e8f0" }}>
                <td style={td}>{i + 1}</td>
                <td style={{ ...td, fontWeight: 600 }}>{d.label}</td>
                <td style={td}>{(d.confidence * 100).toFixed(1)}%</td>
                <td style={{ ...td, fontFamily: "monospace", fontSize: 12 }}>
                  [{d.bbox.join(", ")}]
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

const th = { padding: "8px 12px", textAlign: "left", fontWeight: 600 }
const td = { padding: "8px 12px" }