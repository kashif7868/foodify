import React, { useState, useEffect } from "react";
import "../../../assets/css/Home/TodaySection.css";
import { Clock, Star, Flame, Timer, ShoppingBag, ChevronRight } from "lucide-react";
import todayData from "../../../data/home/todaySection.json";

interface SpecialItem {
  id: number;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: string;
  availableUntil: string;
  image: string;
  tags: string[];
  restaurant: string;
  rating: number;
  ordersLeft: number;
}

const TodaySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const endTime = new Date();
    const [hours, minutes] = todayData.countdown.endTime.split(':').map(Number);
    
    endTime.setHours(hours, minutes, 0, 0);
    
    if (endTime < now) {
      endTime.setDate(endTime.getDate() + 1);
    }
    
    const difference = endTime.getTime() - now.getTime();
    
    const hoursLeft = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutesLeft = Math.floor((difference / 1000 / 60) % 60);
    const secondsLeft = Math.floor((difference / 1000) % 60);
    
    return { hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft };
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  const addToCart = (itemId: number) => {
    console.log(`Added special item ${itemId} to cart`);
    // Add to cart functionality
  };

  const getTimeColor = (ordersLeft: number) => {
    if (ordersLeft <= 3) return '#ef4444';
    if (ordersLeft <= 8) return '#f97316';
    return '#22c55e';
  };

  return (
    <section className="today-section">
      {/* Countdown Timer Banner */}
      <div className="countdown-banner">
        <div className="countdown-content">
          <div className="countdown-header">
            <Timer size={24} />
            <h3>{todayData.countdown.title}</h3>
          </div>
          <div className="countdown-timer">
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.hours)}</span>
              <span className="time-label">Hours</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.minutes)}</span>
              <span className="time-label">Minutes</span>
            </div>
            <span className="time-separator">:</span>
            <div className="time-unit">
              <span className="time-value">{formatTime(timeLeft.seconds)}</span>
              <span className="time-label">Seconds</span>
            </div>
          </div>
          <p className="countdown-message">{todayData.countdown.message}</p>
        </div>
        <div className="fire-icon">
          <Flame size={40} />
        </div>
      </div>

      {/* Section Header */}
      <div className="section-header">
        <div className="header-content">
          <div className="title-wrapper">
            <h2 className="section-title">{todayData.title}</h2>
            <span className="today-badge">TODAY ONLY</span>
          </div>
          <p className="section-subtitle">{todayData.subtitle}</p>
        </div>
        <button className="view-all-btn">
          View All Deals
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Specials Grid */}
      <div className="specials-grid">
        {todayData.specials.map((item: SpecialItem) => (
          <div key={item.id} className="special-card">
            {/* Discount Badge */}
            <div className="discount-badge">
              <span className="discount-text">{item.discount}</span>
            </div>

            {/* Limited Stock Badge */}
            {item.ordersLeft <= 5 && (
              <div className="stock-badge">
                <ShoppingBag size={14} />
                <span>Only {item.ordersLeft} left!</span>
              </div>
            )}

            {/* Image */}
            <div className="special-image-container">
              <img src={item.image} alt={item.name} className="special-image" />
              <div className="image-overlay">
                <button 
                  className="quick-add-btn"
                  onClick={() => addToCart(item.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="special-content">
              <div className="special-header">
                <div className="restaurant-info">
                  <h4 className="restaurant-name">{item.restaurant}</h4>
                  <div className="rating">
                    <Star size={14} fill="#FFD700" />
                    <span>{item.rating}</span>
                  </div>
                </div>
                <div className="time-badge" style={{ color: getTimeColor(item.ordersLeft) }}>
                  <Clock size={14} />
                  <span>Until {item.availableUntil}</span>
                </div>
              </div>

              <h3 className="item-name">{item.name}</h3>
              <p className="item-description">{item.description}</p>

              {/* Tags */}
              <div className="item-tags">
                {item.tags.map((tag, index) => (
                  <span key={index} className="item-tag">{tag}</span>
                ))}
              </div>

              {/* Price */}
              <div className="price-section">
                <div className="price-wrapper">
                  <span className="discounted-price">Rs. {item.discountedPrice}</span>
                  <span className="original-price">Rs. {item.originalPrice}</span>
                  <span className="savings">
                    Save Rs. {item.originalPrice - item.discountedPrice}
                  </span>
                </div>
                
                {/* Progress Bar for Orders */}
                <div className="orders-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${100 - (item.ordersLeft / 20 * 100)}%`,
                        background: getTimeColor(item.ordersLeft)
                      }}
                    ></div>
                  </div>
                  <div className="orders-left">
                    <ShoppingBag size={12} />
                    <span>{item.ordersLeft} orders available</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="special-actions">
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(item.id)}
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                  <button className="order-now-btn">
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="cta-section">
        <div className="cta-content">
          <h3>Don't Miss Out!</h3>
          <p>These deals are available only today. Order now before they're gone!</p>
          <button className="cta-button">
            <Flame size={20} />
            Grab All Deals
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="cta-image">
          <div className="emoji-icon">🎁</div>
        </div>
      </div>
    </section>
  );
};

export default TodaySection;