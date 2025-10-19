import express from "express";
import {
  createRequisition,
  getAllRequisitions,
} from "../controllers/requisitionController.js";

const router = express.Router();

router.post("/", createRequisition);
router.get("/", getAllRequisitions);

export default router;
