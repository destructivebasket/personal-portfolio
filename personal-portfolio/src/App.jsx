import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [count, setCount] = useState(0);

  useEffect( () => {
    const seconds = setInterval( () => {
      setCount(prev => prev + 1);
      console.log(count);
    }, 1000)

    return () => clearInterval(seconds);
  }, []);

  return (
    <>
      <h1> Seconds passing by: {count} </h1>
    </>
  )
}

export default App
