const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;
const { userList, userPages } = require('../views');

// /users
router.get('/', async(req,res,next)=>{
  try{
    const users = await User.findAll();
    res.send(userList(users));
  }catch(error){
      next(error)
  }
  
})

/* /users/id 
to make a single-user route, userPage.js module displays the user's name, email, and a list of all pages 
that user has authored (with links to the pages)
Q: how do we deal with the fact that users don't have page references? So we have to do two lookups: 
1. for the user
2. for the all the pages whose author is this user

make both queries, and when they are finished, invoke userPages with both users and pages

two await meaning running two queries in sequence, it's okay but please update to run multiple promises in paralel
*/ 

router.get('/:userId', async (req, res, next)=>{
   try{
       const user = await User.findById(req.params.userId);
       const pages = await Page.findAll({
           where:{
               authorId: req.params.userId
           }
       });
       //to make a single-user
       res.send(userPages(user,pages))
   }catch(error){
       next(error)
   }
})



module.exports = router;
