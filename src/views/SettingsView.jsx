import { useState, useEffect } from "react";
import { useStoreContext } from "../context";
import"./SettingsView.css";
import { useNavigate } from 'react-router-dom';

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

function SettingsView() {
    const { email, fname, lname, genres, setFirst, setLast, setGenres } = useStoreContext();
    const [newFname, setNewFname] = useState(fname);
    const [newLname, setNewLname] = useState(lname);
    const [selectedGenres, setSelectedGenres] = useState(new Map());
    const navigate = useNavigate();

    useEffect(() => {
        const initGenres = new Map();
        genres.forEach((value, key) => {
            initGenres.set(key, value);
        });
        setSelectedGenres(initGenres);
        const fetchUserData = async () => {
            if (user) {
                try {
                    const docRef = doc(firestore, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        if (data.genres) {
                            const userGenres = new Map(Object.entries(data.genres));
                            setSelectedGenres(userGenres); 
                        }
                        if (data.cart) {
                            setCart(data.cart);
                        } 
                        if (data.firstName) setNewFname(data.firstName);
                        if (data.lastName) setNewLname(data.lastName);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };
        fetchUserData();
    }, [genres, user]);


    const handleGenreChange = (event) => {
        const genreId = event.target.value;
        const genreName = event.target.name;

        const updatedSelectedGenres = new Map(selectedGenres);

        if (event.target.checked) {
            updatedSelectedGenres.set(genreId, genreName);
        } else {
            updatedSelectedGenres.delete(genreId);
        }

        setSelectedGenres(updatedSelectedGenres);
    };

        const handlePasswordChange = async () => {
        const auth = getAuth();
        const userCred = auth.currentUser;

        if (newPassword !== confirmPassword) {
            setPasswordError('Passwords do not match!');
            return;
        }

        if (!currentPassword) {
            setPasswordError('Please enter your current password.');
            return;
        }

        const credential = EmailAuthProvider.credential(userCred.email, currentPassword); // Use current password for re-authentication

        try {
            await reauthenticateWithCredential(userCred, credential);
            await updatePassword(userCred, newPassword);
            alert("Password updated successfully!");
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error("Error updating password:", error);
            setPasswordError("Error updating password. Please check your current password.");
        }
    };

    const handleSaveChanges = async () => {
        // Check if at least 10 genres are selected
        if (selectedGenres.size < 10) {
            setGenreError("You must select at least 10 genres.");
            return;
        } else {
            setGenreError(""); // Clear error if condition is met
        }

        const updatedGenres = Object.fromEntries(selectedGenres);
        if (user.providerData[0].providerId === "google.com") {
            setNewFname(fname); 
            setNewLname(lname); 
        } else {
            setFirst(newFname);
            setLast(newLname);
        }

        try {
            const userRef = doc(firestore, "users", user.uid);
            await updateDoc(userRef, {
                genres: updatedGenres, // Save selected genres to Firestore
                firstName: newFname,
                lastName: newLname,
            }, { merge: true });
            alert("Settings updated successfully!");
            navigate('/movies/genre');
        } catch (error) {
            console.error("Error updating Firestore:", error);
        }
    };

    return (
        <div className="appcontainer">
            <h1>Welcome {fname} {lname}, Email: {email}</h1>

            <div className="formContainer">
                <div className="formGroup">
                    <label>Edit First Name:</label>
                    <input
                        type="text"
                        value={newFname}
                        onChange={(e) => setNewFname(e.target.value)}
                    />
                </div>

                <div className="formGroup">
                    <label>Edit Last Name:</label>
                    <input
                        type="text"
                        value={newLname}
                        onChange={(e) => setNewLname(e.target.value)}
                    />
                </div>

                <div className="genresContainer">
                    <h3>Choose Your Genres</h3>
                    <div className="checkboxContainer">
                        {availableGenres.map((genre) => (
                            <div key={genre.id}>
                                <input
                                    type="checkbox"
                                    id={genre.name}
                                    name={genre.name}
                                    value={genre.id}
                                    checked={selectedGenres.has(genre.id)}
                                    onChange={handleGenreChange}
                                />
                                <label htmlFor={genre.name}>{genre.name}</label>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="saveButton" onClick={handleSaveChanges}>
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default SettingsView;