import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Home from "./pages/Home/Home";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Home />
      </main>
      <Footer />
    </>
  );
}

export default App;
