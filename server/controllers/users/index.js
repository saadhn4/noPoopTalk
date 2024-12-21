import express from "express";
import userModel from "../../models/Users/Users.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    let userData = req.body;
    console.log(userData);
    await userModel.create(userData);
    res.status(200).json({ msg: "User Registered! 💻📱" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

router.get("/getuser", async (req, res) => {
  try {
    let user = await userModel.find({ username: "saad.hn" });
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

  router.put("/update/:email", async (req, res) => {
    try {
      let userParams = req.params.email;
      let userUpdate = req.body;
      console.log("Params:", req.params);
      console.log("Body:", req.body);

      await userModel.updateOne({ email: userParams }, { $set: userUpdate });
      res.status(200).json({ msg: "Updated!" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  });
  router.delete("/deleteall", (req, res) => {
    try {
      res.status(200).json({ msg: "Deleting many users" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: error });
    }
  });
});

export default router;
