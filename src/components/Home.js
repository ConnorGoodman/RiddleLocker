import React, { } from 'react'
import lockerphoto from '../images/lockerstockphoto.jpg'

//import Button from '@mui/material/Button';

function Home() {
    return (
        <div>
        <h1>Riddle Lock</h1>
        <img src={lockerphoto} alt="set of lockers"></img>
        <h2>Welcome person!</h2>
        <p>This is Riddle Locker. Create a riddle to lock information behind it! The locked information can be any kind of text.</p>
        <p>Get creative and share your riddles with friends!</p>
        </div>

    )
}
export default Home;