import express from "express";
import db from "../config/db.js";
import { getDepartments,addDepartment } from "../controllers/departmentController.js";
const router = express.Router();

// ➕ Add Department
router.post("/",addDepartment);
  

// 📋 Get All Departments
router.get("/", getDepartments);

export default router;
