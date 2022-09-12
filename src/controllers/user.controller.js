const express = require('express');
const User= require("../models/user.model");
const authenticate = require("../middlewares/authenticate")
const authorization= require("../middlewares/authorization")
const router = express.Router();

router.get("",async(req,res)=>{
    try {
        let users= await User.find().lean().exec();
        return res.status(200).send(users);
    } catch (error) {
        return res.status(500).send(error.message)
    }
})

router.patch("/:id", authenticate,authorization(["admin"]), async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true});
      return res.send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });
  

module.exports = router;