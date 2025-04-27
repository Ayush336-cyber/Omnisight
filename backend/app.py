# backend/app.py

import cv2
import torch
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, FileResponse
from fastapi.staticfiles import StaticFiles

# ─── 1. Model Loading ───────────────────────────────────────────────────────────
model = torch.hub.load(
    'E:/yolov5',
    'yolov5s',
    source='local',
    pretrained=True
)
model.eval()

# ─── 2. Video Capture Setup ─────────────────────────────────────────────────────
cap = cv2.VideoCapture(0)

# ─── 3. FastAPI App & CORS ───────────────────────────────────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── 4. Inference Endpoint ───────────────────────────────────────────────────────
@app.post("/infer")
async def infer(file: UploadFile = File(...)):
    data = await file.read()
    arr = np.frombuffer(data, np.uint8)
    frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)

    results = model(frame)
    dets = []
    for *xyxy, conf, cls in results.xyxy[0].tolist():
        dets.append({
            "box": [float(x) for x in xyxy],
            "confidence": float(conf),
            "class": results.names[int(cls)]
        })
    return {"detections": dets}

# ─── 5. MJPEG Stream Endpoint ────────────────────────────────────────────────────
def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        results = model(frame)
        annotated = results.render()[0]
        ok, buf = cv2.imencode(".jpg", annotated)
        if not ok:
            continue
        frame_bytes = buf.tobytes()
        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n"
            + frame_bytes
            + b"\r\n"
        )

@app.get("/video_feed")
def video_feed():
    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

# ─── 6. Root Route for React App ────────────────────────────────────────────────
@app.get("/")
async def serve_index():
    return FileResponse("../Frontend/dist/index.html")

# ─── 7. Mount Static Assets ─────────────────────────────────────────────────────
app.mount("/", StaticFiles(directory="../Frontend/dist"), name="static")

# ─── 8. Uvicorn Entrypoint ──────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
