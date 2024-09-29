import express from "express";
import connectToDatabase from "../db/conn.js";

const router = express.Router();

router.delete("/", async (req, res) => {
    let key = req.body.key;

    if (key !== process.env.JWT_SECRET) {
        res.status(401).send("Invalid Key");
        return;
    }

    let db = await connectToDatabase();
    const collection = db.collection("TravelDetails");
  
    let now = new Date();
    let currentDate = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    currentDate = currentDate.toISOString().split('T')[0];
  
    let result = await collection.deleteMany({ date: { $lt: currentDate } });
    // console.log(result);
    res.status(200).send(result);
});

export default router;