import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { useState, useEffect } from 'react';
import type { User } from './types/user';
export const App = () => {
  const [user, setUser] = useState<User | null>(null);
  
  // const [activeCity, setActiveCity] = useState('Вся Україна');

  const [favorites, setFavorites] = useState([]);

  // load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.find((p) => p.id === product.id);

      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <>
      <div className="page">
        <Navbar />
        <div className="main-and-footer">
          {/* <Outlet context={{ user, setUser, products, setProducts, activeCity, setActiveCity }} /> */}
          <Outlet context={{ user, setUser, favorites, toggleFavorite }} />
          <Footer />
        </div>
      </div>
    </>
  );
  };

