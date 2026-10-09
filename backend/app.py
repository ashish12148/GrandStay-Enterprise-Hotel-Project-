from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

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

@app.route("/")
def home():
    return jsonify({
        "message": "Welcome to GrandStay Hotels API",
        "status": "running"
    })

@app.route("/api/rooms", methods=["GET"])
def get_rooms():
    return jsonify({
        "success": True,
        "count": len(rooms),
        "rooms": rooms
    })



bookings = []
next_booking_id = 1


@app.route("/api/bookings", methods=["POST"])
def create_booking():
    global next_booking_id

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "message": "Please send booking details as JSON."
        }), 400

    room_id = data.get("room_id")
    check_in = data.get("check_in")
    check_out = data.get("check_out")
    guests = data.get("guests")

    if not all([room_id, check_in, check_out, guests]):
        return jsonify({
            "success": False,
            "message": "room_id, check_in, check_out and guests are required."
        }), 400

    try:
        room_id = int(room_id)
        guests = int(guests)
    except (TypeError, ValueError):
        return jsonify({
            "success": False,
            "message": "room_id and guests must be numbers."
        }), 400

    room = next((r for r in rooms if r["id"] == room_id), None)

    if room is None:
        return jsonify({
            "success": False,
            "message": "Room not found."
        }), 404

    if guests < 1 or guests > room["capacity"]:
        return jsonify({
            "success": False,
            "message": f"This room allows 1 to {room['capacity']} guests."
        }), 400

    if check_out <= check_in:
        return jsonify({
            "success": False,
            "message": "Check-out must be after check-in."
        }), 400

    booking = {
        "booking_id": next_booking_id,
        "room_id": room["id"],
        "room_name": room["name"],
        "check_in": check_in,
        "check_out": check_out,
        "guests": guests,
        "price_per_night": room["price"],
        "status": "DEMO_CONFIRMED"
    }

    bookings.append(booking)
    next_booking_id += 1

    return jsonify({
        "success": True,
        "message": "Demo booking created successfully.",
        "booking": booking
    }), 201


@app.route("/api/bookings", methods=["GET"])
def get_bookings():
    return jsonify({
        "success": True,
        "count": len(bookings),
        "bookings": bookings
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)
