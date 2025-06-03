import './Hero.css'
import image from './images/one-piece.png'
function Hero() {

    return (
        <div className="hero">
            <img className="background-image" src={image} />
            <h1 className="hero-title">Welcome to DebtFlix!</h1>
            <p className="hero-paragraph">Stream all your favorite movies and TV shows for low prices! If you're in debt,
                DebtFlix is perfect for you!</p>
        </div>
    )
}

export default Hero;