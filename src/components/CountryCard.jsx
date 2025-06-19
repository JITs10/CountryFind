// Importing React library to create a React component
import React from 'react';

// Importing Link component from react-router-dom for navigation between routes
import { Link } from 'react-router-dom';

// Functional component to display a card with country information
function CountryCard({ country }) {
  return (
    // Link wraps the entire card and makes it clickable, navigating to a dynamic route for the selected country
    <Link to={`/country/${country.name.common}`} className="country-card">

      {/* Displays the country's flag using the SVG URL */}
      <img src={country.flags.svg} alt={`${country.name.common} flag`} loading="lazy"/>

      {/* Text section of the card with country details */}
      <div className="card-text">
        {/* Country name as the card title */}
        <h3 className="card-title">{country.name.common}</h3>

        {/* Displaying population with commas for readability */}
        <p><b>Population:</b> {country.population.toLocaleString()}</p>

        {/* Displaying the region the country belongs to */}
        <p><b>Region:</b> {country.region}</p>

        {/* Displaying the capital city; uses optional chaining in case capital is undefined or an empty array */}
        <p><b>Capital:</b> {country.capital?.[0]}</p>
      </div>
    </Link>
  );
}

// Exporting the component so it can be used in other parts of the app
export default CountryCard;
