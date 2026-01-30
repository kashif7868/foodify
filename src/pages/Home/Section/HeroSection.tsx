import React, { useState, useEffect } from "react";
import "../../../assets/css/Home/HeroSection.css";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroData from "../../../data/home/heroSection.json";

const HeroSection: React.FC = () => {
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const foods = heroData.foods;

  // Auto change food every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentFoodIndex((prevIndex) => 
        prevIndex === foods.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, foods.length]);

  const nextFood = () => {
    setCurrentFoodIndex((prevIndex) => 
      prevIndex === foods.length - 1 ? 0 : prevIndex + 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const prevFood = () => {
    setCurrentFoodIndex((prevIndex) => 
      prevIndex === 0 ? foods.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
      </div>

      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            {heroData.title}
            <span className="highlight">{heroData.highlight}</span>
          </h1>
          
          <p className="hero-subtitle">{heroData.subtitle}</p>

          <div className="hero-features">
            {heroData.features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="hero-cta">
            <button className="cta-primary">
              {heroData.cta.primary.text}
              <ArrowRight size={20} />
            </button>
            <button className="cta-secondary">
              {heroData.cta.secondary.text}
            </button>
          </div>

          <div className="hero-stats">
            {heroData.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Food Slider */}
        <div className="food-slider-container">
          <div className="food-slider">
            <div className="food-slide">
              <img 
                src={foods[currentFoodIndex].image} 
                alt={foods[currentFoodIndex].name}
                className="food-image"
              />
              
              <div className="food-info">
                <span className="food-category">{foods[currentFoodIndex].category}</span>
                <h3 className="food-name">{foods[currentFoodIndex].name}</h3>
              </div>

              <div className="food-slider-controls">
                <button className="slider-btn prev-btn" onClick={prevFood}>
                  <ChevronLeft size={20} />
                </button>
                
                <div className="slider-dots">
                  {foods.map((_, index) => (
                    <button
                      key={index}
                      className={`slider-dot ${index === currentFoodIndex ? 'active' : ''}`}
                      onClick={() => {
                        setCurrentFoodIndex(index);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                    />
                  ))}
                </div>
                
                <button className="slider-btn next-btn" onClick={nextFood}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="all-categories">
            <h4>Popular Categories</h4>
            <div className="categories-list">
              {foods.map((food, index) => (
                <div 
                  key={food.id}
                  className={`category-item ${index === currentFoodIndex ? 'active' : ''}`}
                  onClick={() => {
                    setCurrentFoodIndex(index);
                    setIsAutoPlaying(false);
                    setTimeout(() => setIsAutoPlaying(true), 5000);
                  }}
                >
                  <span className="category-icon">{food.category.split(' ')[0]}</span>
                  <span className="category-name">{food.category.split(' ')[1]}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="delivery-card">
            <div className="delivery-header">
              <div className="driver-avatar">
                <span>{heroData.delivery.icon}</span>
              </div>
              <div className="driver-info">
                <h4>{heroData.delivery.title}</h4>
                <p>{heroData.delivery.status}</p>
              </div>
              <div className="delivery-time">
                <span>⏱️</span>
                <span>{heroData.delivery.time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;