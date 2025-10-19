import express from "express";
import {
  approveRequisition,
 // getRequisitionDetails,
} from "../controllers/approvalController.js";

const router = express.Router();

// Update approval status
router.post("/update", approveRequisition);

// Fetch requisition + items by req_no
//router.get("/:reqNo", getRequisitionDetails);

export default router;
