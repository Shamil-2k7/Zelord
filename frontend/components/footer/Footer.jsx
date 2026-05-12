import './footer.css'

function Footer() {
  return (
    <footer>
      <section id="contact">
        <div className="contact-inner">

          <div className="contact-left">
            <h2 className="h2text">
              Your Journey<br />Starts with a<br />
              <em>Conversation.</em>
            </h2>

            <p>
              Ready to book your next luxury trip across Kerala? Reach out to us on WhatsApp for instant replies,
              follow us for travel inspiration on Instagram, or drop us an email — we're always happy to help you plan
              the perfect journey.
            </p>
          </div>

          <div className="contact-links">

            <a href="https://wa.me/919876543210"
               className="contact-link"
               target="_blank"
               rel="noopener noreferrer">

              <div className="cl-icon whatsapp">💬</div>
              <div className="cl-text">
                <div className="cl-label">Chat With Us</div>
                <div className="cl-value">+91 98765 43210</div>
              </div>
              <span className="cl-arrow">→</span>
            </a>

            <a href="https://instagram.com/keralaluxurytravels"
               className="contact-link"
               target="_blank"
               rel="noopener noreferrer">

              <div className="cl-icon instagram">📸</div>
              <div className="cl-text">
                <div className="cl-label">Follow Us on Instagram</div>
                <div className="cl-value">@keralaluxurytravels</div>
              </div>
              <span className="cl-arrow">→</span>
            </a>

            <a href="mailto:info@keralaluxurytravels.com" className="contact-link">
              <div className="cl-icon email">✉️</div>
              <div className="cl-text">
                <div className="cl-label">Email Our Team</div>
                <div className="cl-value">info@keralaluxurytravels.com</div>
              </div>
              <span className="cl-arrow">→</span>
            </a>

          </div>

        </div>
      </section>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} ZEDLORD . All rights reserved.</span>
        <span>Crafted with  for travellers everywhere</span>
      </div>
    </footer>
  )
}

export default Footer