import express from "express";
import userModel from "../../models/Users/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let userData = req.body;
    console.log(userData);
    let userCheck = await userModel.find({ username: userData.username });
    if (userCheck) {
      return res.status(404).json({ msg: "User already registered!!" });
    }
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

router.put("/put/:suhail", async (req, res) => {
  try {
    let userParams = req.params.suhail;
    let userUpdate = req.body;

    await userModel.updateOne({ username: userParams }, { $set: userUpdate });
    res.status(200).json({ msg: "Updated!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
