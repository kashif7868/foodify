import HeroSection from "./Section/HeroSection";
import CartSection from "./Section/CartSection";
import RestaurantsSection from "./Section/RestaurantsSection";
import TodaySection from "./Section/TodaySection";
const Home: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <TodaySection />
      <CartSection />
      <RestaurantsSection />
    </main>
  );
};

export default Home;
