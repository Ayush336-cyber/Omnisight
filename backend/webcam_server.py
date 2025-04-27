# backend/webcam_server.py
import cv2
import torch
from fastapi import FastAPI, Response
from fastapi.responses import StreamingResponse
import numpy as np

# Load YOLOv5 model from local repo
model = torch.hub.load(
    'E:/ultralytics/yolov5', 'yolov5s', source='local', pretrained=True
)
model.eval()

# Open webcam
cap = cv2.VideoCapture(0)

app = FastAPI()

def generate_frames():
    while True:
        ret, frame = cap.read()
        if not ret:
            continue
        # Inference
        results = model(frame)
        # Render boxes onto frame
        annotated = results.render()[0]  # list of np arrays
        # Encode to JPEG
        ret2, buffer = cv2.imencode('.jpg', annotated)
        frame_bytes = buffer.tobytes()
        # Yield for MJPEG
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.get('/video_feed')
def video_feed():
    return StreamingResponse(
        generate_frames(),
        media_type='multipart/x-mixed-replace; boundary=frame'
    )

# Optional: root health check
@app.get('/')
def index():
    return {'status': 'Webcam streaming endpoint online'}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000)