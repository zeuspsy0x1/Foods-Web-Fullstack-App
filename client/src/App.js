import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './components/(1) LandingPage/LandingPage';
import AllRecipes from './components/(2) AllRecipes/AllRecipes';

import Card from './components/(2) AllRecipes/Card';
import Detail from './components/(3) RecipeDetail/Detail';
import Nav from './components/(2) AllRecipes/Nav';


function App() {
  return (
   <BrowserRouter>
      <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/allrecipes" element={<AllRecipes />} />
              <Route path="/detail/:id" element={<Detail />} />

              <Route path="/nav" element={<Nav />} />
              {/* <Route path="/allrecipes" element={<Card />} /> */}
              
      </Routes>
    </BrowserRouter>
  );
}

export default App;
