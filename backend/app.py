
import os
import uuid
from datetime import date

from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError


# ==========================================
# 1. LOAD ENVIRONMENT VARIABLES
# ==========================================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ENV_FILE = os.path.join(BASE_DIR, ".env")

load_dotenv(ENV_FILE)

MONGODB_URI = os.getenv("MONGODB_URI")


# ==========================================
# 2. FLASK APPLICATION
# ==========================================

app = Flask(__name__)
CORS(app)


# ==========================================
# 3. MONGODB ATLAS CONNECTION
# ==========================================

client = None
db = None
bookings_collection = None

if MONGODB_URI:
    try:
        client = MongoClient(
            MONGODB_URI,
            serverSelectionTimeoutMS=10000
        )

        db = client["grandstay"]
        bookings_collection = db["bookings"]

        print("MongoDB client configured.")

    except Exception:
        app.logger.exception("MongoDB configuration failed.")

else:
    print("ERROR: MONGODB_URI was not found in the .env file.")


def database_ready():
    if client is None or bookings_collection is None:
        return False

    try:
        client.admin.command("ping")
        return True

    except PyMongoError:
        app.logger.exception("MongoDB connection check failed.")
        return False


# ==========================================
# 4. HOTEL ROOM DATA
# ==========================================

rooms = [
    {
        "id": 1,
        "name": "Standard Room",
        "price": 2000,
        "capacity": 2,
        "description": "A comfortable room for a relaxing stay."
    },
    {
        "id": 2,
        "name": "Deluxe Room",
        "price": 3500,
        "capacity": 3,
        "description": "Enjoy extra space and premium comfort."
    },
    {
        "id": 3,
        "name": "Luxury Suite",
        "price": 6000,
        "capacity": 4,
        "description": "A spacious suite for a special getaway."
    }
]


# ==========================================
# 5. HOME API
# ==========================================

@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Welcome to GrandStay Hotels API",
        "status": "running"
    })


# ==========================================
# 6. HEALTH CHECK API
# ==========================================

@app.route("/api/health", methods=["GET"])
def health():
    if not database_ready():
        return jsonify({
            "success": False,
            "status": "database disconnected"
        }), 503

    return jsonify({
        "success": True,
        "status": "connected",
        "database": "MongoDB Atlas"
    }), 200


# ==========================================
# 7. GET HOTEL ROOMS
# ==========================================

@app.route("/api/rooms", methods=["GET"])
def get_rooms():
    return jsonify({
        "success": True,
        "count": len(rooms),
        "rooms": rooms
    }), 200


# ==========================================
# 8. CREATE A HOTEL BOOKING
# ==========================================

@app.route("/api/bookings", methods=["POST"])
def create_booking():

    if not database_ready():
        return jsonify({
            "success": False,
            "message": "Database unavailable. Please try again later."
        }), 503

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "success": False,
            "message": "Please send booking details as JSON."
        }), 400

    room_id = data.get("room_id")
    check_in = data.get("check_in")
    check_out = data.get("check_out")
    guests = data.get("guests")

    # Validate required fields
    if any(
        value is None or value == ""
        for value in [room_id, check_in, check_out, guests]
    ):
        return jsonify({
            "success": False,
            "message": "room_id, check_in, check_out and guests are required."
        }), 400

    # Validate numeric fields
    try:
        room_id = int(room_id)
        guests = int(guests)

    except (TypeError, ValueError):
        return jsonify({
            "success": False,
            "message": "room_id and guests must be valid numbers."
        }), 400

    # Validate dates
    try:
        check_in_date = date.fromisoformat(check_in)
        check_out_date = date.fromisoformat(check_out)

    except (TypeError, ValueError):
        return jsonify({
            "success": False,
            "message": "Dates must use YYYY-MM-DD format."
        }), 400

    if check_out_date <= check_in_date:
        return jsonify({
            "success": False,
            "message": "Check-out must be after check-in."
        }), 400

    # Find room
    room = next(
        (item for item in rooms if item["id"] == room_id),
        None
    )

    if room is None:
        return jsonify({
            "success": False,
            "message": "Room not found."
        }), 404

    # Validate guest capacity
    if guests < 1 or guests > room["capacity"]:
        return jsonify({
            "success": False,
            "message": f"This room allows 1 to {room['capacity']} guests."
        }), 400

    # Prepare booking document
    booking = {
        "booking_id": uuid.uuid4().hex[:12],
        "room_id": room["id"],
        "room_name": room["name"],
        "check_in": check_in,
        "check_out": check_out,
        "guests": guests,
        "price_per_night": room["price"],
        "status": "DEMO_CONFIRMED"
    }

    try:
        result = bookings_collection.insert_one(booking)

        booking["_id"] = str(result.inserted_id)

        return jsonify({
            "success": True,
            "message": "Demo booking saved successfully.",
            "booking": booking
        }), 201

    except PyMongoError:
        app.logger.exception("Failed to save booking in MongoDB")

        return jsonify({
            "success": False,
            "message": "Could not save booking. Please try again."
        }), 500


# ==========================================
# 9. GET ALL BOOKINGS
# ==========================================

@app.route("/api/bookings", methods=["GET"])
def get_bookings():

    if not database_ready():
        return jsonify({
            "success": False,
            "message": "Database unavailable. Please try again later."
        }), 503

    try:
        saved_bookings = []

        for booking in bookings_collection.find().sort("_id", -1):
            booking["_id"] = str(booking["_id"])
            saved_bookings.append(booking)

        return jsonify({
            "success": True,
            "count": len(saved_bookings),
            "bookings": saved_bookings
        }), 200

    except PyMongoError:
        app.logger.exception("Failed to retrieve bookings")

        return jsonify({
            "success": False,
            "message": "Could not retrieve bookings."
        }), 500


# ==========================================
# 10. START FLASK SERVER
# ==========================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )

