from ultralytics import YOLOE
import threading

_model = None
_lock = threading.Lock()

def get_model():
    global _model
    if _model is None:
        with _lock:
            if _model is None:
                _model = YOLOE("yoloe-11l-seg.pt")
    return _model