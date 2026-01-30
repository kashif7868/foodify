import "../../assets/css/footer.css";
import { 
  Facebook, Instagram, Twitter, Phone, Mail, 
  MapPin, Truck, Shield, Award, Sparkles 
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Top Features */}
      <div className="footer-top">
        <div className="footer-feature">
          <Truck size={20} />
          <span>30-min delivery in Lahore</span>
        </div>
        <div className="footer-feature">
          <Shield size={20} />
          <span>100% Safe & Hygienic</span>
        </div>
        <div className="footer-feature">
          <Award size={20} />
          <span>500+ Restaurants</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="footer-main">
        {/* Brand Column */}
        <div className="footer-brand-column">
          <div className="footer-logo-container">
            <span className="footer-logo-emoji">🍔</span>
            <h2 className="footer-logo-text">Foodify<span className="footer-ai-text">AI</span></h2>
          </div>
          <p className="footer-tagline">Lahore's Smart Food Delivery</p>
          <p className="footer-description">
            AI-powered food delivery across Lahore. Your favorite food, delivered smarter.
          </p>

          <div className="footer-contact-details">
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>+92 306-6590357</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>support@foodify.pk</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Lahore, Pakistan</span>
            </div>
          </div>

          <div className="footer-social-icons">
            <a href="#" className="footer-social-icon fb">
              <Facebook size={18} />
            </a>
            <a href="#" className="footer-social-icon insta">
              <Instagram size={18} />
            </a>
            <a href="#" className="footer-social-icon twitter">
              <Twitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h3 className="footer-column-title">Quick Links</h3>
          <ul className="footer-links-list">
            <li><a href="/">🏠 Home</a></li>
            <li><a href="/restaurants">🍽️ Restaurants</a></li>
            <li><a href="/categories">📁 Categories</a></li>
            <li><a href="/deals">🔥 Hot Deals</a></li>
            <li><a href="/favorites">❤️ Favorites</a></li>
            <li><a href="/orders">📦 My Orders</a></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer-column">
          <h3 className="footer-column-title">Support</h3>
          <ul className="footer-links-list">
            <li><a href="/help">❓ Help Center</a></li>
            <li><a href="/contact">📞 Contact Us</a></li>
            <li><a href="/faq">💬 FAQ</a></li>
            <li><a href="/privacy">🔒 Privacy Policy</a></li>
            <li><a href="/terms">📝 Terms & Conditions</a></li>
            <li><a href="/careers">💼 Careers</a></li>
          </ul>
        </div>

        {/* Cities & App */}
        <div className="footer-column">
          <h3 className="footer-column-title">Our Cities</h3>
          <div className="footer-cities-list">
            <span className="footer-city-tag">Lahore</span>
            <span className="footer-city-tag">Karachi</span>
            <span className="footer-city-tag">Islamabad</span>
            <span className="footer-city-tag">Rawalpindi</span>
            <span className="footer-city-tag">Faisalabad</span>
            <span className="footer-city-tag">Multan</span>
          </div>

          <div className="footer-ai-feature">
            <Sparkles size={16} />
            <div>
              <h4>AI-Powered</h4>
              <p>Smart recommendations</p>
            </div>
          </div>

          <div className="footer-download-section">
            <h4>Get Our App</h4>
            <div className="footer-app-badges">
              <a href="#" className="footer-app-badge">
                <span className="footer-badge-icon">📱</span>
                <div>
                  <small>GET IT ON</small>
                  <strong>Google Play</strong>
                </div>
              </a>
              <a href="#" className="footer-app-badge">
                <span className="footer-badge-icon">🍎</span>
                <div>
                  <small>Download on</small>
                  <strong>App Store</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>© {currentYear} Foodify AI Pakistan | Made with ❤️ in Lahore 🇵🇰</p>
        </div>
        <div className="footer-payment-methods">
          <span className="footer-payment-method">💵 Cash on Delivery</span>
          <span className="footer-payment-method">📱 JazzCash</span>
          <span className="footer-payment-method">💳 EasyPaisa</span>
          <span className="footer-payment-method">💳 Credit/Debit Cards</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;