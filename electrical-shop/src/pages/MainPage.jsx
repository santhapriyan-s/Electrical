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
    { name: "Circuit Breaker", image: "/d.jpg", link: "/products?category=circuit breaker" },
    { name: "Electric Drill", image: "/h.jpg", link: "/products?category=electric drill" },
    { name: "Cable Tester", image: "/i.jpg", link: "/products?category=cable tester" },
  ];

  const testimonials = [
    { name: "Pooja shree", text: "SR Electricals provided top-quality products and excellent service!" },
    { name: "Santhapriyan", text: "Fast delivery and reliable switches. Highly recommend!" },
    { name: "Surya", text: "Affordable prices and great customer support." },
  ];

  const deals = [
    { name: "LED Bulb", price: 10, discountPrice: 8, image: "/a.jpg", endTime: "2025-03-30T23:59:59" },
    { name: "Smart Plug", price: 25, discountPrice: 20, image: "/c.jpg", endTime: "2025-03-28T23:59:59" },
    { name: "Extension Cord",price: 15,dicountPrice: 8,image: "/b.jpg", endTime: "2025-03-27T23:59:59" },
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
    alert("Message sent! We'll get back to you soon.");
    e.target.reset();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="main-page">
      {/* Hero Section (Full Bleed) */}
      <header className="hero-section full-bleed">
        <div className="main-content">
          <div className="hero-content">
          <h1>Original and Quality Electrical Products</h1>
          <p>We provide genuine electrical components and premium-quality products that meet industry standards. Our inventory includes durable wiring, reliable circuit protection devices, and energy-efficient solutions designed for both residential and commercial applications. Each product undergoes rigorous quality testing to ensure safety and optimal performance.</p>
            <Link to="/products" className="hero-cta">Shop Now</Link>
          </div>
        </div>
      </header>

      {/* Featured Deals Section */}
      <section className="deals-section">
        <div className="main-content">
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
        </div>
      </section>

      {/* Featured Products Slider */}
      <section className="featured-section full-bleed">
        <div className="main-content">
          <h3>Our Top Products</h3>
          <Slider {...sliderSettings}>
            {categories.map((category, index) => (
              <div key={index} className="slide">
              <div className="slide-image-container">
                <img src={category.image} alt={category.name} />
              </div>
              <div className="slide-content">
                <h2>{category.name}</h2>
                <p>Explore our premium {category.name.toLowerCase()} collection.</p>
                <Link to={category.link} className="slide-link">View More</Link>
              </div>
            </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Product Categories */}
      <section className="categories-section">
        <div className="main-content">
          <h2>Explore Categories</h2>
          
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-card">
                <img src={category.image} alt={category.name} />
                <h3>{category.name}</h3>
                <Link to={category.link} className="category-link">Shop {category.name}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section full-bleed">
  <div className="main-content">
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
      <div className="benefit-card">
        <h3>Competitive Pricing</h3>
        <p>Quality products at affordable rates.</p>
      </div>
      <div className="benefit-card">
        <h3>Easy Returns</h3>
        <p>30-day hassle-free return policy.</p>
      </div>
      <div className="benefit-card">
        <h3>Expert Installation</h3>
        <p>Professional setup services available.</p>
      </div>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
<section className="testimonials-section">
  <div className="main-content">
    <h2>What Our Customers Say</h2>
    <div className="testimonials-container">
      {testimonials.map((testimonial, index) => (
        <div key={index} className="testimonial-card">
          {testimonial.rating && (
            <div className="testimonial-rating">
              {'★'.repeat(testimonial.rating)}
              {'☆'.repeat(5 - testimonial.rating)}
            </div>
          )}
          <p className="testimonial-text">"{testimonial.text}"</p>
          <p className="testimonial-name">- {testimonial.name}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Newsletter Section (Full Bleed) */}
      <section className="contact-section">
  <div className="main-content">
    <h2>Visit Us</h2>
    <div className="contact-container">
      
      

      <div className="form-map-container">
        <form className="contact-form">
          <h3>Quick Enquiry</h3>
          <input type="text" placeholder="Your Name" required />
          <input type="tel" placeholder="Phone Number" required />
          <textarea placeholder="Your Electrical Requirements" rows="4" required></textarea>
          <button type="submit" className="contact-btn">
            <i className="fas fa-paper-plane"></i> Send Enquiry
          </button>
        </form>
      
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.463869392741!2d77.97805431480247!3d10.36731299259875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b076bd8c8f4b6e9%3A0x4e7c15b271eecfca!2sSri%20Pavun%20Complex%2C%20High%20School%20Road%2C%20Chinnalapatti%2C%20Dindigul%2C%20Tamil%20Nadu%20624301!5e0!3m2!1sen!2sin!4v1677654321098!5m2!1sen!2sin&output=embed&zoom=16"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            aria-hidden="false"
            tabIndex="0"
            title="SR Electricals Location"
          ></iframe>
        </div>
      </div>
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