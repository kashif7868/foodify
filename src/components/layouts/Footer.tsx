import "../../assets/css/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2 className="footer-logo">
            Foodify <span>AI</span>
          </h2>
          <p className="footer-tagline">
            Smart food delivery powered by artificial intelligence.
          </p>
        </div>

        <div className="footer-links">

          <div className="footer-column">
            <h4>Explore</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/restaurants">Restaurants</a></li>
              <li><a href="/orders">My Orders</a></li>
              <li><a href="/cart">Cart</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Help Center</a></li>
              <li><a href="#">How It Works</a></li>
              <li><a href="#">Delivery Info</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>AI Assistant</h4>
            <ul>
              <li><span className="ai-text">Available 24/7</span></li>
              <li><span className="ai-text">Smart food suggestions</span></li>
              <li><span className="ai-text">Order help & tracking</span></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Foodify AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
