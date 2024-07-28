var Jwt = require('jsonwebtoken');

class jwtHelper{
    generateJWT=async (data) =>{
        var jwt =await Jwt.sign({
            data: data
        }, 'secret', { expiresIn: '7d' });
        console.log(jwt)
        console.log(jwt)
        return jwt
    }

    

}

module.exports = new jwtHelper()