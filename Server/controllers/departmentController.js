import db from "../config/db.js";

export const getDepartments = (req, res) => {
  const query = "SELECT id, name FROM departments";
  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching departments:", err);
      return res.status(500).json({ error: "Failed to fetch departments" });
    }
    res.json(results);
  });
};

export const addDepartment = (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Department name required" });

  db.query("INSERT INTO departments (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      console.error("Error adding department:", err);
      return res.status(500).json({ error: "Failed to add department" });
    }
    res.json({ message: "Department added successfully", id: result.insertId });
  });
};
