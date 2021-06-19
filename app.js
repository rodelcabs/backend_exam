const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./models');
const cors = require('cors');

// middleware
app.use(cors({
    origin:`htpp://127.0.0.1:${PORT}`
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ message: err.message }); // Bad request
    }
    next();
});


// routes
// block on main site
app.get('/', (req,res) => {
    res.status(400).send({
        message: 'No defined endpoint'
    });
});

app.use('/api/users', require('./routes/user'));


// model synchronization
db.connection.sync({ force: false }).then(() => {
    console.log("All models were synchronized successfully.");
}).catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});