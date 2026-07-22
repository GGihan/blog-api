import './App.css'
import { Outlet } from 'react-router';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header/Header';
import MainNav from './components/MainNav/MainNav';
import Footer from './components/Footer/Footer';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isLoadingAuth } = useAuth();

  return (
    <div className='app-container'>
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      {!isLoadingAuth && (
        <>
          <MainNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          <main>
            <h2>some future content in main:</h2>
            <p>hello there, {user?.username}!</p>
            <Outlet />
          </main>
        </>
      )}
      <Footer />
    </div>
  )
};

export default App;
