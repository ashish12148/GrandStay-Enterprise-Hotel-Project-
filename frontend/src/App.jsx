import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:5000/api/rooms'

const roomCollections = {
  1: 'COMFORT COLLECTION',
  2: 'PREMIUM COLLECTION',
  3: 'GRAND COLLECTION',
}

const roomImages = {
  1: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80',
  2: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80',
  3: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
}

function App() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load hotel rooms.')
        }
        return response.json()
      })
      .then((data) => {
        setRooms(data.rooms)
        setError('')
      })
      .catch(() => {
        setError('Unable to connect to the hotel service. Please check that the backend is running.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  async function handleBooking(room) {
    const checkIn = window.prompt('Enter check-in date (YYYY-MM-DD)', '2026-10-15')
    if (!checkIn) return

    const checkOut = window.prompt('Enter check-out date (YYYY-MM-DD)', '2026-10-17')
    if (!checkOut) return

    const guestsInput = window.prompt('Enter number of guests', '2')
    if (!guestsInput) return

    const guests = Number(guestsInput)

    try {
      const response = await fetch('http://127.0.0.1:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          room_id: room.id,
          check_in: checkIn,
          check_out: checkOut,
          guests,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Booking could not be created.')
        return
      }

      alert(
        `Demo booking successful!\n\nBooking ID: ${data.booking.booking_id}\nRoom: ${data.booking.room_name}\nGuests: ${data.booking.guests}\nStatus: ${data.booking.status}\n\nNo real reservation or payment has been made.`
      )
    } catch {
      alert('Could not connect to the backend. Please make sure Flask is running on port 5000.')
    }
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2 className="logo">GRANDSTAY<span>.</span></h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#rooms">Our Rooms</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="nav-button" href="#booking">
          BOOK A STAY
        </a>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <p className="eyebrow">WELCOME TO GRANDSTAY</p>

          <h1>
            A little more
            <br />
            <span>extraordinary.</span>
          </h1>

          <p className="hero-description">
            Discover exceptional comfort, thoughtful hospitality,
            and memorable stays designed around you.
          </p>

          <a href="#rooms" className="primary-button">
            EXPLORE OUR ROOMS →
          </a>
        </div>

        <div className="hero-label">
          <span>✦</span> YOUR NEXT ESCAPE STARTS HERE
        </div>
      </section>

      <section className="booking-section" id="booking">
        <div className="booking-field">
          <label>DESTINATION</label>
          <p>GrandStay Hotels</p>
        </div>

        <div className="booking-field">
          <label>CHECK IN</label>
          <input type="date" />
        </div>

        <div className="booking-field">
          <label>CHECK OUT</label>
          <input type="date" />
        </div>

        <div className="booking-field">
          <label>GUESTS</label>
          <select defaultValue="2">
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>
        </div>

        <a href="#rooms" className="search-button">
          FIND A ROOM
        </a>
      </section>

      <section className="rooms-section" id="rooms">
        <p className="eyebrow">HANDPICKED FOR YOU</p>

        <h2>Stay somewhere special.</h2>

        <p className="section-description">
          Find your perfect space, whether it is a relaxing getaway
          or a memorable weekend.
        </p>

        {loading && <p>Loading hotel rooms...</p>}

        {error && (
          <p role="alert">
            {error}
          </p>
        )}

        {!loading && !error && rooms.length === 0 && (
          <p>No hotel rooms are currently available.</p>
        )}

        <div className="room-grid">
          {rooms.map((room) => (
            <article className="room-card" key={room.id}>
              <img
                src={roomImages[room.id]}
                alt={room.name}
                loading="lazy"
              />

              <div className="room-info">
                <span>
                  {roomCollections[room.id] || 'GRANDSTAY COLLECTION'}
                </span>

                <h3>{room.name}</h3>

                <p>{room.description}</p>

                <p>
                  Maximum guests: {room.capacity}
                </p>

                <div className="room-bottom">
                  <strong>
                    ₹{room.price.toLocaleString('en-IN')}{' '}
                    <small>/ night</small>
                  </strong>

                  <button onClick={() => handleBooking(room)}>
                    BOOK →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer id="contact">
        <h2>GRANDSTAY<span>.</span></h2>
        <p>Thoughtful stays. Extraordinary memories.</p>
        <p>© 2026 GrandStay Hotels — Demo Project</p>
      </footer>
    </div>
  )
}

export default App
