const bcrypt = require('bcrypt');

module.exports = {
    /**
     * PASSWORD HASHING METHOD (BCRYPT.JS)
     *
     * so this is my work around with bcrypt, bcrypt alone did not behave as I expected, 
     * it takes time to hash although it doesn't return promise so this is what I did.
     *
     */
     hashPass: function(password=''){
        return new Promise((resolve, reject) => {
            password = password = ''? 'password12345':password;
            bcrypt.genSalt(10, (err, salt) =>
                bcrypt.hash(password, salt, (err, hash) => {
                    if (!err){
                        resolve(hash);
                    }else{
                        reject({message: err});
                    }
                })
            )
        });
    }
}