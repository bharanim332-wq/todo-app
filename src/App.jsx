import React, { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>COVID-19 Health Stats Tracker</h1>

      <input
        type="text"
        placeholder="Search Country..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "20px"
        }}
      />

      {filteredCountries.map((country) => (
        <div
          key={country.country}
          style={{
            border: "1px solid gray",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "10px"
          }}
        >
          <h2>{country.country}</h2>

          <img
            src={country.countryInfo.flag}
            alt="flag"
            width="80"
          />

          <p>Total Cases: {country.cases}</p>
          <p>Recovered: {country.recovered}</p>
          <p>Deaths: {country.deaths}</p>

          {country.cases > 1000000 && (
            <p style={{ color: "red", fontWeight: "bold" }}>
              ⚠ High Risk Country
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;