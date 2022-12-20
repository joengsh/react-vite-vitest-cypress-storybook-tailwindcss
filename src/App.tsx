import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import LoginSection from './components/LoginSection/LoginSection';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App" data-testid="app">
      <Navbar />
      <Hero />
      <LoginSection />
      <Footer />
    </div>
  );
}

export default App;
