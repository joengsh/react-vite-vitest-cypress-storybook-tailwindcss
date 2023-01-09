/// <reference types="vite-plugin-svgr/client" />

import Footer from '@components/organisms/Footer/Footer';
import Hero from '@components/organisms/Hero/Hero';
import Carousel from '@components/molecules/Carousel/Carousel';
import './App.css';
import { ReactComponent as Logo } from '@assets/react.svg';
import { useEffect } from 'react';
import PixiTest from '../templates/PixiContent';

function App() {
  useEffect(() => {
    console.log('app');
  }, []);

  return (
    <div className="App" data-testid="app">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <Logo className="logo" width={96} height={96} />
          {/* <img src={reactLogo} className="logo react" alt="React logo" /> */}
        </a>
      </div>
      <Hero />
      <Carousel />
      <Footer />
      <PixiTest />
    </div>
  );
}

export default App;
