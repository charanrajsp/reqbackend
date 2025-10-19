import db from "../config/db.js";

// ✅ Create New Requisition
export const createRequisition = async (req, res) => {
  const { type, department, date, remark, createdBy, items } = req.body;

  if (!type || !department || !date || !createdBy || !items?.length) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // 1️⃣ Get the last requisition number
    const [lastReq] = await new Promise((resolve, reject) => {
      db.query(
        "SELECT reqNo FROM requisitions ORDER BY id DESC LIMIT 1",
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      );
    });

    // 2️⃣ Generate next Req No (REQ001, REQ002, ...)
    const nextNum = lastReq
      ? parseInt(lastReq.reqNo.replace(/\D/g, "")) + 1
      : 1;
    const reqNo = `REQ${String(nextNum).padStart(3, "0")}`;

    // 3️⃣ Insert into requisitions table
    const requisitionInsert = `
      INSERT INTO requisitions
      (reqNo, type, department, date, remark, createdBy, hod_status, store_status, gm_status)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending', 'Pending', 'Pending')
    `;

    const requisitionId = await new Promise((resolve, reject) => {
      db.query(
        requisitionInsert,
        [reqNo, type, department, date, remark, createdBy],
        (err, result) => {
          if (err) reject(err);
          else resolve(result.insertId);
        }
      );
    });

    // 4️⃣ Insert all items (bulk insert)
    const itemValues = items.map((item) => [
      requisitionId,
      item.itemCode || "",
      item.name || item.itemDescription || "",
      item.make || "",
      item.uom || "",
      item.currentStock || 0,
      item.requiredQty || 0,
    ]);

    const itemInsert = `
      INSERT INTO requisition_items
      (requisitionId, itemCode, description, make, uom, currentStock, requiredQty)
      VALUES ?
    `;

    await new Promise((resolve, reject) => {
      db.query(itemInsert, [itemValues], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    // ✅ Success
    res.json({
      message: "✅ Requisition created successfully!",
      reqNo,
    });
  } catch (err) {
    console.error("❌ Error creating requisition:", err);
    res.status(500).json({
      error: err.sqlMessage || err.message || "Failed to create requisition",
    });
  }
};

// 📋 Get all requisitions
export const getAllRequisitions = async (req, res) => {
  db.query("SELECT * FROM requisitions ORDER BY id DESC", (err, results) => {
    if (err) {
      console.error("❌ Error fetching requisitions:", err);
      return res
        .status(500)
        .json({ error: "Failed to fetch requisitions", details: err.sqlMessage });
    }
    res.json(results);
  });
};
