export default function ImageUploader({ onFileChange, preview }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontWeight: 600, marginBottom: 8 }}>
        Upload Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files[0] && onFileChange(e.target.files[0])}
        style={{ marginBottom: 12 }}
      />
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8, border: "1px solid #ddd" }}
        />
      )}
    </div>
  )
}