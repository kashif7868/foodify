// Navbar.tsx
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
  Star,
  MapPin,
  Bell,
  HelpCircle
} from "lucide-react";
import "../../assets/css/navbar.css";

// Types
export interface NavItem {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
  mobileIcon: React.ReactNode;
  badge?: number;
  requiresAuth?: boolean;
}

export interface UserData {
  name: string;
  email: string;
  avatar?: string;
  rating: number;
  orderCount: number;
}

export interface NavbarProps {
  cartCount?: number;
  user?: UserData | null;
  onLogin?: () => void;
  onLogout?: () => void;
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  cartCount = 0, 
  user = null,
  onLogin,
  onLogout,
  onSearch,
  showSearch = true
}) => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string>("/");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [notifications, setNotifications] = useState<number>(3); // Example notification count

  // Navigation configuration - Easy to modify
  const navigationConfig: NavItem[] = [
    { 
      id: 'home',
      name: "Home", 
      path: "/", 
      icon: <Home size={20} />,
      mobileIcon: <Home size={22} />
    },
    { 
      id: 'restaurants',
      name: "Restaurants", 
      path: "/restaurants", 
      icon: <Utensils size={20} />,
      mobileIcon: <Utensils size={22} />
    },
    { 
      id: 'categories',
      name: "Categories", 
      path: "/categories", 
      icon: <ChefHat size={20} />,
      mobileIcon: <ChefHat size={22} />
    },
    { 
      id: 'favorites',
      name: "Favorites", 
      path: "/favorites", 
      icon: <Heart size={20} />,
      mobileIcon: <Heart size={22} />,
      badge: 5,
      requiresAuth: true
    },
    { 
      id: 'orders',
      name: "My Orders", 
      path: "/orders", 
      icon: <Package size={20} />,
      mobileIcon: <Package size={22} />,
      badge: 2,
      requiresAuth: true
    }
  ];

  // Mobile navigation items - Simplified for bottom bar
  const mobileNavItems: NavItem[] = [
    { 
      id: 'mobile-home',
      name: "Home", 
      path: "/", 
      icon: <Home size={24} />,
      mobileIcon: <Home size={24} />
    },
    { 
      id: 'mobile-search',
      name: "Search", 
      path: "/search", 
      icon: <Search size={24} />,
      mobileIcon: <Search size={24} />
    },
    { 
      id: 'mobile-cart',
      name: "Cart", 
      path: "/cart", 
      icon: <ShoppingCart size={24} />,
      mobileIcon: <ShoppingCart size={24} />
    },
    { 
      id: 'mobile-orders',
      name: "Orders", 
      path: "/orders", 
      icon: <Package size={24} />,
      mobileIcon: <Package size={24} />
    },
    { 
      id: 'mobile-profile',
      name: "Profile", 
      path: "/profile", 
      icon: <User size={24} />,
      mobileIcon: <User size={24} />
    }
  ];

  // Account menu items
  const accountMenuItems = [
    { icon: <User size={18} />, label: "My Profile", path: "/profile" },
    { icon: <Package size={18} />, label: "My Orders", path: "/orders" },
    { icon: <Heart size={18} />, label: "Favorites", path: "/favorites" },
    { icon: <MapPin size={18} />, label: "Addresses", path: "/addresses" },
    { icon: <HelpCircle size={18} />, label: "Help Center", path: "/help" }
  ];

  // Effects
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Set active path based on current URL
    const currentPath = window.location.pathname;
    setActivePath(currentPath);
  }, []);

  // Event handlers
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      if (onSearch) {
        onSearch(searchQuery);
      } else {
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
      }
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    } else {
      // Default behavior
      window.location.href = "/login";
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsMenuOpen(false);
  };

  const handleNavClick = (path: string) => {
    setActivePath(path);
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Helper functions
  const getActiveNavItem = () => {
    return navigationConfig.find(item => item.path === activePath) || navigationConfig[0];
  };

  const getFilteredNavItems = (isMobileView: boolean = false) => {
    if (isMobileView) {
      return mobileNavItems;
    }
    return navigationConfig.filter(item => 
      !item.requiresAuth || (item.requiresAuth && user)
    );
  };

  // Components
  const Logo = () => (
    <div className="navbar-brand">
      <a href="/" className="logo" onClick={() => handleNavClick("/")}>
        <div className="logo-icon">
          <span className="logo-emoji">🍔</span>
        </div>
        <div className="logo-text">
          <span className="logo-primary">Foodify</span>
          <span className="logo-secondary">AI</span>
        </div>
      </a>
    </div>
  );

  const SearchBar = () => (
    <div className="navbar-search">
      <form onSubmit={handleSearch} className="search-form">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Search restaurants, dishes, cuisines..."
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
  );

  const DesktopNavigation = () => (
    <div className="navbar-center">
      <ul className="nav-links">
        {getFilteredNavItems().map((item) => (
          <li key={item.id}>
            <a 
              href={item.path} 
              className={`nav-link ${activePath === item.path ? 'active' : ''}`}
              onClick={() => handleNavClick(item.path)}
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
  );

  const NotificationButton = () => (
    <a href="/notifications" className="notification-btn">
      <Bell size={20} />
      {notifications > 0 && (
        <span className="notification-badge">
          {notifications > 9 ? '9+' : notifications}
        </span>
      )}
    </a>
  );

  const CartButton = () => (
    <a 
      href="/cart" 
      className="cart-btn"
      onClick={() => handleNavClick("/cart")}
    >
      <ShoppingCart size={22} />
      {cartCount > 0 && (
        <span className="cart-count">
          {cartCount > 9 ? '9+' : cartCount}
        </span>
      )}
      <span className="cart-label">Cart</span>
    </a>
  );

  const UserProfile = () => {
    if (user) {
      return (
        <div className="user-profile-dropdown">
          <button 
            className="user-profile-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className="user-info">
              <span className="user-name">{user.name.split(' ')[0]}</span>
              <span className="user-rating">
                <Star size={12} fill="#FFD700" />
                <span>{user.rating.toFixed(1)}</span>
              </span>
            </div>
          </button>
          
          {isMenuOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <h4>{user.name}</h4>
                <p>{user.email}</p>
              </div>
              <div className="dropdown-items">
                {accountMenuItems.map((item, index) => (
                  <a 
                    key={index}
                    href={item.path}
                    className="dropdown-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
              <div className="dropdown-footer">
                <button className="logout-btn" onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <button className="login-btn" onClick={handleLogin}>
        <User size={18} />
        <span>Sign In</span>
      </button>
    );
  };

  const MobileMenuButton = () => (
    <button
      className="mobile-menu-btn"
      onClick={() => setIsMenuOpen(!isMenuOpen)}
      aria-label="Toggle menu"
    >
      {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
    </button>
  );

  const MobileSideMenu = () => (
    <>
      <div className={`mobile-side-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-header">
          <div className="mobile-user-info">
            {user ? (
              <>
                <div className="user-avatar-large">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <User size={28} />
                  )}
                </div>
                <div className="user-details">
                  <h3>{user.name}</h3>
                  <div className="user-stats">
                    <span className="stat">
                      <Star size={14} fill="#FFD700" />
                      <span>{user.rating.toFixed(1)}</span>
                    </span>
                    <span className="stat">
                      <Package size={14} />
                      <span>{user.orderCount} Orders</span>
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="guest-user">
                <div className="guest-avatar">
                  <User size={40} />
                </div>
                <h3>Welcome Guest!</h3>
                <p>Sign in to unlock all features</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <h4>Navigation</h4>
            <ul className="mobile-nav-links">
              {getFilteredNavItems().map((item) => (
                <li key={item.id}>
                  <a
                    href={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`mobile-nav-item ${activePath === item.path ? 'active' : ''}`}
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

          {user && (
            <div className="mobile-menu-section">
              <h4>Quick Actions</h4>
              <div className="quick-actions">
                <a href="/track-order" className="quick-action-btn">
                  <Package size={18} />
                  <span>Track Order</span>
                </a>
                <a href="/offers" className="quick-action-btn">
                  <Tag size={18} />
                  <span>Offers</span>
                </a>
                <a href="/help" className="quick-action-btn">
                  <HelpCircle size={18} />
                  <span>Help</span>
                </a>
              </div>
            </div>
          )}
        </div>
        
        <div className="mobile-menu-footer">
          {user ? (
            <button className="logout-btn-full" onClick={handleLogout}>
              <LogOut size={18} />
              <span>Log Out</span>
            </button>
          ) : (
            <button className="signin-btn-full" onClick={handleLogin}>
              <User size={18} />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
      
      {isMenuOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );

  const MobileBottomNavigation = () => (
    <div className="mobile-bottom-nav">
      {getFilteredNavItems(true).map((item) => (
        <a
          key={item.id}
          href={item.path}
          className={`mobile-bottom-item ${
            activePath === item.path ? 'active' : ''
          } ${item.id === 'mobile-cart' && cartCount > 0 ? 'has-badge' : ''}`}
          onClick={() => handleNavClick(item.path)}
        >
          {item.mobileIcon}
          <span className="mobile-bottom-label">{item.name}</span>
          {item.id === 'mobile-cart' && cartCount > 0 && (
            <span className="mobile-cart-badge">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </a>
      ))}
    </div>
  );

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Navigation Links (Desktop only) */}
          <DesktopNavigation />

          {/* Right: Actions */}
          <div className="navbar-actions">
            {/* Search (Mobile only) */}
            {isMobile && showSearch && <SearchBar />}
            
            {/* Notifications (Desktop only) */}
            {!isMobile && <NotificationButton />}
            
            {/* Cart */}
            <CartButton />
            
            {/* User Profile / Login */}
            {!isMobile && <UserProfile />}
            
            {/* Mobile Menu Button */}
            <MobileMenuButton />
          </div>
        </div>

        {/* Mobile Side Menu */}
        {isMobile && <MobileSideMenu />}
      </nav>

      {/* Mobile Bottom Navigation */}
      {isMobile && <MobileBottomNavigation />}
    </>
  );
};

export default Navbar;