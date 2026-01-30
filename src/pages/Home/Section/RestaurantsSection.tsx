import React, { useState } from "react";
import "../../../assets/css/Home/RestaurantsSection.css";
import { Star, Clock, MapPin, DollarSign, ChevronRight, Filter } from "lucide-react";
import restaurantsData from "../../../data/home/restaurantsSection.json";

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  deliveryFee: string;
  minOrder: number;
  image: string;
  tags: string[];
  isOpen: boolean;
  discount: string;
}

const RestaurantsSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("rating");
  const [showOnlyOpen, setShowOnlyOpen] = useState<boolean>(true);

  const sortRestaurants = (restaurants: Restaurant[]) => {
    return [...restaurants].sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime":
          const timeA = parseInt(a.deliveryTime.split('-')[0]);
          const timeB = parseInt(b.deliveryTime.split('-')[0]);
          return timeA - timeB;
        case "minOrder":
          return a.minOrder - b.minOrder;
        default:
          return 0;
      }
    });
  };

  const filterRestaurants = (restaurants: Restaurant[]) => {
    let filtered = restaurants;
    
    // Filter by category
    if (activeFilter !== "All") {
      const filterText = activeFilter.replace(/[^a-zA-Z]/g, '').toLowerCase();
      filtered = filtered.filter(restaurant => 
        restaurant.cuisine.toLowerCase().includes(filterText) ||
        restaurant.tags.some(tag => tag.toLowerCase().includes(filterText))
      );
    }
    
    // Filter by open status
    if (showOnlyOpen) {
      filtered = filtered.filter(restaurant => restaurant.isOpen);
    }
    
    return filtered;
  };

  const filteredRestaurants = sortRestaurants(
    filterRestaurants(restaurantsData.restaurants)
  );

  return (
    <section className="restaurants-section">
      <div className="section-header">
        <div className="header-content">
          <h2 className="section-title">{restaurantsData.title}</h2>
          <p className="section-subtitle">{restaurantsData.subtitle}</p>
        </div>
        <button className="view-all-btn">
          View All Restaurants
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Filters and Sort Controls */}
      <div className="controls-container">
        <div className="filter-controls">
          <div className="filter-group">
            <Filter size={18} />
            <span className="filter-label">Filters:</span>
          </div>
          
          {/* Category Filters */}
          <div className="category-filters">
            <button 
              className={`category-filter ${activeFilter === "All" ? "active" : ""}`}
              onClick={() => setActiveFilter("All")}
            >
              All
            </button>
            {restaurantsData.filters.map((filter, index) => (
              <button
                key={index}
                className={`category-filter ${activeFilter === filter ? "active" : ""}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Controls */}
        <div className="sort-controls">
          <div className="sort-group">
            <label className="sort-label">Sort by:</label>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Highest Rating</option>
              <option value="deliveryTime">Fastest Delivery</option>
              <option value="minOrder">Lowest Minimum Order</option>
            </select>
          </div>
          
          <div className="toggle-group">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showOnlyOpen}
                onChange={(e) => setShowOnlyOpen(e.target.checked)}
                className="toggle-checkbox"
              />
              <span className="toggle-slider"></span>
              <span className="toggle-text">Open Now</span>
            </label>
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="restaurants-grid">
        {filteredRestaurants.map((restaurant: Restaurant) => (
          <div key={restaurant.id} className="restaurant-card">
            {/* Discount Badge */}
            {restaurant.discount && (
              <div className="discount-badge">
                <span className="discount-text">{restaurant.discount}</span>
              </div>
            )}

            {/* Restaurant Status */}
            <div className={`status-badge ${restaurant.isOpen ? "open" : "closed"}`}>
              {restaurant.isOpen ? "🟢 Open Now" : "🔴 Closed"}
            </div>

            {/* Restaurant Image */}
            <div className="restaurant-image-container">
              <img 
                src={restaurant.image} 
                alt={restaurant.name} 
                className="restaurant-image" 
              />
              <div className="image-overlay">
                <button className="quick-view-btn">
                  Quick View
                </button>
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="restaurant-info">
              <div className="restaurant-header">
                <h3 className="restaurant-name">{restaurant.name}</h3>
                <div className="rating-container">
                  <Star size={16} fill="#FFD700" />
                  <span className="rating">{restaurant.rating}</span>
                  <span className="reviews">({restaurant.reviews} reviews)</span>
                </div>
              </div>

              <p className="cuisine">{restaurant.cuisine}</p>

              {/* Tags */}
              <div className="restaurant-tags">
                {restaurant.tags.slice(0, 3).map((tag, index) => (
                  <span key={index} className="restaurant-tag">{tag}</span>
                ))}
                {restaurant.tags.length > 3 && (
                  <span className="more-tags">+{restaurant.tags.length - 3}</span>
                )}
              </div>

              {/* Details */}
              <div className="restaurant-details">
                <div className="detail-row">
                  <div className="detail-item">
                    <Clock size={14} />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="detail-item">
                    <DollarSign size={14} />
                    <span>{restaurant.deliveryFee} delivery</span>
                  </div>
                </div>
                <div className="detail-row">
                  <div className="detail-item">
                    <MapPin size={14} />
                    <span>Min order: Rs. {restaurant.minOrder}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="restaurant-actions">
                <button className="view-menu-btn">
                  View Menu
                </button>
                <button className="order-now-btn">
                  Order Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRestaurants.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🏪</div>
          <h3>No restaurants found</h3>
          <p>Try changing your filters or try again later</p>
          <button 
            className="reset-filters-btn"
            onClick={() => {
              setActiveFilter("All");
              setShowOnlyOpen(true);
            }}
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Show More Button */}
      {filteredRestaurants.length > 0 && (
        <div className="load-more-container">
          <button className="load-more-btn">
            Load More Restaurants
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </section>
  );
};

export default RestaurantsSection;