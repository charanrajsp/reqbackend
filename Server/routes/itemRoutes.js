import express from "express";
import { addItem } from "../controllers/itemController.js";
import { getItemsByDepartment } from "../controllers/itemController.js";

const router = express.Router();


router.post("/", addItem);

router.get("/:deptId", getItemsByDepartment);
export default router;
