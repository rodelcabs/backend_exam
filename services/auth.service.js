const db = require('../models');
const hash = require('../libs/hash'); // some useful stuff I made :)
const { user } = require('../models');
const User = db.user;
const Op = db.sequelize.Op;
const bcrypt = require('bcrypt');

exports.authenticate = async(req,res) => {
    try {
        const {email, password} = req.body;

        // validate request
        if (!email || !password) {
            res.status(400).send({
                message: "Username and password are required!"
            });
            return;
        }

        const usercheck = await User.findOne({
            where:{
                email:email
            }
        });

        // check if user exist
        if (!usercheck) {
            res.status(400).send({
                message: "User doen't exist."
            });
            return;
        }
        // comparing password
        bcrypt.compare(password, usercheck.password, (err, isMatch) => {
            if(err) throw err;

            if (isMatch) {
                // storing user data to session
                req.session.user = usercheck;
                req.session.isAuthenticated = true;
                res.send({
                    message: "Auth successful and session started. route to GET '/logout' to destroy your session or logout.",
                    user:req.session.user
                });
            }else{
                res.status(400).send({
                    message: "Incorrect Password"
                });
                return;
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Could not authenticate the user. Something weng wrong.'
        });
    }
}

exports.logout = (req,res) => {
    // destroying session
    req.session.destroy();
    res.send({
        message: "Session destroyed."
    })
}