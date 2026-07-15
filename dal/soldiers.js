import mysql2 from "mysql2/promise";

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "my_db",
  connectionLimit: 10,
});

export async function creatTable() {
  const [res] = await pool.execute(`
CREATE TABLE IF NOT EXISTS soldiers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    role VARCHAR(15),
    \`rank\` VARCHAR(15),
    unit VARCHAR(15),
    age INT NOT NULL,
    status VARCHAR(15) DEFAULT 'active',
    createAT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );`);
        return res
}

async function creatSoldier(soldier = {}) {
  const [res] = await pool.execute(
    'INSERT INTO soldiers (name, role, \`rank\`, unit, age, status) VALUES(?,?,?,?,?,?)',[
      soldier.name, soldier.role, soldier.rank, soldier.unit, soldier.age, 'active'
    ]
  );
  return res
}

async function getSoldier() {
    const [res] = await pool.execute(`SELECT * FROM soldiers`);
    return res
}


async function getSoldierParm(whereClause, values) {

    const [res] = await pool.execute(`SELECT * FROM soldiers WHERE ${whereClause}`, values);
    return res
  }

async function getByID(id) {
  const [res] =  await pool.execute("SELECT * FROM soldiers WHERE id=?", [id]);
  return res
}

async function updateSoldier(id, update = {}) {
  const newData = [update.name, update.role, update.rank, update.unit, update.status, id];
  const [res] =  await pool.execute("UPDATE soldiers SET name=?, role=?, \`rank\`=?, unit=?, status=? WHERE id=?", newData);
  return res
}

async function deleteByID(id) {
    console.log(id );
    
  const [res] =  await pool.execute("DELETE FROM soldiers WHERE id=?", [id]);
  return res
}

async function updateStatus(id, status) {
  const [res] =  await pool.execute("UPDATE soldiers SET status=? WHERE id=?", [status, id]);
  return res
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
  getSoldierParm
};
