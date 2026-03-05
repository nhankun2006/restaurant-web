import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Events from './pages/Events';
import Booking from './pages/Booking';
import About from './pages/About';

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/booking" element={<Booking />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;
