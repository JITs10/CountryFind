import React, { useEffect, useState, useRef, useCallback } from 'react';
import CountryCard from '../components/CountryCard';

const BATCH_SIZE = 20; // Number of countries to load per scroll batch

function Home() {
  const [countries, setCountries] = useState([]);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');
  const loaderRef = useRef();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const fields = 'name,population,flags,region,capital';
        const res = await fetch(`https://restcountries.com/v3.1/all?fields=${fields}`);
        const data = await res.json();
        setCountries(data);
      } catch (err) {
        console.error('Failed to fetch countries:', err);
      }
    };
    fetchCountries();
  }, []);

  const filtered = countries.filter(
    (country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!region || country.region === region)
  );

  const visibleCountries = filtered.slice(0, visibleCount);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => loader && observer.unobserve(loader);
  }, [loadMore]);

  return (
    <main>
      <div className="search-filter-container">
        <div className="search-container">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(BATCH_SIZE); // Reset on new search
            }}
          />
        </div>
        <select
          className="filter-by-region"
          value={region}
          onChange={(e) => {
            setRegion(e.target.value);
            setVisibleCount(BATCH_SIZE); // Reset on new filter
          }}
        >
          <option value="">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div className="countries-container">
        {visibleCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>

      {/* Sentinel div triggers loading more when it enters the viewport */}
      <div ref={loaderRef} style={{ height: '1px' }} />
    </main>
  );
}

export default Home;
