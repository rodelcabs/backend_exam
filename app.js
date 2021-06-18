const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./models');


app.get('/', (req,res) => {
    res.send('wassup');
});

// model synchronization
db.connection.sync({ force: false }).then(() => {
    console.log("All models were synchronized successfully.");
}).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});