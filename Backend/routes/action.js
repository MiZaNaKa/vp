var express = require('express');
var actionService = require('../modules/action/actionService')
var withAuth = require("../util/headerAuth")
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/getListAll',withAuth, async(req, res, next)=> {
  var result =await actionService.getListAll()
  res.send(result);
});


router.post('/create',withAuth, async(req, res, next)=> {
  var request=req.body
  request.createdID=req.user.data.email
  var result =await actionService.insert(request)
  res.send(result);
});

router.get('/getDetail/:id',withAuth, async(req, res, next)=> {
  var id=req.params.id
  var result =await actionService.getDetail(id)
  res.send(result);
});



router.get('/delete/:id',withAuth, async(req, res, next)=> {
  var id=req.params.id
  var result =await actionService.deleteAction(id)
  res.send(result);
});


router.post('/edit/:id',withAuth, async(req, res, next)=> {
  var id=req.params.id
  var request=req.body
  var result =await actionService.edit(id,request)
  res.send(result);
});

module.exports = router;
