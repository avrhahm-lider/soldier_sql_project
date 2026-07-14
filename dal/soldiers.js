import mysql2 from 'mysql2/promise'

const pool = mysql2.createPool()

async function creatTable() {
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
        )`)
}

async function creatSoldier(soldier = {}) {
    return await pool.execute(`
        inaert into soldiers (name, role, rank, unit, age) values(?,?,?,?,?)`[soldier.name, soldier.role, soldier.rank, soldier.unit, soldier.age])
}
    const options = ["unit", "rank", "status"]
    let getBy = ""
    for (let i = 0; i < 3; i++){
        if (qp[options[i]])
            getBy += `${options[i]}=${qp[options[i]]}`
    }
async function getSoldier(getBy) {
    return await pool.execute(`SELECT * FROM soldiers WHERE ${getBy}` )
    
}

async function getByID(id) {
    return await pool.execute("SELECT * FROM soldiers WHERE id=?",[id])
}

async function updateSoldier(id, update ={}) {
    const newData = [update.name, update.role, update.rank, update.unit, update.status, id]
    return await pool.execute('UPDATE soldier SET name=?, role=?, rank=?, unit=?, status=? WHERE id=?',newData)
    
}

async function deleteByID(id) {
    return await pool.execute("DELELTE  FROM soldiers WHERE id=?",[id])
}

async function updateSoldier(id, status) {
    const newData = [update.name, update.role, update.rank, update.unit, update.status, id]
    return await pool.execute('UPDATE soldier SET status=?',[status])
}