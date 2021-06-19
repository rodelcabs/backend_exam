const bcrypt = require('bcrypt');

module.exports = {
    /**
     * PASSWORD HASHING METHOD (BCRYPT.JS)
     *
     * Password hashing gamit bcrypt.js.
     * kapag walang pinasa na args, idedefault nya sa password12345.
     *
     * arguments: password
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