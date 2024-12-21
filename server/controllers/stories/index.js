import express from "express";

const router = express.Router();

router.get("/getallstories", (req, res) => {
  try {
    res.status(200).json({ msg: "all stories" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error });
  }
});

export default router;
