import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import "./MainPage.css";

const MainPage = ({ user }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    fade: true,
    pauseOnHover: true,
  };

  const categories = [
    { name: "Lighting", image: "/a.jpg", link: "/products?category=lighting" },
    { name: "Wiring", image: "/l.jpg", link: "/products?category=wiring" },
    { name: "Switches", image: "/k.jpg", link: "/products?category=switches" },
  ];

  const testimonials = [
    { name: "John Doe", text: "SR Electricals provided top-quality products and excellent service!" },
    { name: "Jane Smith", text: "Fast delivery and reliable switches. Highly recommend!" },
    { name: "Mike Johnson", text: "Affordable prices and great customer support." },
  ];

  const deals = [
    { name: "LED Bulb", price: 10, discountPrice: 8, image: "/a.jpg", endTime: "2025-03-30T23:59:59" },
    { name: "Smart Plug", price: 25, discountPrice: 20, image: "/c.jpg", endTime: "2025-03-28T23:59:59" },
  ];

  const [timeLeft, setTimeLeft] = useState({});
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const timers = {};
      deals.forEach((deal) => {
        const end = new Date(deal.endTime);
        const diff = end - now;
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          timers[deal.name] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        } else {
          timers[deal.name] = "Expired";
        }
      });
      setTimeLeft(timers);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    console.log("Subscribed:", email);
    alert("Thank you for subscribing!");
    e.target.reset();
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", {
      name: e.target[0].value,
      email: e.target[1].value,
      message: e.target[2].value,
    });
    alert("Message sent! We’ll get back to you soon.");
    e.target.reset();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-page" style={{ overflowX: 'hidden' }}>
    {/* Hero Section - Remove any extra containers around it */}
    <header className="hero-section">
      <div className="hero-content">
        <h1>SR Electricals</h1>
        <p>Reliable Electrical Solutions for Every Need</p>
        <Link to="/products" className="hero-cta">Shop Now</Link>
      </div>
    </header>

      {/* Featured Deals Section */}
      <section className="deals-section">
        <h2>Hot Deals</h2>
        <div className="deals-grid">
          {deals.map((deal, index) => (
            <div key={index} className="deal-card">
              <img src={deal.image} alt={deal.name} />
              <h3>{deal.name}</h3>
              <p>
                <span className="original-price">Rs.{deal.price}</span>
                <span className="discount-price">Rs.{deal.discountPrice}</span>
              </p>
              <p className="deal-timer">Ends in: {timeLeft[deal.name] || "Calculating..."}</p>
              <Link to="/products" className="deal-link">Grab Now</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="featured-section">
        <h2>Our Top Products</h2>
        <Slider {...sliderSettings}>
          {categories.map((category, index) => (
            <div key={index} className="slide">
              <img src={category.image} alt={category.name} />
              <div className="slide-content">
                <h3>{category.name}</h3>
                <p>Explore our premium {category.name.toLowerCase()} collection.</p>
                <Link to={category.link} className="slide-link">View More</Link>
              </div>
            </div>
          ))}
        </Slider>
      </section>

      {/* Product Categories with Filters */}
      <section className="categories-section">
        <h2>Explore Categories</h2>
        <div className="category-filters">
          <button className="filter-btn active">All</button>
          {categories.map((category, index) => (
            <button key={index} className="filter-btn">{category.name}</button>
          ))}
        </div>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-card">
              <img src={category.image} alt={category.name} />
              <h3>{category.name}</h3>
              <Link to={category.link} className="category-link">Shop {category.name}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <h2>Why Choose Us?</h2>
        <div className="benefits-container">
          <div className="benefit-card">
            <h3>Reliable Products</h3>
            <p>Built to last with top-grade materials.</p>
          </div>
          <div className="benefit-card">
            <h3>Quick Delivery</h3>
            <p>Shipped to you within 48 hours.</p>
          </div>
          <div className="benefit-card">
            <h3>Customer Support</h3>
            <p>24/7 help from our expert team.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Our Customers Say</h2>
        <div className="testimonials-container">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-name">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Social Media Feed */}
      <section className="social-feed-section">
        <h2>Follow Us on Social Media</h2>
        <div className="social-feed">
          <div className="social-post">
            <img src="/social1.jpg" alt="Social Post 1" />
            <p>Check out our latest lighting collection! #SRElectricals</p>
          </div>
          <div className="social-post">
            <img src="/social2.jpg" alt="Social Post 2" />
            <p>Customer setup with our smart plugs. #SmartHome</p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="newsletter-section">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest offers and updates.</p>
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input type="email" name="email" placeholder="Enter your email" required />
          <button type="submit" className="newsletter-btn">Subscribe</button>
        </form>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About SR Electricals</h2>
        <p>
          At SR Electricals, we’ve been powering homes and businesses with quality products since 2010.
          Our mission is to deliver safe, efficient, and affordable electrical solutions.
        </p>
        <Link to="/about" className="about-btn">Learn More</Link>
      </section>

      {/* Contact Section with Map */}
      <section className="contact-section">
  <h2>Get in Touch</h2>
  <div className="contact-container">
    <div className="contact-info">
      <p>Email: <a href="mailto:support@srelectricals.com">support@srelectricals.com</a></p>
      <p>Phone: <a href="tel:+919876543210">+91 9876543210</a></p>
      <form className="contact-form" onSubmit={handleContactSubmit}>
        <input type="text" placeholder="Your Name" required />
        <input type="email" placeholder="Your Email" required />
        <textarea placeholder="Your Message" rows="4" required></textarea>
        <button type="submit" className="contact-btn">Send Message</button>
      </form>
    </div>
    <div className="contact-map">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.463869392741!2d77.97805431480247!3d10.36731299259875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b076bd8c8f4b6e9%3A0x4e7c15b271eecfca!2sDindigul%2C%20Tamil%20Nadu%2C%20India!5e0!3m2!1sen!2sus!4v1677654321098!5m2!1sen!2sus"
        width="100%"
        height="300"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        title="SR Electricals Location, Dindigul"
      ></iframe>
    </div>
  </div>
</section>

      

      {/* Back-to-Top Button */}
      {showBackToTop && (
        <button className="back-to-top" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default MainPage;