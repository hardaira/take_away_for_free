import './App.scss';
import { Navbar } from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { useState } from 'react';
import type { User } from './types/user';
export const App = () => {
  const [user, setUser] = useState<User | null>(null);
  return (
    <>
      <div className="page">
        <Navbar />
        <div>
          <Outlet context={{ user, setUser }} />
        </div>
        <Footer />
      </div>
    </>
  );
  };

