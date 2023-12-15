import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/Home"
import ProjectPage from "./components/ProjectPage";
import PathwayPage from "./components/PathwayPage"
import DefaultThemeProvider from "./contents/theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <DefaultThemeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/pathways" element={<PathwayPage />}/>
            <Route path="/messages" element={<h1>Messages page</h1>} />
            <Route path="/profile" element={<h1>Profile page</h1>} />
            <Route path="/achievements" element={<h1>Learning and Achievements page</h1>} />
            <Route path="/favourites" element={<h1>Favourites page</h1>} />
            <Route path="/logout" element={<h1>Logout page</h1>} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </DefaultThemeProvider>
    </div>
  );
}

export default App;

