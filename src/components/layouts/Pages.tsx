import { Routes, Route } from "react-router-dom";
import Home from "../../pages/Home/Home";
import Cart from "../../pages/Cart/Cart";
import NotFound from "../../pages/NotFound";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Pages;
