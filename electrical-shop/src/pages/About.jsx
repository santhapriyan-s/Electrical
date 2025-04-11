import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero full-width-section">
        <div className="hero-content container">
          <h2>ABOUT</h2>
          <h1>We Are Best Electrical Store<br />in Town Since 2010</h1>
        </div>
      </section>

      {/* About Us Section - now separate */}
      <section className="about-us-section full-width-section">
  <div className="container about-us-content">
    <div className="text-content">
    <h3>ABOUT US</h3>
     <h2>The Most Complete Electrical Shop</h2>
     <p>We provide a wide range of electrical products and services to meet the needs of both residential and commercial customers. Our team is passionate about delivering top-notch solutions tailored to every requirement.</p>
     <p>With years of industry experience, we are committed to quality, safety, and customer satisfaction. Whether you’re building, renovating, or just replacing a switch, we’re here to help.</p>

    </div>
    <div className="image-content"></div> {/* No <img> tag here */}
  </div>

  {/* Feature Boxes */}
  <div className="feature-boxes container">
    <div className="box">
    <h4>⚡ Special Items</h4>
    <p>Find unique and high-demand electrical products at the best prices.</p>
    </div>
    <div className="box">
    <h4>📦 Just Arrived</h4>
    <p>Explore our latest arrivals and stay updated with modern technology.</p>
    </div>
    <div className="box">
    <h4>🏆 Top Selling</h4>
<p>Discover our most popular products, trusted by hundreds of customers.</p>

    </div>
  </div>
</section>


      {/* History Section */}
             {/* History Section */}
<section className="history-section full-width-section">
  <div className="container">
    <div className="history-header">
      <h3 className="section-subtitle">HISTORY</h3>
      <h2 className="section-title">Electrical History</h2>
    </div>
    <div className="history-content">
      <div className="history-image-container">
        <img 
          src="/r.jpg" 
          alt="Electrical components and tools"
          className="history-image"
        />
      </div>
      <div className="history-text-content">
        <div className="history-text">
        <p>Since opening our doors in 2010, we have grown from a small store to a leading name in the electrical supply industry. Our mission has always been to offer reliable products and exceptional service.</p>
        <p>We’ve evolved with technology, expanded our offerings, and earned the trust of thousands of clients. Our history reflects dedication, growth, and a commitment to excellence.</p>
        </div>
        
      </div>
    </div>
  </div>
</section>        

      {/* Services Section */}
      <section className="services-section full-width-section">
        <div className="container">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
            <h3>Electrical Installations</h3>
<p>We offer expert installation services for homes, offices, and industries, ensuring safety and efficiency.</p>

            </div>
            <div className="service-card">
            <h3>Product Sales</h3>
            <p>Browse a wide selection of high-quality electrical components, tools, and equipment for every need.</p>
            </div>
            <div className="service-card">
            <h3>24/7 Support</h3>
            <p>Our team is available around the clock to assist you with urgent electrical needs and emergency repairs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="testimonials-section full-width-section">
  <div className="container">
    <div className="section-header">
      <h3 className="section-title">What Our Customers Say</h3>
      <p className="section-subtitle">
        Hear from homeowners and businesses who trust us with their electrical needs.
      </p>
    </div>
    
    <div className="testimonials-grid">
      {/* Testimonial 1 */}
      <div className="testimonial-card">
        <div className="quote-icon">"</div>
        <div className="testimonial-content">
          <p className="testimonial-text">
          I recently had a power backup system installed at my home. The team was punctual, friendly, and explained everything clearly. It's been a great investment!
          </p>
          <div className="customer-info">
            <div className="customer-image">
              <img src="/customer1.jpg" alt="Robert Johnson" />
            </div>
            <div className="customer-details">
              <h3>POOJASHREE AE</h3>
              <p className="location">Homeowner, Boston MA</p>
              <div className="rating">★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 2 */}
      <div className="testimonial-card">
        <div className="quote-icon">"</div>
        <div className="testimonial-content">
          <p className="testimonial-text">
          We upgraded our shop’s entire wiring in Oddanchatram. The technicians were quick, tidy, and extremely knowledgeable. No downtime at all!
          </p>
          <div className="customer-info">
            <div className="customer-image">
              <img src="/san.jpg" alt="Maria Garcia" />
            </div>
            <div className="customer-details">
              <h3>SANTHAPRIYAN S</h3>
              <p className="location">Business Owner, Chicago IL</p>
              <div className="rating">★★★★★</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial 3 */}
      

      {/* Testimonial 4 */}
      <div className="testimonial-card">
        <div className="quote-icon">"</div>
        <div className="testimonial-content">
          <p className="testimonial-text">
          Got my EV charger set up at home in Palani. The installation was smooth, and the crew handled all the approvals for me. Very satisfied with the service!
          </p>
          <div className="customer-info">
            <div className="customer-image">
              <img src="/customer4.jpg" alt="Sarah Chen" />
            </div>
            <div className="customer-details">
              <h3>SURYA K</h3>
              <p className="location">Tesla Owner, Austin TX</p>
              <div className="rating">★★★★★</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="cta-container">
      <button className="cta-button">Share Your Experience</button>
    </div>
  </div>
</section>
    </div>
  );
};

export default About;
