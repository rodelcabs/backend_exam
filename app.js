const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req,res) => {
    res.send('wassup');
})

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
})