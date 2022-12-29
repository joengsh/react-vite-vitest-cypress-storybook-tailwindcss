import Footer from '@/components/Footer/Footer';
import Hero from '@/components/Hero/Hero';
import Carousel from '@/components/Carousel/Carousel';
import './App.css';

function App() {
  return (
    <div className="App" data-testid="app">
      <Hero />
      <Carousel />
      <Footer />
    </div>
  );
}

export default App;
