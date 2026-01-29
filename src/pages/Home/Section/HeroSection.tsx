import React from "react";
import "../../../assets/css/Home/HeroSection.css";

const HeroSection: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          Fast & Fresh <span>Food Delivery</span>
        </h1>

        <p>
          Order delicious meals from your favorite restaurants and get them
          delivered to your doorstep in minutes.
        </p>

        <div className="hero-actions">
          <input
            type="text"
            placeholder="Search food or restaurant..."
          />
          <button className="btn-primary">Search</button>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
          alt="Food delivery"
        />
      </div>
    </section>
  );
};

export default HeroSection;
