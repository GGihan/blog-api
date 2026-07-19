import './App.css'
import { Outlet } from 'react-router';
import { useState } from 'react';
// import { useAuth } from './hooks/useAuth';
import Header from './components/Header/Header';
import MainNav from './components/MainNav/MainNav';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { isLoadingAuth } = useAuth();

  return (
    <div className='app-container'>
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      <MainNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <main>
        <h2>some future content in main:</h2>
        <p>hello there!</p>
        <Outlet />
      </main>
      <footer>some text footer</footer>
    </div>
  )
};

export default App;
