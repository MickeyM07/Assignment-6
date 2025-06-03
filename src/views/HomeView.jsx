import './HomeView.css';
import Features from './components/Features.jsx'
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import NavBar from './components/NavBar.jsx';

function HomeView() {
    return (
        <div className='homepage'>
            <div className='navbar'>
                <NavBar />
            </div>
            <div className='Hero'>
                <Hero />
            </div>
            <div className='features'>
                <Features />
            </div>
            <div className='home-footer'>
                <Footer />
            </div>
        </div>
    )
}

export default HomeView;