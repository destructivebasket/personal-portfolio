import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/google_flights?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();

        console.log(data);

        const best = data.best_flights || [];
        const other = data.other_flights || [];

        const filteredFlights = [...best, ...other]
          .flatMap(flight => flight.flights || [])
          .map(segment => ({
            departure_id: segment.departure_airport?.name || 'N/A',
            arrival_id: segment.arrival_airport?.name || 'N/A',
          }));

        setFlights(filteredFlights || []);
        console.log(filteredFlights);
      } catch (err) {
        console.error("Frontend fetch error:", err);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchQuery]);
  
  return (
    <>
      <input
        placeholder='enter flight departure ID'
        onChange = {(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
      />

      {searchQuery.length > 0 && (
        <div>
          {flights.map((f, index) => (
            <ul key={index}>
              <li>{f.departure_id} → {f.arrival_id}</li>
            </ul>
          ))}
        </div>
      )}
    </>
  )
}

export default App
