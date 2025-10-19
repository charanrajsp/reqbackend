// server.js
import express from "express";
import cors from "cors";
import requisitionRoutes from "./routes/requisitionRoutes.js";
import approvalRoutes from "./routes/approvalRoutes.js";
import departmentRoutes from "./routes/departmentRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // replaces bodyParser.json()
app.use(express.urlencoded({ extended: true }));

// ✅ Routes
app.use("/api/requisitions", requisitionRoutes);
app.use("/api/approvals", approvalRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/items", itemRoutes);

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", serverTime: new Date().toISOString() });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("❌ Unhandled Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
