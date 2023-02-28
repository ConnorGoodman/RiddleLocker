import React, { } from 'react'
import Button from '@mui/material/Button';

function Home() {
    return (
        <div>
        <h1>Riddle Lock</h1>
        <h2>Welcome person!</h2>
        <p>This is a website called riddle lock. Create a riddle to lock information behind it! The locked information can be any kinf of text.</p>
        {<Button>Click here to get started!</Button>}
        </div>

    )
}
export default Home;