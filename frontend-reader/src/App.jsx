import './App.css'
import { Outlet } from 'react-router';
import Header from './components/Header/Header';

function App() {

  return (
    <div className='app-container'>
      <Header />
      <nav className='main-nav'>some links in main nab</nav>
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
