from fastapi import FastAPI, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import io, base64, json
from PIL import Image
import numpy as np
from model import get_model

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/detect")
async def detect(
    file: UploadFile = File(...),
    classes: str = Form(...),          # comma-separated text labels
    conf: float = Form(0.25),
    mode: str = Form("text"),          # "text" or "free"
):
    # Read uploaded image
    contents = await file.read()
    pil_img = Image.open(io.BytesIO(contents)).convert("RGB")
    img_array = np.array(pil_img)

    model = get_model()

    if mode == "text":
        class_list = [c.strip() for c in classes.split(",") if c.strip()]
        text_pe = model.get_text_pe(class_list)
        model.set_classes(class_list, text_pe)
    # prompt-free: no set_classes needed, use pf model variant

    results = model.predict(img_array, conf=conf, verbose=False)
    result = results[0]

    # Annotated image → base64
    annotated = result.plot()          # numpy BGR
    annotated_pil = Image.fromarray(annotated[..., ::-1])
    buf = io.BytesIO()
    annotated_pil.save(buf, format="JPEG", quality=90)
    img_b64 = base64.b64encode(buf.getvalue()).decode()

    # Detection data for the UI table
    detections = []
    for box in result.boxes:
        detections.append({
            "label": result.names[int(box.cls)],
            "confidence": round(float(box.conf), 3),
            "bbox": [round(x, 1) for x in box.xyxy[0].tolist()],
        })

    return JSONResponse({
        "image": f"data:image/jpeg;base64,{img_b64}",
        "detections": detections,
        "count": len(detections),
    })

@app.get("/health")
def health():
    return {"status": "ok"}