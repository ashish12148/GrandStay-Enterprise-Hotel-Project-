import './App.css'

function App() {
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

        <div className="room-grid">
          <article className="room-card">
            <img
              src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=80"
              alt="Comfortable standard hotel room"
            />

            <div className="room-info">
              <span>COMFORT COLLECTION</span>
              <h3>Standard Room</h3>
              <p>Comfortable living for a relaxing stay.</p>
              <div className="room-bottom">
                <strong>₹2,000 <small>/ night</small></strong>
                <button onClick={() => alert('Booking feature coming soon!')}>
                  BOOK →
                </button>
              </div>
            </div>
          </article>

          <article className="room-card">
            <img
              src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80"
              alt="Elegant deluxe hotel room"
            />

            <div className="room-info">
              <span>PREMIUM COLLECTION</span>
              <h3>Deluxe Room</h3>
              <p>Extra space and comfort for your getaway.</p>
              <div className="room-bottom">
                <strong>₹3,500 <small>/ night</small></strong>
                <button onClick={() => alert('Booking feature coming soon!')}>
                  BOOK →
                </button>
              </div>
            </div>
          </article>

          <article className="room-card">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80"
              alt="Luxury hotel suite interior"
            />

            <div className="room-info">
              <span>GRAND COLLECTION</span>
              <h3>Luxury Suite</h3>
              <p>A premium experience for special moments.</p>
              <div className="room-bottom">
                <strong>₹6,000 <small>/ night</small></strong>
                <button onClick={() => alert('Booking feature coming soon!')}>
                  BOOK →
                </button>
              </div>
            </div>
          </article>
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