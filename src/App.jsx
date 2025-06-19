import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import './App.css';

// Lazy load pages and components
const Home = lazy(() => import('./pages/Home'));
const CountryDetail = lazy(() => import('./pages/CountryDetail'));
const Header = lazy(() => import('./components/Header'));

// Simple fallback for lazy loading
const Loading = () => <p className='loading'>Loading...</p>;

function App() {
  return (
      <ThemeProvider>
        <Suspense fallback={<Loading />}>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:name" element={<CountryDetail />} />
          </Routes>
        </Suspense>
      </ThemeProvider>
  );
}

export default App;
