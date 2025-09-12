import express from "express";
import diaryServices from "../services/diaryServices";
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(diaryServices.getNonSensitiveDiaryEntries());
});

router.post('/', (_req, res) => {
    res.json("saving the diaries");
});

export default router;