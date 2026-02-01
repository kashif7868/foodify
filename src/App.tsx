import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Pages from "./components/layouts/Pages";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="page-content">
        <Pages />
      </main>
      <Footer />
    </>
  );
}

export default App;
