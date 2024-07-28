var express = require('express');
var jwtHelper = require('../util/jwtHelper')

var router = express.Router();

router.post('/login', async(req, res, next)=> {
  var request=req.body
  if(request.email==="admin@gmail.com"){
    if(request.password==='admin123'){
    const obj11={email:"admin@gmail.com",name:"admin"}
    var jwt  = await jwtHelper.generateJWT(obj11);
      var obj={
        status:1,
        message:"",
        body:{email:"admin@gmail.com",name:"admin",jwt:jwt}
      }
      res.send(obj);
    }
    else{
      var obj={
        status:0,
        message:"password is wrong"
      }
      res.send(obj);
    }
  }
  
  else{
    var obj={
      status:0,
      message:"email is not exist"
    }
    res.send(obj);
  }
});

module.exports = router;
