import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [restaurants, setRestaurants] = useState([])
  const [sort, setSort] = useState('rating')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadRestaurants() {
      try {
        setLoading(true)
        setError('')

        const response = await fetch(
          `http://localhost:3000/restaurants?sort=${sort}`
        )

        if (!response.ok) {
          throw new Error('Could not load restaurants')
        }

        const data = await response.json()
        setRestaurants(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadRestaurants()
  }, [sort])

  return (
    <main className="app">
      <header className="page-header">
        <div>
          <p className="eyebrow">Restaurant Discovery</p>
          <h1>Find your next meal</h1>
          <p className="subtitle">
            Browse restaurants and sort them by rating or newest.
          </p>
        </div>

        <label className="sort-control">
          <span>Sort by</span>

          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
          >
            <option value="rating">Highest rated</option>
            <option value="newest">Newest</option>
          </select>
        </label>
      </header>

      {loading && <p className="status">Loading restaurants...</p>}

      {error && <p className="status error">{error}</p>}

      {!loading && !error && (
        <section className="restaurant-grid">
          {restaurants.map((restaurant) => (
            <article className="restaurant-card" key={restaurant.id}>
              <div className="card-top">
                <span className="cuisine">{restaurant.cuisine}</span>

                <span className="rating">
                  <span aria-hidden="true">★</span>
                  {Number(restaurant.rating).toFixed(1)}
                </span>
              </div>

              <h2>{restaurant.name}</h2>

              <p className="description">{restaurant.description}</p>

              <div className="restaurant-details">
                <span>{restaurant.location}</span>
                <span>{restaurant.price}</span>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  )
}

export default App
