import React, { useState } from "react";
import "../../assets/css/Cart/Cart.css";
import { 
  ShoppingBag, 
  Truck, 
  Shield, 
  Clock, 
  ChevronLeft, 
  Plus, 
  Minus, 
  Trash2, 
  Heart, 
  CreditCard,
  MapPin,
  Tag,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Chicken Biryani",
      restaurant: "Biryani Point",
      price: 850,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?auto=format&fit=crop&w=400",
      tags: ["🔥 Spicy", "🏆 Top Rated"],
      deliveryTime: "25-30 min"
    },
    {
      id: 2,
      name: "Cheese Pizza",
      restaurant: "Pizza Hut",
      price: 1200,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=400",
      tags: ["🧀 Extra Cheese", "🍕 Large"],
      deliveryTime: "20-25 min"
    },
    {
      id: 3,
      name: "Beef Burger",
      restaurant: "Burger Lab",
      price: 650,
      quantity: 3,
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400",
      tags: ["🍔 Double Patty", "🔥 Best Seller"],
      deliveryTime: "15-20 min"
    },
    {
      id: 4,
      name: "Chocolate Shake",
      restaurant: "Cafe Coffee Day",
      price: 350,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=400",
      tags: ["🍫 Chocolate", "🥤 Cold"],
      deliveryTime: "15-20 min"
    }
  ]);

  const deliveryFee = cartItems.length > 0 ? 100 : 0;
  const platformFee = 50;
  const discount = 200;

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = subtotal + deliveryFee + platformFee - discount;

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const addToFavorites = (id: number) => {
    console.log(`Added item ${id} to favorites`);
    // Add to favorites functionality
  };

  const applyCoupon = () => {
    const couponCode = (document.getElementById('coupon-input') as HTMLInputElement)?.value;
    if (couponCode) {
      console.log(`Applied coupon: ${couponCode}`);
      // Apply coupon logic
    }
  };

  const proceedToCheckout = () => {
    console.log("Proceeding to checkout");
    // Checkout logic
  };

  return (
    <div className="cart-page">
      {/* Header */}
      <header className="cart-header">
        <div className="header-content">
          <button className="back-btn">
            <ChevronLeft size={20} />
            Back
          </button>
          <h1 className="page-title">
            <ShoppingBag size={28} />
            My Cart
          </h1>
          <div className="cart-stats">
            <span className="item-count">{cartItems.length} items</span>
            <span className="total-price">Rs. {total.toLocaleString()}</span>
          </div>
        </div>
      </header>

      <div className="cart-container">
        {/* Left Side - Cart Items */}
        <div className="cart-items-section">
          {/* Delivery Address */}
          <div className="delivery-address-card">
            <div className="address-header">
              <MapPin size={20} />
              <div className="address-info">
                <h3>Delivery Address</h3>
                <p>123 Main Street, Gulberg, Lahore, Pakistan</p>
              </div>
              <button className="change-address-btn">Change</button>
            </div>
            <div className="address-details">
              <div className="detail-item">
                <Clock size={16} />
                <span>Delivery in 30-40 min</span>
              </div>
              <div className="detail-item">
                <Truck size={16} />
                <span>Free delivery on orders above Rs. 1000</span>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="cart-items-list">
            <h2 className="section-title">Your Order</h2>
            
            {cartItems.length === 0 ? (
              <div className="empty-cart">
                <ShoppingBag size={60} />
                <h3>Your cart is empty</h3>
                <p>Add delicious food items to get started!</p>
                <button className="shop-now-btn">Browse Restaurants</button>
              </div>
            ) : (
              <>
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item-card">
                    <div className="item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    
                    <div className="item-details">
                      <div className="item-header">
                        <div>
                          <h3 className="item-name">{item.name}</h3>
                          <p className="restaurant-name">{item.restaurant}</p>
                        </div>
                        <div className="item-price">Rs. {item.price}</div>
                      </div>

                      <div className="item-tags">
                        {item.tags.map((tag, index) => (
                          <span key={index} className="tag">{tag}</span>
                        ))}
                        <span className="delivery-time">
                          <Clock size={12} />
                          {item.deliveryTime}
                        </span>
                      </div>

                      <div className="item-actions">
                        <div className="quantity-controls">
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity">{item.quantity}</span>
                          <button 
                            className="quantity-btn"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="action-buttons">
                          <button 
                            className="action-btn favorite"
                            onClick={() => addToFavorites(item.id)}
                          >
                            <Heart size={16} />
                            Save
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 size={16} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Recommended Items */}
                <div className="recommended-section">
                  <h3 className="recommended-title">
                    <Sparkles size={18} />
                    You might also like
                  </h3>
                  <div className="recommended-items">
                    <div className="recommended-item">
                      <img src="https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=400" alt="Butter Chicken" />
                      <div className="recommended-info">
                        <h4>Butter Chicken</h4>
                        <p>Rs. 950</p>
                        <button className="add-btn">+ Add</button>
                      </div>
                    </div>
                    <div className="recommended-item">
                      <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400" alt="Chow Mein" />
                      <div className="recommended-info">
                        <h4>Chow Mein</h4>
                        <p>Rs. 550</p>
                        <button className="add-btn">+ Add</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="order-summary-section">
          <div className="order-summary-card">
            <h2 className="summary-title">Order Summary</h2>
            
            <div className="summary-details">
              <div className="detail-row">
                <span>Subtotal ({cartItems.length} items)</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              
              <div className="detail-row">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
              </div>
              
              <div className="detail-row">
                <span>Platform Fee</span>
                <span>Rs. {platformFee}</span>
              </div>
              
              <div className="detail-row discount">
                <span>Discount</span>
                <span>- Rs. {discount}</span>
              </div>

              <div className="total-row">
                <span>Total</span>
                <span className="total-amount">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="coupon-section">
              <div className="coupon-input-group">
                <Tag size={18} />
                <input 
                  type="text" 
                  id="coupon-input"
                  placeholder="Enter coupon code" 
                  className="coupon-input"
                />
                <button className="apply-btn" onClick={applyCoupon}>Apply</button>
              </div>
              <div className="available-coupons">
                <span className="coupon-tag">WELCOME20 - 20% OFF</span>
                <span className="coupon-tag">FREEDEL - Free Delivery</span>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <h3>Payment Method</h3>
              <div className="method-options">
                <label className="method-option">
                  <input type="radio" name="payment" defaultChecked />
                  <CreditCard size={18} />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="method-option">
                  <input type="radio" name="payment" />
                  <span className="method-icon">📱</span>
                  <span>JazzCash</span>
                </label>
                <label className="method-option">
                  <input type="radio" name="payment" />
                  <span className="method-icon">💳</span>
                  <span>EasyPaisa</span>
                </label>
                <label className="method-option">
                  <input type="radio" name="payment" />
                  <span className="method-icon">💵</span>
                  <span>Cash on Delivery</span>
                </label>
              </div>
            </div>

            {/* Safety Features */}
            <div className="safety-features">
              <div className="safety-item">
                <Shield size={18} />
                <span>Safe & Secure Payment</span>
              </div>
              <div className="safety-item">
                <Truck size={18} />
                <span>Contactless Delivery</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button 
              className="checkout-btn"
              onClick={proceedToCheckout}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>

            <p className="terms-note">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>

          {/* Savings Card */}
          <div className="savings-card">
            <div className="savings-header">
              <h3>🎉 You're Saving!</h3>
              <span className="savings-amount">Rs. {discount}</span>
            </div>
            <p className="savings-message">
              Great choice! You're getting the best deals on your favorite food.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;