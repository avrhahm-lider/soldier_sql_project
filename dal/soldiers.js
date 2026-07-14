import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
  host: "locakhost",
  user: "root",
  database: "my_db",
  connectionLimit: 10,
});

export async function creatTable() {
  return await pool.execute(`
CREATE TABLE soldiers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    role VARCHAR(15),
    rank VARCHAR(15),
    unit varchar(15),
    age INT NOT NULL,
    status VARCHAR(15) DEFAULT 'active',
    createAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`);
}

async function creatSoldier(soldier = {}) {
  return await pool.execute(
    `
        inaert into soldiers (name, role, rank, unit, age) values(?,?,?,?,?)`[
      (soldier.name, soldier.role, soldier.rank, soldier.unit, soldier.age)
    ]
  );
}

async function getSoldier(getBy) {
  if (getBy.length === 0) return await pool.execute(`SELECT * FROM soldiers`);
  return await pool.execute(`SELECT * FROM soldiers WHERE ${getBy}`);
}

async function getByID(id) {
  return await pool.execute("SELECT * FROM soldiers WHERE id=?", [id]);
}

async function updateSoldier(id, update = {}) {
  const newData = [update.name, update.role, update.rank, update.unit, update.status, id];
  return await pool.execute(
    "UPDATE soldier SET name=?, role=?, rank=?, unit=?, status=? WHERE id=?",
    newData
  );
}

async function deleteByID(id) {
  return await pool.execute("DELELTE  FROM soldiers WHERE id=?", [id]);
}

async function updateStatus(id, status) {
  return await pool.execute("UPDATE soldier SET status=? WHERE id=?", [status, id]);
}
export async function isId(id) {
  return await pool.execute("select count(*) from soldiers WHERE id=?", [id]);
}
export default {
  creatSoldier,
  getSoldier,
  getByID,
  deleteByID,
  updateStatus,
  updateSoldier,
};
