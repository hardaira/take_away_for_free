import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { useState } from 'react';
import type { User } from './types/user';
export const App = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState([]);
  const [activeCity, setActiveCity] = useState('Вся Україна');

  return (
    <>
      <div className="page">
        <Navbar activeCity={activeCity} setActiveCity={setActiveCity} />
        <div>
          {/* <Outlet context={{ user, setUser, products, setProducts, activeCity, setActiveCity }} /> */}
          <Outlet context={{ user, setUser, activeCity, setActiveCity }} />
        </div>
        <Footer />
      </div>
    </>
  );
  };

