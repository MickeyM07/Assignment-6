import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from './context';
import CartView from "./views/CartView";
import SettingsView from "../src/views/SettingsView";
import HomeView from "../src/Views/HomeView";
import RegisterView from "../src/Views/RegisterView";
import LoginView from "../src/Views/LoginView";
import MoviesView from "../src/Views/MoviesView";
import GenreLogin from "../src/Views/GenreLogin";
import DetailsView from "../src/Views/DetailsView";
import ErrorView from "../src/Views/ErrorView";
import SearchView from './views/SearchView';
import './App.css'

function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/register" element={<RegisterView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/settings" element={<SettingsView />} />
          <Route path="/movies" element={<MoviesView />}>
            <Route path="genre" element={<GenreLogin />} />
            <Route path="search" element={<SearchView />}></Route>
            <Route path=":id" element={<DetailsView />} />
          </Route>
          <Route path="*" element={<ErrorView />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App