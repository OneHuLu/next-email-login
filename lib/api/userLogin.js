import db from '@/lib/db';

// 用户登录验证
/**
 * description 用户登录验证
 * @param {string} email 邮箱
 * @param {string} password 密码
 * @returns {Promise<object>} 数据库操作结果
 */
const verifyUser = async (email, password) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password_hash = ?';
    const [rows] = await db.execute(sql, [email, password]);
    return rows;
}


export {
    verifyUser
}