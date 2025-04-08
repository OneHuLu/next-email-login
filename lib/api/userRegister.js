import db from '@/lib/db';
/**
 * description 插入用户
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @returns {Promise<object>} 数据库操作结果
 */
const insertUser = async (email, password) => {
    const sql = 'INSERT INTO users (email, password_hash) VALUES (?, ?)';
    const [rows] = await db.execute(sql, [email, password]);
    return rows;
}

export {
    insertUser
}