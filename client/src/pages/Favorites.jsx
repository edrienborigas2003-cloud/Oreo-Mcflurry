import { useState, useEffect } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Temporary hardcoded userId until auth module is ready
  const userId = 1;

  useEffect(() => {
    fetch(`http://localhost:3000/favorites/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  function removeFavorite(favoriteId) {
    fetch(`http://localhost:3000/favorites/${favoriteId}`, {
      method: "DELETE",
    })
      .then(() => {
        setFavorites(favorites.filter((fav) => fav.id !== favoriteId));
      })
      .catch((err) => console.error(err));
  }

  if (loading) return <p>Loading favorites...</p>;

  if (favorites.length === 0) {
    return (
      <div>
        <h1>My Favorites</h1>
        <p>You have no saved restaurants yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Favorites</h1>
      <div>
        {favorites.map((fav) => (
          <div key={fav.id} style={{ border: "1px solid #ccc", padding: "16px", marginBottom: "12px", borderRadius: "8px" }}>
            <h2>{fav.restaurant.name}</h2>
            <p>Cuisine: {fav.restaurant.cuisine}</p>
            <p>Price: {fav.restaurant.price}</p>
            <p>Rating: {fav.restaurant.rating} ⭐</p>
            <p>Location: {fav.restaurant.location}</p>
            <button
              onClick={() => removeFavorite(fav.id)}
              style={{ backgroundColor: "#F96167", color: "white", border: "none", padding: "8px 16px", borderRadius: "4px", cursor: "pointer" }}
            >
              Remove from Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;