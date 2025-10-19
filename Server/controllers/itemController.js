import db from "../config/db.js";

// ✅ Fetch items by department_id
export const getItemsByDepartment = (req, res) => {
  const { deptId } = req.params;

  const query = `
    SELECT 
      id AS _id,
      name AS itemDescription,
      make,
      uom,
      stock AS currentStock,
      department_id AS departmentId
    FROM items
    WHERE department_id = ?
  `;

  db.query(query, [deptId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching items:", err);
      return res.status(500).json({ error: "Failed to fetch items" });
    }

    res.json(results);
  });
};
export const addItem = (req, res) => {
  const { name, department, make, uom, stock } = req.body;
  if (!name) return res.status(400).json({ error: "Item name required" });

  db.query(
    "INSERT INTO items (name, department, make, uom, stock) VALUES (?, ?, ?, ?, ?)",
    [name, department, make, uom, stock || 0],
    (err, result) => {
      if (err) {
        console.error("Error adding item:", err);
        return res.status(500).json({ error: "Failed to add item" });
      }
      res.json({ message: "Item added successfully", id: result.insertId });
    }
  );
};
