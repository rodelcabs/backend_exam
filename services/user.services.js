const db = require('../models');
const hash = require('../libs/hash'); // some useful stuff I made :)
const User = db.user;
const Op = db.sequelize.Op;

// Add a new user
exports.create = async(req,res,next) => {
    try {
        const {firstname, lastname, email, contact, address, postcode, username, password} = req.body;

        // validate request
        if (!firstname || !email || !username || !password) {
            res.status(400).send({
                message: "please complete the fields"
            });
            return;
        }

        // checking email first
        const check = await User.findOne({
            where:{
                email:email
            }
        })
        
        if (check){
            res.status(400).send({
                message:"email already exists"
            });
            return;
        }

        // creating user
        let newuser = {
            firstname,
            lastname,
            address,
            postcode,
            contact,
            email,
            username,
        }
        // hasing password (bcrypt)
        let hashed_pass = await hash.hashPass(password);
        newuser.password = hashed_pass;

        // saving user
        const create = await User.create(newuser);

        res.send(create);

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Something weng wrong.'
        });
    }
};


// Edit a user
exports.edit = (req,res) => {

};


// Delete a user
exports.delete = (req,res) => {

};


// View list of all users in the system
exports.getAll = async(req,res) => {
    try {
        const data = await User.findAll();
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Something weng wrong.'
        });
    }
};

// Allow multiple users to be removed 
exports.deleteMany = (req,res) => {

};