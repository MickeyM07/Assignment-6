import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import Header from "./components/Header.jsx";
import "./DetailsView.css";

function DetailsView() {
    const [movie, setMovie] = useState([]);
    const params = useParams();
//API KEY
    useEffect(() => {
        (async function getMovie() {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${params.id}?api_key=${import.meta.env.VITE_KEY}&append_to_response=videos`
            );
            setMovie(response.data);
        })();
    }, []);

    return (
        <div className="details-app-container">
            <div className="details-header">
                <Header />
            </div>
            <div className="movie-details">
                <h1 className="movie-titles">{movie.original_title}</h1>
                <p className="movie-overview">{movie.overview}</p>
                <div className="movie-info">
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Origin Country:</strong> {movie.origin_country}</p>
                    <p><strong>Budget:</strong> {movie.budget}$ N/A if 0</p>
                </div>
                {movie.poster_path && (
                    <img
                        className="details-movie-poster"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                    />
                )}
                <div className="trailers-section">
                    <h2>Trailers</h2>
                    <div className="traiers-grid">
                        {movie.videos && movie.videos.results.map((trailer) => (
                            <div key={trailer.id} className="trailer-tile">
                                <a
                                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        className="trailer-thumbnail"
                                        src={`https://img.youtube.com/vi/${trailer.key}/0.jpg`}
                                        alt={trailer.name}
                                    />
                                    <h3>{trailer.name}</h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="details-footer">
                <Footer />
            </div>
        </div>

    )
}

export default DetailsView;