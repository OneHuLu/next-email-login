import db from '@/lib/db';

/**
 * @description 获取验证码
 * @param {string} email 邮箱
 * @returns  { code, expires_at } 验证码和过期时间
 */
const getCaptcha = async (email) => {
    const sql = 'SELECT code, expires_at FROM verification_codes WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows;
};

/**
 * @description 删除验证码
 * @param {string} email 邮箱
 * @returns {Promise} 删除结果
 */
const deleteCaptcha = async (email) => {
    const sql = 'DELETE FROM verification_codes WHERE email = ?';
    const [rows] = await db.execute(sql, [email]);
    return rows;
}
export {
    getCaptcha,
    deleteCaptcha
}