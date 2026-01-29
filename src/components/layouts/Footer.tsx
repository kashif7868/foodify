import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Truck, 
  CreditCard,
  Apple,
  Play,
  Globe,
  Heart
} from 'lucide-react';
import '../../assets/css/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: 'About Us', link: '/about' },
      { name: 'Careers', link: '/careers' },
      { name: 'Press', link: '/press' },
      { name: 'Blog', link: '/blog' },
      { name: 'Contact Us', link: '/contact' }
    ],
    services: [
      { name: 'Food Delivery', link: '/food-delivery' },
      { name: 'Grocery Delivery', link: '/grocery' },
      { name: 'Restaurant Partners', link: '/partners' },
      { name: 'Become a Rider', link: '/rider' },
      { name: 'Corporate Orders', link: '/corporate' }
    ],
    support: [
      { name: 'Help Center', link: '/help' },
      { name: 'Safety Center', link: '/safety' },
      { name: 'Community Guidelines', link: '/guidelines' },
      { name: 'Dispute Resolution', link: '/disputes' },
      { name: 'COVID-19 Response', link: '/covid' }
    ],
    legal: [
      { name: 'Terms of Service', link: '/terms' },
      { name: 'Privacy Policy', link: '/privacy' },
      { name: 'Cookie Policy', link: '/cookies' },
      { name: 'Accessibility', link: '/accessibility' },
      { name: 'Sitemap', link: '/sitemap' }
    ]
  };

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose',
    'Austin', 'Jacksonville', 'San Francisco', 'Columbus', 'Fort Worth'
  ];

  const cuisines = [
    'Pizza', 'Burger', 'Sushi', 'Chinese', 'Indian',
    'Mexican', 'Italian', 'Thai', 'Mediterranean', 'Vegan'
  ];

  const paymentMethods = [
    { icon: 'visa', name: 'Visa' },
    { icon: 'mastercard', name: 'Mastercard' },
    { icon: 'amex', name: 'American Express' },
    { icon: 'paypal', name: 'PayPal' },
    { icon: 'applepay', name: 'Apple Pay' },
    { icon: 'googlepay', name: 'Google Pay' }
  ];

  return (
    <footer className="footer">
      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay Updated with Delicious Deals! 🍕</h3>
              <p>Subscribe to get exclusive offers, new restaurant alerts, and food tips.</p>
            </div>
            <div className="newsletter-form">
              <div className="input-group">
                <Mail size={20} className="input-icon" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="newsletter-input"
                />
                <button className="subscribe-btn">Subscribe</button>
              </div>
              <p className="privacy-note">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            
            {/* Brand Column */}
            <div className="footer-column brand-column">
              <div className="footer-brand">
                <h2 className="footer-logo">
                  <span className="logo-primary">Food</span>
                  <span className="logo-secondary">Express</span>
                </h2>
                <p className="brand-tagline">
                  Delivering happiness to your doorstep since 2015. 
                  Fast, fresh, and fabulous food delivery.
                </p>
              </div>
              
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={18} />
                  <div>
                    <span className="contact-label">24/7 Support</span>
                    <span className="contact-value">+1 (800) 123-4567</span>
                  </div>
                </div>
                <div className="contact-item">
                  <Mail size={18} />
                  <div>
                    <span className="contact-label">Email</span>
                    <span className="contact-value">support@foodexpress.com</span>
                  </div>
                </div>
                <div className="contact-item">
                  <MapPin size={18} />
                  <div>
                    <span className="contact-label">Headquarters</span>
                    <span className="contact-value">123 Food Street, NY 10001</span>
                  </div>
                </div>
              </div>

              <div className="app-download">
                <h4>Download Our App</h4>
                <div className="app-buttons">
                  <button className="app-btn ios">
                    <Apple size={20} />
                    <div>
                      <span>Download on the</span>
                      <strong>App Store</strong>
                    </div>
                  </button>
                  <button className="app-btn android">
                    <Play size={20} />
                    <div>
                      <span>Get it on</span>
                      <strong>Google Play</strong>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Links Columns */}
            <div className="footer-column">
              <h3 className="footer-heading">Company</h3>
              <ul className="footer-links">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Services</h3>
              <ul className="footer-links">
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Support</h3>
              <ul className="footer-links">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-column">
              <h3 className="footer-heading">Legal</h3>
              <ul className="footer-links">
                {footerLinks.legal.map((item) => (
                  <li key={item.name}>
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Features Section */}
          <div className="features-section">
            <div className="feature">
              <Truck size={32} />
              <div>
                <h4>Fast Delivery</h4>
                <p>Average delivery in 30 minutes</p>
              </div>
            </div>
            <div className="feature">
              <Shield size={32} />
              <div>
                <h4>Safe & Secure</h4>
                <p>Contactless delivery available</p>
              </div>
            </div>
            <div className="feature">
              <CreditCard size={32} />
              <div>
                <h4>Easy Payment</h4>
                <p>Multiple payment options</p>
              </div>
            </div>
            <div className="feature">
              <Heart size={32} />
              <div>
                <h4>Quality Food</h4>
                <p>Fresh from top restaurants</p>
              </div>
            </div>
          </div>

          {/* Cities & Cuisines */}
          <div className="tags-section">
            <div className="tags-column">
              <h4>Popular Cities</h4>
              <div className="tags">
                {cities.map((city) => (
                  <a href={`/city/${city.toLowerCase().replace(' ', '-')}`} 
                     key={city} 
                     className="tag">
                    {city}
                  </a>
                ))}
              </div>
            </div>
            <div className="tags-column">
              <h4>Popular Cuisines</h4>
              <div className="tags">
                {cuisines.map((cuisine) => (
                  <a href={`/cuisine/${cuisine.toLowerCase()}`} 
                     key={cuisine} 
                     className="tag">
                    {cuisine}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            
            <div className="social-section">
              <h4>Follow Us</h4>
              <div className="social-links">
                <a href="https://facebook.com" aria-label="Facebook">
                  <Facebook size={22} />
                </a>
                <a href="https://instagram.com" aria-label="Instagram">
                  <Instagram size={22} />
                </a>
                <a href="https://twitter.com" aria-label="Twitter">
                  <Twitter size={22} />
                </a>
                <a href="https://youtube.com" aria-label="YouTube">
                  <Youtube size={22} />
                </a>
              </div>
            </div>

            <div className="payment-section">
              <h4>We Accept</h4>
              <div className="payment-methods">
                {paymentMethods.map((method) => (
                  <div key={method.name} className="payment-method">
                    {method.icon}
                  </div>
                ))}
              </div>
            </div>

            <div className="language-section">
              <Globe size={18} />
              <select className="language-select">
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

          </div>

          {/* Copyright */}
          <div className="copyright">
            <p>
              &copy; {currentYear} FoodExpress. All rights reserved. 
              Made with <Heart size={16} className="heart-icon" /> for food lovers everywhere.
            </p>
            <p className="disclaimer">
              FoodExpress is a registered trademark. All restaurant logos, trademarks and 
              copyrights are property of their respective owners. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;