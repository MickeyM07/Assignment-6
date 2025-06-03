import { Outlet, useNavigate } from "react-router-dom";

function MoviesView() {
    return (
      <div className="app-container">
        <Outlet />
      </div>
    );
  }
  
export default MoviesView;