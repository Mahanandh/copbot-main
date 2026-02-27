import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import json
import faiss
from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.models.database import db  # Database
from backend.config import Config
from backend.routes.legal import legal_blueprint
from backend.routes.emergency import emergency_blueprint
from backend.routes.fir import fir_blueprint
from backend.routes.chat import chat_blueprint
from backend.utils.llm_model import get_ollama_response, OllamaConnectionError  # Import Llama model + custom exception
from sentence_transformers import SentenceTransformer

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Update database path

# Enable CORS for all routes (Keep open for local dev, restrict origins in production)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Initialize Database
db.init_app(app)

# Initialize Sentence Transformer model
model = SentenceTransformer("all-MiniLM-L6-v2")

# Paths to FAISS indices and JSON databases
faq_index_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "faq_index.faiss"))
faq_db_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "faq_db.json"))
legal_index_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "legal_index.faiss"))
legal_data_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data", "legal_sections.json"))

# Load FAQ FAISS index and data
faq_index = None
faq_questions = []
faq_answers = []
if os.path.exists(faq_index_path):
    faq_index = faiss.read_index(faq_index_path)
    with open(faq_db_path, "r", encoding="utf-8") as f:
        faq_db = json.load(f)
    faq_questions = faq_db["questions"]
    faq_answers = faq_db["answers"]

# Load Legal FAISS index and data
legal_index = None
legal_data = []
if os.path.exists(legal_index_path):
    legal_index = faiss.read_index(legal_index_path)
    with open(legal_data_path, "r", encoding="utf-8") as f:
        legal_data = json.load(f)

# Home route to check if the backend is running
@app.route('/')
def home():
    return "CopBotChatbox Backend is Running!"

# Chatbot route interacting with LLaMA/Mistral
@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Handles chatbot interaction, checking FAQ or Legal database first, then using Llama model as a fallback.
    """
    try:
        data = request.get_json()

        # Extract Payload
        if not data or 'message' not in data:
            return jsonify({'error': 'No message provided'}), 400

        user_message = data['message']
        history = data.get('history', [])
        
        # Check FAQ database first
        faq_response = retrieve_faq_answer(user_message)
        if faq_response:
            return jsonify({'response': faq_response}), 200

        # If no FAQ response, check Legal database
        legal_response = retrieve_legal_info(user_message)
        if legal_response:
            return jsonify({'response': legal_response}), 200

        # RAG Integration Hook (fallback if no local info found)
        bot_response = get_ollama_response(user_message)

        # Response Schema
        return jsonify({"response": bot_response}), 200

    except OllamaConnectionError:
        # Ollama/Mistral server is offline — return clean 503
        return jsonify({"error": "The AI inference engine is currently offline or unreachable. Please verify system status."}), 503
    except Exception as e:
        # Generic fallback — sanitized, never expose raw tracebacks
        return jsonify({"error": "An internal AI processing error occurred."}), 500

# Complaint Wizard endpoint
@app.route('/api/complaints', methods=['POST'])
def complaints():
    """Handles the submission of a citizen complaint form."""
    try:
        data = request.get_json()
        
        # Extract Payload
        full_name = data.get('fullName')
        phone = data.get('phone')
        incident_type = data.get('incidentType')
        date_time = data.get('dateTime')
        description = data.get('description')
        
        # Database Hook
        # TODO: Insert this data into our SQLite/PostgreSQL database
        # Example: db.session.add(Complaint(name=full_name, phone=phone, type=incident_type, text=description))
        # db.session.commit()
        
        # Generate ID
        import random
        tracking_id = f"CMP-{random.randint(10000, 99999)}"
        
        # Response Schema
        return jsonify({
            "status": "success", 
            "complaint_id": tracking_id
        }), 200

    except Exception as e:
        return jsonify({"error": "Failed to process complaint."}), 500


# Function to retrieve FAQ answers using FAISS
def retrieve_faq_answer(query):
    """Retrieve the most relevant FAQ answer using FAISS."""
    if not faq_index:
        return None

    query_embedding = model.encode([query])
    distances, indices = faq_index.search(query_embedding, k=1)  # Get top match

    if distances[0][0] > 1.0:  # Threshold to filter irrelevant results
        return None

    return faq_answers[indices[0][0]]  # Return the best FAQ match


# Function to retrieve Legal information using FAISS
def retrieve_legal_info(query):
    """Retrieve relevant legal sections from FAISS."""
    if not legal_index:
        return None  # No legal index available, let the caller handle fallback

    query_embedding = model.encode([query])
    _, indices = legal_index.search(query_embedding, k=3)  # Get top 3 matches

    results = []
    for i in indices[0]:
        if 0 <= i < len(legal_data):
            results.append(legal_data[i]["text"])  # Extract the actual legal text

    return "\n".join(results) if results else "No relevant legal information found."


# Register Blueprints with consistent API prefixes
app.register_blueprint(legal_blueprint, url_prefix='/api/legal')
app.register_blueprint(emergency_blueprint, url_prefix='/api/emergency')
app.register_blueprint(fir_blueprint, url_prefix='/api/fir')

# Ensure the app runs only when executed directly
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=5001, debug=True)
