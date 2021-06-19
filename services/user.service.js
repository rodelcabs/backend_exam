const db = require('../models');
const hash = require('../libs/hash'); // some useful stuff I made :)
const { user } = require('../models');
const User = db.user;
const Op = db.sequelize.Op;

// Add a new user
exports.create = async(req,res,next) => {
    try {
        const {firstname, lastname, email, contact, address, postcode, username, password} = req.body;

        // validate request
        if (!firstname || !email || !username || !password) {
            res.status(400).send({
                message: "Please complete the fields"
            });
            return;
        }

        // checking email first and user name
        const check = await User.findOne({
            where:{
                [Op.or]:[
                    {
                        email:email
                    },
                    {
                        username:username
                    }
                ]
            }
        });
        
        if (check){
            let duplicate = '';

            if (check.email == email) {
                duplicate = 'Email'
            }
            else if (check.username == username) {
                duplicate = 'Username'
            }

            res.status(400).send({
                message:`${duplicate} already exists`
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
            message: error.message || 'Could not create the user. Something weng wrong.'
        });
    }
};


// Edit a user
exports.edit = async(req,res) => {
    try {
        const id = req.params.id;

        // checking first email or username
        if (req.body.email || req.body.username) {
            const {email, username} = req.body;
            const checkuser = await User.findOne({
                where:{
                    [Op.or]:[
                        {
                            email:email? email:null,
                            id:{
                                [Op.notIn]:[id]
                            }
                        },
                        {
                            username:username?username:null,
                            id:{
                                [Op.notIn]:[id]
                            }
                        }
                    ]
                }
            });
            
            if (checkuser) {
                let duplicate = '';

                if (checkuser.email == email) {
                    duplicate = 'Email'
                }
                else if (checkuser.username == username) {
                    duplicate = 'Username'
                }
    
                res.status(400).send({
                    message:`${duplicate} already exists`
                });
                return;   
            }
        }

        // get user
        const updateuser = await User.update(req.body, {
            where:{
                id:id
            }
        });

        if(updateuser == 1){
            res.send({
                message: 'User updated successfully.'
            });
        }
        else{
            res.status(400).send({
                message:`Cannot update user with id: ${id}, maybe the user was not found or the data you sent was wrong.`
            });
            return;
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || `Could not update user with id: ${id}. Something weng wrong.`
        });
    }
};


// Delete a user
exports.delete = async(req,res) => {
    try {
        const id = req.params.id;

        // get user
        const deleteuser = await User.destroy({
            where:{
                id:id
            }
        });

        if(deleteuser == 1){
            res.send({
                message: 'User deleted successfully.'
            });
        }
        else{
            res.status(400).send({
                message:`Cannot delete user with id: ${id}, maybe the user was not found.`
            });
            return;
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || `Could not delete user with id: ${id}. Something weng wrong.`
        });
    }
};


// View list of all users in the system
exports.getAll = async(req,res) => {
    try {
        let data = {}
        if (req.params.id) {
            data = await User.findOne({
                where:{
                    id:req.params.id
                }
            });
        }
        else{
            data = await User.findAll();
        }
        
        res.send(data)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Could not fetch all users. Something weng wrong.'
        });
    }
};

// Allow multiple users to be removed 
exports.deleteMany = async(req,res) => {
    try {
        const user_id = req.body.user_id;
        if (!user_id) {
            res.status(400).send({
                message: 'No user_id array found.'
            })
            return;
        }

        const delmanyuser = User.destroy({where:{id:user_id}});
        
        if (delmanyuser != 0) {
            res.send({
                message:'Users deleted successfully.'
            });
        }
        else{
            res.status(400).send({
                message: 'Could not delete, maybe some of the user was not found.'
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: error.message || 'Could not delete multiple users. Something weng wrong.'
        });
    }
};