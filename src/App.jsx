import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./Components/LandingPage";
import Home from "./Components/pages/Home";
import Contact from "./Components/pages/Contact";
import Login from "./Components/pages/Login";
import Nuevo from "./Components/pages/NewUser";
import Panes from "./Components/pages/Panes";
import Facturas from "./Components/pages/Facturas";
import Pasteleria from "./Components/pages/Pasteleria";
import SandwichesMiga from "./Components/pages/SandwichesMiga";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Carritito from "./Components/Carritito";

const MainLayout = ({ children, toggleCarrito }) => (
  <div>
    <Header toggleCarrito={toggleCarrito} />
    {children}
    <Footer />
  </div>
);

export default function App() {
  const [carritoOpen, setCarritoOpen] = useState(false);

  const toggleCarrito = () => setCarritoOpen((prev) => !prev);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/home"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/home/panes"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <Panes />
            </MainLayout>
          }
        />
        <Route
          path="/home/facturas"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <Facturas />
            </MainLayout>
          }
        />
        <Route
          path="/home/pasteleria"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <Pasteleria />
            </MainLayout>
          }
        />
        <Route
          path="/home/sandwiches-miga"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <SandwichesMiga />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <Contact />
            </MainLayout>
          }
        />

        <Route
          path="/login"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <Login />
            </MainLayout>
          }
        />

        <Route
          path="/newuser"
          element={
            <MainLayout toggleCarrito={toggleCarrito}>
              <Nuevo />
            </MainLayout>
          }
        />
      </Routes>

      <Carritito isOpen={carritoOpen} onClose={toggleCarrito} />
    </Router>
  );
}
