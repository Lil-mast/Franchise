from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Import existing integrations
from mpesa_integrations import initiate_stk_push, get_mpesa_access_token
from openai_integrations import get_openai_response

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Routes
@app.route("/calculate", methods=["POST"])
def calculate():
    """Simple calculation endpoint"""
    try:
        data = request.get_json()
        if not data or "num1" not in data or "num2" not in data:
            return jsonify({"error": "Missing num1 or num2"}), 400

        num1 = data["num1"]
        num2 = data["num2"]

        if not isinstance(num1, (int, float)) or not isinstance(num2, (int, float)):
            return jsonify({"error": "num1 and num2 must be numbers"}), 400

        division = num1 / num2 if num2 != 0 else float('nan')

        return jsonify({
            "addition": num1 + num2,
            "multiplication": num1 * num2,
            "subtraction": num1 - num2,
            "division": division,
            "incremented": num1 + 1,
            "decremented": num1 - 1,
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/mpesa/payment", methods=["POST"])
def initiate_payment():
    """Initiate M-Pesa payment"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400

        required_fields = ["phone", "amount", "account_ref"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Get credentials from environment
        consumer_key = os.getenv("MPESA_CONSUMER_KEY")
        consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")
        passkey = os.getenv("MPESA_PASSKEY")
        shortcode = os.getenv("MPESA_SHORTCODE")
        callback_url = os.getenv("MPESA_CALLBACK_URL", "https://your-callback-url.com")

        if not all([consumer_key, consumer_secret, passkey, shortcode]):
            return jsonify({"error": "M-Pesa credentials not configured"}), 500

        # Use existing Python function
        response = initiate_stk_push(
            consumer_key=consumer_key,
            consumer_secret=consumer_secret,
            passkey=passkey,
            shortcode=shortcode,
            phone_number=str(data["phone"]),
            amount=int(data["amount"]),
            callback_url=callback_url,
            account_reference=data["account_ref"],
            transaction_desc="Franchise Payment"
        )

        if response:
            return jsonify({
                "checkout_request_id": response.get("CheckoutRequestID", ""),
                "response_code": response.get("ResponseCode", ""),
                "message": response.get("ResponseDescription", "")
            })
        else:
            return jsonify({"error": "Failed to initiate payment"}), 500

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/openai/chat", methods=["POST"])
def chat():
    """OpenAI chat endpoint"""
    try:
        data = request.get_json()
        if not data or "message" not in data:
            return jsonify({"error": "Missing message field"}), 400

        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            return jsonify({"error": "OpenAI API key not configured"}), 500

        # Use existing Python function
        response = get_openai_response(api_key, data["message"])

        return jsonify({"response": response})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/")
def root():
    """Health check endpoint"""
    return jsonify({"message": "Franchise Backend API", "status": "running"})

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8080, debug=True)