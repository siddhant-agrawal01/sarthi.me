from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class InputText(BaseModel):
    text: str

emotion_keywords = {
    "Happy": ["happy", "joy", "excited", "great", "good", "grateful"],
    "Sad": ["sad", "unhappy", "depressed", "down", "gloomy"],
    "Anxious": ["nervous", "anxious", "worried", "tense", "scared"],
    "Angry": ["angry", "mad", "furious", "irritated", "frustrated"],
    "Calm": ["calm", "relaxed", "peaceful", "chill"],
}

def analyze(text: str):
    text = text.lower()
    emotion_scores = {}

    for emotion, keywords in emotion_keywords.items():
        matches = [word for word in keywords if word in text]
        if matches:
            emotion_scores[emotion] = len(matches)

    if not emotion_scores:
        return {"emotion": "Neutral", "confidence": 0.5}

    top_emotion = max(emotion_scores, key=emotion_scores.get)
    max_score = emotion_scores[top_emotion]

    confidence = min(0.6 + 0.1 * max_score, 0.95)

    return {"emotion": top_emotion, "confidence": round(confidence, 2)}

@app.post("/analyze")
async def analyze_emotion(input_text: InputText):
    return analyze(input_text.text)
