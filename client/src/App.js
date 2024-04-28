import React from "react";
import "./App.css";
import DefaultThemeProvider from "./contents/theme";
import { BrowserRouter as Router, Route, Navigate, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Home"
import ProjectPage from "./components/ProjectPage";
import PathwayPage from "./components/PathwayPage"
import Project from "./components/Project";
import Pathway from "./components/Pathway";
import Login from './components/Login';
import Profile from './components/Profile'
import Favourites from "./components/FavouritesPage";

const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token; // returns true if token exists
};

function App() {
  const [loggedIn, setLoggedIn] = React.useState(isAuthenticated());

  // login function
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };
 // creates routes for each page - navigates backs to login page if user isn't authenticated
  return (
    <div className="App">
      <DefaultThemeProvider>
        {isAuthenticated() && <Navbar onLogout={handleLogout} />}
        <Router>
          <Routes>
            <Route path="/login" element={loggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
            <Route path="/" element={loggedIn ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/projects" element={loggedIn ? <ProjectPage /> : <Navigate to="/login" />} />
            <Route path="/pathways" element={loggedIn ? <PathwayPage /> : <Navigate to="/login" />} />
            <Route path="/projects/:projectName" element={loggedIn ? <Project /> : <Navigate to="/login" />} />
            <Route path="/pathways/:pathwayName" element={loggedIn ? <Pathway /> : <Navigate to="/login" />} />
            <Route path="/profiles/:userId" element={loggedIn ? <Profile /> : <Navigate to="/login" />} />
            <Route path="/achievements" element={<h1>Learning and Achievements page</h1>} />
            <Route path="/favourites" element={loggedIn ? <Favourites /> : <Navigate to="/login" />}/>
          </Routes>
        </Router>
        {isAuthenticated() && <Footer />}
      </DefaultThemeProvider>
    </div>
  );
}

export default App;

