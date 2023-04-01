import React, { useState, useEffect } from 'react';

function ViewRiddle() {
    const [data, setData] = useState('');

    useEffect(() => {
    (async function () {

      const queryParams = new URLSearchParams(window.location.search);

      let user = queryParams.get('user')
      let locker = queryParams.get('locker')

      console.log(user)
      console.log(locker)

      const { text } = await( await fetch(`/api/GetLocker?` + new URLSearchParams({
        user: user,
        locker: locker
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