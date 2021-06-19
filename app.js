const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const db = require('./models');
const cors = require('cors');
const session = require('express-session');
const ensureAuthenticated = require('./libs/ensureAuth');
const demousers = require('./seed/demo-user.json');
require('dotenv').config();

// MIDDLEWARE
app.use(cors({
    origin:`htpp://127.0.0.1:${PORT}`
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// error handling
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error(err);
        return res.status(400).send({ message: err.message }); // Bad request
    }
    next();
});
// session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


// ROUTES
// block on main site
app.get('/', (req,res) => {
    res.status(400).send({
        message: 'No defined endpoint'
    });
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', ensureAuthenticated, require('./routes/user'));


// model synchronization
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    db.connection.sync({ force: true }).then(async() => {
        // seeding upon creation and synchronization
        await db.user.bulkCreate(demousers.data);
        console.log("All models were synchronized successfully.");
    }).catch(err => console.log(err));   
}

app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`)
});

module.exports = app;