// Import necessary hooks and components from React and react-router-dom
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

// Import image modal component for zoomable flag display
import ModalImage from 'react-modal-image';

function CountryDetail() {
  // Extract the 'name' parameter from the URL
  const { name } = useParams();

  // State to hold the current country's data
  const [country, setCountry] = useState(null);

  // State to hold data of countries that border the current country
  const [borderCountries, setBorderCountries] = useState([]);

  // Hook to programmatically navigate back
  const navigate = useNavigate();

  // Fetch country details when component mounts or when 'name' param changes
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        // Fetch country by full name
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const data = await res.json();
        const countryData = data[0];
        setCountry(countryData);

        // If the country has border countries, fetch their data using their codes
        if (countryData.borders?.length) {
          const borderRes = await Promise.all(
            countryData.borders.map(code =>
              fetch(`https://restcountries.com/v3.1/alpha/${code}`).then(res => res.json())
            )
          );

          // Extract name and code for each border country
          const names = borderRes.map(([country]) => ({
            name: country.name.common,
            code: country.cca3
          }));

          setBorderCountries(names);
        } else {
          // No bordering countries
          setBorderCountries([]);
        }

      } catch (err) {
        // Log error in case fetching fails
        console.error('Error loading country:', err);
      }
    };

    fetchCountry();
  }, [name]);

  // Show a loading message while country data is being fetched
  if (!country) return <p>Loading...</p>;

  // Destructure relevant fields from the country object
  const {
    flags,
    name: n,
    population,
    region,
    subregion,
    capital,
    tld,
    currencies,
    languages
  } = country;

  return (
    <main>
      <div className="country-details-container">
        {/* Back button to return to the previous page */}
        <button className="back-button" onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left"></i> &nbsp; Back
        </button>

        <div className="country-details">
          {/* Display the country's flag in a modal image viewer */}
          <div className="flag-image-wrapper">
            <ModalImage
              small={flags.svg}
              large={flags.svg}
              alt={`${n.common} flag`}
              hideDownload
              hideZoom
              className="flag-image"
            />
          </div>

          {/* Country information section */}
          <div className="details-text-container">
            <h1>{n.common}</h1>
            <div className="details-text">
              {/* Display key information with proper formatting */}
              <p><b>Native Name:</b> {Object.values(n.nativeName || {})[0]?.common}</p>
              <p><b>Population:</b> {population.toLocaleString()}</p>
              <p><b>Region:</b> {region}</p>
              <p><b>Sub Region:</b> {subregion}</p>
              <p><b>Capital:</b> {capital?.[0]}</p>
              <p><b>Top Level Domain:</b> {tld?.[0]}</p>
              <p><b>Currencies:</b> {Object.values(currencies || {}).map(c => c.name).join(', ')}</p>
              <p><b>Languages:</b> {Object.values(languages || {}).join(', ')}</p>
            </div>

            {/* Display border countries if available */}
            {borderCountries.length > 0 && (
              <div className="border-countries">
                <b>Border Countries:</b>
                <div className="border-buttons">
                  {borderCountries.map((bc) => (
                    <Link
                      key={bc.code}
                      to={`/country/${bc.name}`}
                      className="border-country-link"
                    >
                      {bc.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

// Export the component for use in the app
export default CountryDetail;
