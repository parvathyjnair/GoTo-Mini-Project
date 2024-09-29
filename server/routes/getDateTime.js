import express from "express";
import giveDateTime from "../giveDateTime.js";

const router = express.Router();

router.get("/", async (req, res) => {
    let results = giveDateTime();
    res.status(200).send(results);
});

export default router;
// module.exports = router;