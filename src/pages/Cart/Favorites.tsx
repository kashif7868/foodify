import React, { useState } from "react";
import "../../assets/css/Cart/Favorites.css";
import { 
  Heart, 
  Star, 
  Clock, 
  Truck, 
  Plus, 
  Trash2, 
  Filter, 
  SortAsc, 
  ShoppingBag,
  ChevronLeft,
  MapPin,
  Sparkles
} from "lucide-react";
import favoritesData from "../../data/cart/favorites.json";

interface FavoriteItem {
  id: number;
  name: string;
  restaurant: string;
  rating: number;
  deliveryTime: string;
  price: number;
  image: string;
  tags: string[];
  cuisine: string;
  addedDate: string;
}

const Favorites: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(favoritesData.favorites);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filterFavorites = (items: FavoriteItem[]) => {
    if (activeCategory === "All") return items;
    
    const categoryMap: {[key: string]: string[]} = {
      "🍕 Italian": ["Italian", "Pizza"],
      "🍔 Fast Food": ["Fast Food", "Burger"],
      "🍛 Desi": ["Desi", "Pakistani", "Biryani"],
      "🍜 Chinese": ["Chinese", "Asian"],
      "🥗 Healthy": ["Healthy", "Vegan", "Salad"],
      "🥩 Premium": ["Premium", "Steak", "Grill"],
      "🥤 Drinks": ["Beverages", "Cafe", "Shake"]
    };
    
    const searchTerms = categoryMap[activeCategory] || [];
    return items.filter(item => 
      searchTerms.some(term => 
        item.cuisine.toLowerCase().includes(term.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(term.toLowerCase()))
      )
    );
  };

  const sortFavorites = (items: FavoriteItem[]) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "recent":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        default:
          return 0;
      }
    });
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const removeFromFavorites = (id: number) => {
    setFavorites(prev => prev.filter(item => item.id !== id));
    setSelectedItems(prev => prev.filter(itemId => itemId !== id));
  };

  const removeSelected = () => {
    setFavorites(prev => prev.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const addToCart = (id: number) => {
    console.log(`Added item ${id} to cart`);
    // Add to cart functionality
  };

  const addSelectedToCart = () => {
    selectedItems.forEach(id => addToCart(id));
    console.log(`Added ${selectedItems.length} items to cart`);
  };

  const filteredFavorites = sortFavorites(filterFavorites(favorites));

  return (
    <div className="favorites-page">
      {/* Header */}
      <header className="favorites-header">
        <div className="header-content">
          <button className="back-btn">
            <ChevronLeft size={20} />
            Back
          </button>
          <div className="title-section">
            <h1 className="page-title">
              <Heart size={28} fill="#ef4444" color="#ef4444" />
              {favoritesData.title}
            </h1>
            <p className="page-subtitle">{favoritesData.subtitle}</p>
          </div>
          <div className="header-stats">
            <div className="stat-item">
              <Heart size={18} />
              <span>{favorites.length} items</span>
            </div>
            <div className="stat-item">
              <MapPin size={18} />
              <span>Lahore</span>
            </div>
          </div>
        </div>
      </header>

      <div className="favorites-container">
        {/* Controls Section */}
        <div className="controls-section">
          <div className="controls-left">
            <div className="filter-group">
              <Filter size={18} />
              <span className="filter-label">Filter:</span>
              <div className="category-filters">
                {favoritesData.categories.map((category, index) => (
                  <button
                    key={index}
                    className={`category-filter ${activeCategory === category ? "active" : ""}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="controls-right">
            <div className="sort-group">
              <SortAsc size={18} />
              <select 
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recent">Recently Added</option>
                <option value="rating">Highest Rating</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {selectedItems.length > 0 && (
              <div className="selection-actions">
                <span className="selected-count">
                  {selectedItems.length} selected
                </span>
                <button className="action-btn remove-btn" onClick={removeSelected}>
                  <Trash2 size={16} />
                  Remove
                </button>
                <button className="action-btn add-cart-btn" onClick={addSelectedToCart}>
                  <ShoppingBag size={16} />
                  Add to Cart
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Favorites Grid */}
        <div className="favorites-grid">
          {filteredFavorites.length === 0 ? (
            <div className="empty-favorites">
              <div className="empty-icon">
                <Heart size={60} />
              </div>
              <h3>No favorites yet</h3>
              <p>Start adding your favorite food items by clicking the heart icon!</p>
              <button className="explore-btn">
                <Sparkles size={18} />
                Explore Restaurants
              </button>
            </div>
          ) : (
            filteredFavorites.map(item => (
              <div key={item.id} className="favorite-card">
                {/* Selection Checkbox */}
                <div className="selection-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                    className="item-checkbox"
                  />
                </div>

                {/* Image */}
                <div className="favorite-image">
                  <img src={item.image} alt={item.name} />
                  <div className="image-badges">
                    <span className="rating-badge">
                      <Star size={12} fill="#FFD700" />
                      {item.rating}
                    </span>
                    <span className="date-badge">
                      Added {formatDate(item.addedDate)}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="favorite-content">
                  <div className="favorite-header">
                    <div>
                      <h3 className="item-name">{item.name}</h3>
                      <p className="restaurant-name">{item.restaurant}</p>
                    </div>
                    <div className="price-section">
                      <span className="price">Rs. {item.price}</span>
                    </div>
                  </div>

                  <p className="cuisine">{item.cuisine}</p>

                  {/* Tags */}
                  <div className="item-tags">
                    {item.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="item-details">
                    <div className="detail-item">
                      <Clock size={14} />
                      <span>{item.deliveryTime}</span>
                    </div>
                    <div className="detail-item">
                      <Truck size={14} />
                      <span>Free Delivery</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="item-actions">
                    <button 
                      className="action-btn remove-favorite"
                      onClick={() => removeFromFavorites(item.id)}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                    <button 
                      className="action-btn add-to-cart"
                      onClick={() => addToCart(item.id)}
                    >
                      <Plus size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Actions Footer */}
        {favorites.length > 0 && (
          <div className="quick-actions-footer">
            <div className="actions-content">
              <div className="actions-info">
                <h3>Quick Actions</h3>
                <p>Manage your favorites easily</p>
              </div>
              <div className="action-buttons">
                <button className="clear-all-btn" onClick={() => setFavorites([])}>
                  <Trash2 size={18} />
                  Clear All Favorites
                </button>
                <button className="order-all-btn">
                  <ShoppingBag size={18} />
                  Order All Favorites
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;