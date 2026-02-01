import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Cart from "../../pages/Cart/Cart";
import NotFound from "../../pages/NotFound";
import Favorites from "../../pages/Cart/Favorites";
import MyOrders from "../../pages/Cart/MyOrders";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
