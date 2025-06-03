import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import { useStoreContext } from '../context';
import "./SearchView.css";


const SearchView = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page')) || 1;

    const [results, setResults] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const debounceTimeout = useRef(null);
    const navigate = useNavigate();
    const { cart, addToCart } = useStoreContext();

    const fetchResults = async (query, page) => {
        if (!query) {
            setResults([]);
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                params: {
                    api_key: import.meta.env.VITE_KEY,
                    query,
                    page,
                },
            });

            setResults(response.data.results);
            setTotalPages(response.data.total_pages);
        } catch (err) {
            console.error('Failed to fetch data:', err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            fetchResults(query, page);
        }, 500);

        return () => clearTimeout(debounceTimeout.current);
    }, [query, page]);

    const goToPage = (newPage) => {
        setSearchParams({ query, page: newPage });
    };

    const loadMovie = (id) => {
        navigate(`/movies/${id}`);
    };

    const cartAdd = (movie) => {
        if (cart.has(movie.id)) {
            alert("This movie is already in your cart.");
        } else {
            addToCart(movie);
        }
    };

    return (
        <div className="app-container">
            <Header />
            <div className="search-view">
                {loading && <p>Loading...</p>}
                {!loading && results.length === 0 && query && <p>No results found.</p>}

                <div className="genredisp2">
                    {results.map((movie) => (
                        <div key={movie.id}>
                            <div
                                className="moviecard"
                                onClick={() => loadMovie(movie.id)}
                            >
                                {movie.poster_path ? (
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="movieposter"
                                    />
                                ) : (
                                    <div>
                                        <span>No Image</span>
                                    </div>
                                )}
                                <h3>{movie.title}</h3>
                            </div>

                            <button
                                className="butt"
                                onClick={() => cartAdd(movie)}
                            >
                                {cart.has(movie.id) ? "Added" : "Buy"}
                            </button>
                        </div>
                    ))}
                </div>

                {!loading && totalPages > 1 && (
                    <div className="pageturner">
                        <p>
                            <a onClick={() => {
                                if (page > 1) {
                                    goToPage(page - 1);
                                }
                            }}>Previous Page<br /></a>
                            <a onClick={() => {
                                if (page < totalPages) {
                                    goToPage(page + 1);
                                }
                            }}>Next Page</a>
                        </p>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default SearchView;