import './Features.css'
import React, { useState, useEffect } from 'react';

function Features() {
    const [movies, setMovies] = useState([]);
    const randmovie = Math.floor(Math.random() * 12);
    const randpage = Math.floor(Math.random() * 20);
    //PUT YOUR KEY IN HIDDEN OR WTVs
    const apiUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${import.meta.env.VITE_KEY}&language=en-US&page=` + randpage;

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                setMovies(data.results.slice(randmovie, randmovie + 4)); // random movie then next six
            } catch (error) {
                console.log();
            }
        };
        fetchMovies();
    }, []);

    return (
        <div className = "movie-posters">
            {movies.map((movie) => {
                const movieImage = movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image';

                return (
                    <div className="movie-box">
                        <img className="movie-poster" src={movieImage} alt={movie.title} />
                        {/* <Link to={`/movies/` + movie.id} className="dbutton">Details</Link> */}
                    </div>
                )
            })}
        </div>
    )
}

export default Features;