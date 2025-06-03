import './RegisterView.css'
import Footer from './components/Footer.jsx';
import NavBar from './components/NavBar.jsx';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useStoreContext } from '../context';

function RegisterView() {
  const { setEmail: setContextEmail, setFirst, setLast, setPassword: setContextPassword, setGenres } = useStoreContext();
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [verifpass, setVerifpass] = useState('');
  const [selectedGenres, setSelectedGenres] = useState(new Map()); // Use a Map to store genre selections
  const navigate = useNavigate();

  const availableGenres = [
    { id: "28", name: "Action" },
    { id: "12", name: "Adventure" },
    { id: "16", name: "Animation" },
    { id: "80", name: "Crime" },
    { id: "35", name: "Comedy" },
    { id: "27", name: "Horror" },
    { id: "36", name: "History" },
    { id: "14", name: "Fantasy" },
    { id: "53", name: "Thriller" },
    { id: "37", name: "Western" },
    { id: "10751", name: "Family" },
    { id: "10402", name: "Music" },
    { id: "10752", name: "War" },
    { id: "9648", name: "Mystery" },
    { id: "878", name: "Sci-Fi" }
  ];

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    const genreName = event.target.dataset.name;

    setSelectedGenres(prevSelectedGenres => {
      const newGenres = new Map(prevSelectedGenres);
      if (newGenres.has(genreId)) {
        newGenres.delete(genreId);
      } else {
        newGenres.set(genreId, genreName);
      }
      return newGenres;
    });
  };

  function signup(event) {
    event.preventDefault();

    if (password !== verifpass) {
      alert("Passwords do not match!");
      return;
    }

    if (selectedGenres.size < 5) {
      alert("Please select at least 5 genres.");
      return;
    }

    setFirst(fname);
    setLast(lname);
    setContextEmail(email);
    setContextPassword(password);
    setGenres(selectedGenres);
    navigate('/movies/genre');
  }

  return (
    <form onSubmit={signup}>
      <div className="register-header">
        <NavBar />
      </div>
      <div className="register-view">
        <div className="genrecontainer">
          <div className="genreselect">
            <h2>Genres</h2>
            <div className="genre-rows">
              {[0, 1, 2].map((rowIndex) => (
                <div className="genre-row" key={rowIndex}>
                  {availableGenres
                    .filter((_, i) => i % 3 === rowIndex)
                    .map((genre) => (
                      <div key={genre.id}>
                        <input
                          type="checkbox"
                          id={genre.id}
                          value={genre.id}
                          data-name={genre.name}
                          checked={selectedGenres.has(genre.id)}
                          onChange={handleGenreChange}
                        />
                        <label htmlFor={genre.id}>{genre.name}</label><br />
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="register-box">
          <h4 className="register-input-text">First name:</h4>
          <input className="first-name"
            type="text"
            id="text"
            name="text"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            required />
          <h4 className="register-input-text">Last name:</h4>
          <input className="last-name" type="text"
            id="text"
            name="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            required />
          <h4 className="register-input-text">Email:</h4>
          <input className="new-email" type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
          <h4 className="register-input-text">Password:</h4>
          <input type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          <h4 className="register-input-text">Confirm password:</h4>
          <input type="password"
            id="spassword"
            name="spassword"
            value={verifpass}
            onChange={(e) => setVerifpass(e.target.value)}
            required />
          <button type="submit" className="register-button">register</button>
        </div>
      </div>
      <div className="register-footer">
        <Footer />
      </div>
    </form>
  )
}

export default RegisterView;