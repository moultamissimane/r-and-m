import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import Layout from './components/Layout';
import CharactersPage from './pages/CharactersPage';
import CharacterDetailsPage from './pages/CharacterDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <FavoritesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CharactersPage />} />
            <Route path="character/:id" element={<CharacterDetailsPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </FavoritesProvider>
  );
}

export default App;