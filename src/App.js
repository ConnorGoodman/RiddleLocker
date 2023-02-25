import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    (async function () {
      const { text } = await( await fetch(`/api/HttpTrigger1`)).json();
      setData(text);
    })();
  });

  return <div>{data}</div>;
}

export default App;