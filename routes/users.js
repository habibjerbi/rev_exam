var express = require('express');
var router = express.Router();
//const User = require('../model/User.js');
// const userModel=require('../model/User');


/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.find();
  res.render("home", { users });
  console.log(users);
});
router.post('/', async function(req, res, next) {
    const {email, password} = req.body;
    console.log(email, password);
    const user = await User.findOne({ email:email, password:password })
    console.log(user);
    if(!user){
      res.redirect('/');
    }else {
      const users = await User.find();
      res.render('home',{users});
    }
  
  
});
router.post("/addUser", async function (req, res, next) {
  const { email, username } = req.body;
  console.log(email, username);
  // solution 1 to add user by using save().then()
  // const addedUser = user

  //   .save()
  //   .then((result) => {
  //     console.log(result);
  //     res.redirect("/users");
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });

  // solution 2 to add user by using await
  // (you should use async function in the head of the function)
  try {
    const user = new User({ email:email, name:username ,password:123 });
    await user.save();
    res.redirect("/users");
  } catch (error) {
    res.json(error.message);
  }
});
router.get("/deleteUser/:id", async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    await User.findOneAndDelete({ _id: id });
    res.redirect("http://localhost:3000/users");
  } catch (error) {
    res.json(error.message);
  }
});
router.get("/getUser", async function (req, res, next) {
  const {email} = req.query;
  console.log(email);
  try {
    const user =await User.findOne({ email: email });
    console.log(user);
    res.render('details',{user});
    
  } catch (error) {
    res.json(error.message);
  }
});
router.get('/search', async function(req, res, next) {
  res.render("search");
  
});
router.get('/notif', async function(req, res, next){
  res.render("notification")
})
module.exports = router;
