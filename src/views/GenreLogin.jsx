import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useStoreContext } from "../context";
import GenreView from "./components/GenreView.jsx";
import Footer from './components/Footer.jsx';
import Header from "./components/Header.jsx";
import "./GenreLogin.css"

function GenreLogin() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [selectedGenreId, setSelectedGenreId] = useState(28);
    const { cart, fname, addToCart, genres } = useStoreContext();

    const cartAdd = (movie) => {
        if (cart.has(movie.id)) {
            alert("This movie is already in your cart.");
        } else {
            addToCart(movie);
        }
    };

    useEffect(() => {
        const fetchMovies = async () => {
            const url = selectedGenreId
                ? `https://api.themoviedb.org/3/discover/movie?api_key=be3c7266366ad88b56a8397a0a3e668d&with_genres=${selectedGenreId}`
                : `https://api.themoviedb.org/3/discover/movie?api_key=be3c7266366ad88b56a8397a0a3e668d&with_genres=28`;

            const response = await axios.get(url);
            setMovies(response.data.results);
        };

        fetchMovies();
    }, [selectedGenreId]);

    async function getMoviesByPage(page) {
        const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_KEY}&with_genres=${selectedGenreId}&page=${page}`
        );
        setMovies(response.data.results);
    }

    const handleGenreClick = (genreId) => {
        setSelectedGenreId(genreId);
    };

    return (
        <div className="app-container">
            <div className="movies-header">
                <Header />
            </div>
            <div className="login-feat">
                <div className="welcome">
                    Welcome {fname}! We hope you find what you are looking for.
                </div>
                <div className="genre-list">
                    <GenreView genresList={Array.from(genres)} onGenreClick={handleGenreClick} />
                    <div className="spacer">
                    </div>
                    <div className="page-turner">
                        <p>
                            <a
                                onClick={() => {
                                    if (page > 1) {
                                        setPage(page - 1);
                                        getMoviesByPage(page - 1);
                                    }
                                }}
                            >
                                Previous Page<br />
                            </a>
                            <a
                                onClick={() => {
                                    if (page < 50) {
                                        setPage(page + 1);
                                        getMoviesByPage(page + 1);
                                    }
                                }}
                            >
                                Next Page
                            </a>
                        </p>
                        <p>Page {page}<br /></p>
                    </div>
                </div>
                <div className="genre-display">
                    {movies.map((movie) => (
                        <div className="moviecard" key={movie.id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="movieposter"
                            />
                            <h3>{movie.title}</h3>

                            <div className="button-container">
                                <Link to={`/movies/${movie.id}`} className="dbutton">Details</Link>
                                <div
                                    onClick={() => cartAdd(movie)}
                                    className="buybut"
                                >
                                    {cart.has(movie.id) ? "Added" : "Buy"}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="genres-footer">
                <Footer />
            </div>
        </div>
    );
}

export default GenreLogin;