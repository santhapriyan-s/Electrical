import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <h1 className="contact-title">Contact Us</h1>
      <div className="contact-form-container">
        <form className="contact-form">
          <div className="contact-field">
            <label className="contact-label">Name</label>
            <input type="text" className="contact-input" placeholder="Your Name" />
          </div>
          <div className="contact-field">
            <label className="contact-label">Email</label>
            <input type="email" className="contact-input" placeholder="Your Email" />
          </div>
          <div className="contact-field">
            <label className="contact-label">Message</label>
            <textarea className="contact-textarea" rows="5" placeholder="Your Message"></textarea>
          </div>
          <button className="contact-button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;