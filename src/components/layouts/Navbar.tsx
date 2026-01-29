import React, { useState, useEffect } from "react";
import { 
  Home, 
  ShoppingCart, 
  User, 
  Utensils,
  ChefHat,
  Package,
  Heart,
  Search,
  X,
  Menu,
  LogOut,
  Star
} from "lucide-react";
import "../../assets/css/navbar.css";

interface NavbarProps {
  cartCount?: number;
  isHome?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount = 0, isHome = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Main navigation links
  const navLinks = [
    { 
      name: "Home", 
      link: "/", 
      icon: <Home size={20} />,
      mobileIcon: <Home size={22} />
    },
    { 
      name: "Restaurants", 
      link: "/restaurants", 
      icon: <Utensils size={20} />,
      mobileIcon: <Utensils size={22} />
    },
    { 
      name: "Categories", 
      link: "/categories", 
      icon: <ChefHat size={20} />,
      mobileIcon: <ChefHat size={22} />
    },
    { 
      name: "Favorites", 
      link: "/favorites", 
      icon: <Heart size={20} />,
      mobileIcon: <Heart size={22} />,
      badge: 3 // Example: 3 favorite restaurants
    },
    { 
      name: "My Orders", 
      link: "/orders", 
      icon: <Package size={20} />,
      mobileIcon: <Package size={22} />,
      badge: 2 // Example: 2 active orders
    }
  ];

  // Mobile bottom navigation items (simplified version)
  const mobileNavItems = [
    { name: "Home", link: "/", icon: <Home size={24} /> },
    { name: "Search", link: "/search", icon: <Search size={24} /> },
    { name: "Cart", link: "/cart", icon: <ShoppingCart size={24} /> },
    { name: "Orders", link: "/orders", icon: <Package size={24} /> },
    { name: "Profile", link: "/profile", icon: <User size={24} /> },
  ];

  // Search functionality (for homepage)
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-brand">
            <a href="/" className="logo">
              <div className="logo-icon">
                <span className="logo-emoji">🍔</span>
              </div>
              <div className="logo-text">
                <span className="logo-primary">Foodify</span>
                <span className="logo-secondary">AI</span>
              </div>
            </a>
          </div>

          {/* Search Bar (Only on Homepage) */}
          {isHome && (
            <div className="navbar-search desktop-only">
              <form onSubmit={handleSearch} className="search-form">
                <Search size={18} className="search-icon" />
                <input
                  type="text"
                  placeholder="Search restaurants, cuisines, dishes..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="clear-search"
                    onClick={() => setSearchQuery("")}
                  >
                    <X size={16} />
                  </button>
                )}
              </form>
            </div>
          )}

          {/* Desktop Navigation Links */}
          <div className="navbar-center desktop-only">
            <ul className="nav-links">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.link} 
                    className={`nav-link ${activeLink === item.name ? 'active' : ''}`}
                    onClick={() => setActiveLink(item.name)}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                    {item.badge && item.badge > 0 && (
                      <span className="nav-badge">{item.badge}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side Actions */}
          <div className="navbar-actions">
            {/* Cart with Count */}
            <a href="/cart" className="cart-btn">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
              <span className="cart-label desktop-only">Cart</span>
            </a>

            {/* User Profile/Login */}
            <div className="user-profile">
              {isLoggedIn ? (
                <div className="logged-in-user">
                  <div className="user-avatar-small">
                    <User size={18} />
                  </div>
                  <div className="user-info">
                    <span className="user-name">John</span>
                    <span className="user-rating">
                      <Star size={12} fill="#FFD700" />
                      <span>4.5</span>
                    </span>
                  </div>
                  <button 
                    className="logout-btn-small"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              ) : (
                <button
                  className="login-btn"
                  onClick={() => setIsLoggedIn(true)}
                >
                  <User size={18} />
                  <span className="desktop-only">Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (when not on homepage) */}
        {!isHome && isMobile && (
          <div className="mobile-search-container">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <Search size={18} className="mobile-search-icon" />
              <input
                type="text"
                placeholder="Search food, restaurants..."
                className="mobile-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* Mobile Side Menu */}
        <div className={`mobile-side-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-header">
            <div className="mobile-user-info">
              {isLoggedIn ? (
                <>
                  <div className="user-avatar-large">
                    <User size={28} />
                  </div>
                  <div className="user-details">
                    <h3>John Doe</h3>
                    <div className="user-stats">
                      <span className="stat">
                        <Star size={14} fill="#FFD700" />
                        <span>4.5</span>
                      </span>
                      <span className="stat">
                        <Package size={14} />
                        <span>12 Orders</span>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="guest-user">
                  <div className="guest-avatar">
                    <User size={40} />
                  </div>
                  <h3>Welcome to Foodify!</h3>
                  <p>Sign in to access your orders & favorites</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mobile-menu-content">
            <div className="mobile-menu-section">
              <h4>Navigation</h4>
              <ul className="mobile-nav-links">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.link}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setActiveLink(item.name);
                      }}
                      className={`mobile-nav-item ${activeLink === item.name ? 'active' : ''}`}
                    >
                      <div className="mobile-nav-icon">
                        {item.icon}
                        {item.badge && item.badge > 0 && (
                          <span className="mobile-nav-badge">{item.badge}</span>
                        )}
                      </div>
                      <span>{item.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mobile-menu-section">
              <h4>Quick Actions</h4>
              <div className="quick-actions">
                <button className="quick-action-btn">
                  <Package size={18} />
                  <span>Track Order</span>
                </button>
                <button className="quick-action-btn">
                  <Star size={18} />
                  <span>Rate Orders</span>
                </button>
                <button className="quick-action-btn">
                  <Heart size={18} />
                  <span>Favorites</span>
                </button>
              </div>
            </div>

            <div className="mobile-menu-section">
              <h4>Account</h4>
              <div className="account-links">
                <a href="/profile" className="account-link">Edit Profile</a>
                <a href="/addresses" className="account-link">Saved Addresses</a>
                <a href="/payments" className="account-link">Payment Methods</a>
                <a href="/help" className="account-link">Help Center</a>
              </div>
            </div>
          </div>
          
          <div className="mobile-menu-footer">
            {isLoggedIn ? (
              <button className="logout-btn-full" onClick={() => setIsLoggedIn(false)}>
                <LogOut size={18} />
                <span>Log Out</span>
              </button>
            ) : (
              <button className="signin-btn-full" onClick={() => setIsLoggedIn(true)}>
                <User size={18} />
                <span>Sign In / Register</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)} />
        )}
      </nav>

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <div className="mobile-bottom-nav">
          {mobileNavItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              className={`mobile-bottom-item ${
                item.name === "Cart" && cartCount > 0 ? "has-badge" : ""
              } ${activeLink === item.name ? 'active' : ''}`}
              onClick={() => {
                if (item.name === "Home") setActiveLink("Home");
                if (item.name === "Orders") setActiveLink("My Orders");
              }}
            >
              {item.icon}
              <span className="mobile-bottom-label">{item.name}</span>
              {item.name === "Cart" && cartCount > 0 && (
                <span className="mobile-cart-badge">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default Navbar;