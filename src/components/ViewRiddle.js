import React, { useState, useEffect } from 'react';

function ViewRiddle() {
    const [data, setData] = useState('');

    useEffect(() => {
    (async function () {

      const { text } = await( await fetch(`/api/GetRiddle?` + new URLSearchParams({
        user: "ConnorGoodman",
        riddle: "RiddleName"
      }))).json();
        setData(text);
        console.log(text);
        })();
    });
    
    return (
        <div>{data}</div>
    )
    

    
}
export default ViewRiddle