import React, { useState } from "react";
import "../../../assets/css/Home/CartSection.css";
import { Star, Clock, Truck, Heart, Plus, Minus } from "lucide-react";
import cartData from "../../../data/home/cartSection.json";

interface CartItem {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  rating: number;
  deliveryTime: string;
  image: string;
  tags: string[];
}

const CartSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    cartData.items.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );
  const [favorites, setFavorites] = useState<number[]>([]);

  const addToCart = (itemId: number) => {
    console.log(`Added item ${itemId} to cart`);
  };

  const increaseQuantity = (itemId: number) => {
    setQuantities(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const decreaseQuantity = (itemId: number) => {
    if (quantities[itemId] > 1) {
      setQuantities(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    }
  };

  const toggleFavorite = (itemId: number) => {
    setFavorites(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const filteredItems = activeFilter === "All" 
    ? cartData.items 
    : cartData.items.filter(item => 
        item.tags.some(tag => tag.includes(activeFilter.replace(/[^a-zA-Z]/g, '')))
      );

  return (
    <section className="cart-section">
      <div className="section-header">
        <div className="header-content">
          <h2 className="section-title">{cartData.title}</h2>
          <p className="section-subtitle">{cartData.subtitle}</p>
        </div>
        <button className="view-all-btn">View All →</button>
      </div>

      {/* Filters */}
      <div className="filter-tabs">
        <button 
          className={`filter-tab ${activeFilter === "All" ? "active" : ""}`}
          onClick={() => setActiveFilter("All")}
        >
          All Items
        </button>
        {cartData.filters.map((filter, index) => (
          <button
            key={index}
            className={`filter-tab ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Food Items Grid */}
      <div className="food-grid">
        {filteredItems.map((item: CartItem) => (
          <div key={item.id} className="food-card">
            {/* Favorite Button */}
            <button 
              className={`favorite-btn ${favorites.includes(item.id) ? "active" : ""}`}
              onClick={() => toggleFavorite(item.id)}
            >
              <Heart size={18} fill={favorites.includes(item.id) ? "#FF6B35" : "none"} />
            </button>

            {/* Image */}
            <div className="food-image-container">
              <img src={item.image} alt={item.name} className="food-image" />
              <div className="image-overlay">
                <span className="rating-badge">
                  <Star size={12} fill="#FFD700" />
                  {item.rating}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="food-content">
              <div className="food-header">
                <h3 className="food-name">{item.name}</h3>
                <p className="restaurant-name">{item.restaurant}</p>
              </div>

              {/* Tags */}
              <div className="food-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="food-tag">{tag}</span>
                ))}
              </div>

              {/* Details */}
              <div className="food-details">
                <div className="detail-item">
                  <Clock size={14} />
                  <span>{item.deliveryTime}</span>
                </div>
                <div className="detail-item">
                  <Truck size={14} />
                  <span>Free Delivery</span>
                </div>
              </div>

              {/* Price & Actions */}
              <div className="food-footer">
                <div className="price-section">
                  <span className="price">Rs. {item.price}</span>
                  <span className="price-note">per serving</span>
                </div>
                
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <Minus size={16} />
                  </button>
                  <span className="quantity">{quantities[item.id] || 1}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button 
                  className="add-to-cart-btn"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🍽️</div>
          <h3>No items found</h3>
          <p>Try selecting a different category</p>
        </div>
      )}
    </section>
  );
};

export default CartSection;