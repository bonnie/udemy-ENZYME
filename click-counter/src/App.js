import React, { useState } from 'react';
import './App.css';

const initialCount = 0;

const App = () => {
  const [count, setCount] = useState(initialCount);

  return (
    <div className="App">
      <h1>
        The counter is currently&nbsp; 
        <span>{count}</span>
      </h1>
      <button onClick={() => setCount(count + 1)}>
        Increment counter
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement counter
      </button>
      <button onClick={() => setCount(initialCount)}>
        Reset counter
      </button>
    </div>
  );
}

export default App;