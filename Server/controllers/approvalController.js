import db from '../config/db.js';

export const approveRequisition = (req, res) => {
  const { id, role, status } = req.body;
  if (!id || !role || !status) return res.status(400).json({ error: "Missing 'id','role' or 'status'" });

  const fieldMap = { hod: 'hod_status', store: 'store_status', gm: 'gm_status' };
  const field = fieldMap[role.toLowerCase()];
  if (!field) return res.status(400).json({ error: 'Invalid role' });

  const sql = `UPDATE requisitions SET ${field} = ? WHERE id = ?`;
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.error('DB update failed:', err);
      return res.status(500).json({ error: 'Database update failed', details: err.sqlMessage });
    }
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Requisition not found' });
    return res.json({ message: `${role.toUpperCase()} status updated to '${status}'` });
  });
};
