import { Outlet } from "react-router-dom";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";
import Login from "./components/Login.jsx";
import Footer from "./components/footer/Footer.jsx";
import Register from "./components/Register.jsx";
function App() {
  return (
    <>
      <Header />
      <main>
        <Register />
        <Login />
      </main>
      <Footer />
    </>
  );
}

export default App;
