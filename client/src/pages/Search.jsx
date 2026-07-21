import { useState } from "react";
import { Link } from "react-router-dom";
import "./Search.css";

function Search() {
  const [search, setSearch] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [searched, setSearched] = useState(false);

  function searchRestaurants(event) {
    event.preventDefault();

    // Empty search state
    if (search.trim() === "") {
      setRestaurants([]);
      setSearched(false);
      return;
    }

    fetch(`http://localhost:3000/restaurants?search=${encodeURIComponent(search)}`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setSearched(true);
      })
      .catch((err) => console.error(err));
  }

  function clearSearch() {
    setSearch("");
    setRestaurants([]);
    setSearched(false);
  }

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>🍴 ForkRank</h2>
        <Link to="/favorites">My Favorites</Link>
      </div>

      <div className="search-area">
        <h1>Find a Restaurant</h1>
        <p>Search by restaurant name, cuisine, or food keyword.</p>

        <form onSubmit={searchRestaurants}>
          <input
            type="text"
            placeholder="Enter restaurant or keyword"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button type="submit">Search</button>
          <button type="button" onClick={clearSearch}>Clear</button>
        </form>
      </div>

      <div className="search-results">
        {!searched && (
          <p>Enter a restaurant name or keyword to start searching.</p>
        )}

        {searched && restaurants.length === 0 && (
          <p>No restaurants found. Try another search.</p>
        )}

        {searched && restaurants.length > 0 && <h2>Search Results</h2>}

        {restaurants.map((restaurant) => (
          <div className="search-restaurant-card" key={restaurant.id}>
            <h2>{restaurant.name}</h2>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Price: {restaurant.price}</p>
            <p>Rating: {restaurant.rating} ⭐</p>
            <p>Location: {restaurant.location}</p>
            <p>{restaurant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
