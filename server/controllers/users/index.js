import express from "express";
import userModel from "../../models/Users/Users.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let userData = req.body;
    //hashing the password being done in line 11,12
    let hash = await bcrypt.hash(userData.password, 10);
    userData.password = hash;
    await userModel.create(userData);
    res.status(200).json({ msg: "User Registered! 💻📱" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getuser/:email", async (req, res) => {
  try {
    let userParams = req.params.email;
    let user = await userModel.find({ email: userParams });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    let allUsers = await userModel.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

/*
In updateOne, or in deleteOne, you should only take unique values. (username,email,phoneNumber,id)

*/

router.put("/put/:username", async (req, res) => {
  try {
    let userParams = req.params.username;
    let userUpdate = req.body;

    await userModel.updateOne({ username: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "Updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/delete/:username", async (req, res) => {
  try {
    let userParams = req.params.username;
    await userModel.deleteOne({ username: userParams });
    res.status(200).json({ msg: "Deleted User Succesfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.delete("/deleteall", async (req, res) => {
  try {
    await userModel.deleteMany({});
    res.status(200).json({ msg: "All users deleted!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
