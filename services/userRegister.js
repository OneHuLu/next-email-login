import { insertUser } from "../lib/api/userRegister";

const insertUserService = async (email, password) => {
    // 插入用户到数据库
    const result = await insertUser(email, password);
    if (result.affectedRows === 1) {
        return { message: '注册成功', status: 100000 };
    } else {
        return { message: '注册失败', status: 100011 };
    }
}

export {
    insertUserService
}