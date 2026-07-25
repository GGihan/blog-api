import './App.css'
import { Outlet } from 'react-router';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import Header from './components/Header/Header';
import MainNav from './components/MainNav/MainNav';
import Footer from './components/Footer/Footer';
import Post from './components/Post/FullPost';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoadingAuth } = useAuth();

  // Add all post fetching

  return (
    <div className='app-container'>
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />
      {!isLoadingAuth && (
        <>
          <MainNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
          <main>
            <Post postId={31} />
            <Outlet />
          </main>
        </>
      )}
      <Footer />
    </div>
  )
};

export default App;
