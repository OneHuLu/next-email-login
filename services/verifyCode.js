import { getCaptcha, deleteCaptcha } from '@/lib/api/verifyCode';

const verifyCodeService = async (email, code) => {
    // 检查请求参数是否完整
    if (!email || !code) {
        return { message: '邮箱、验证码不能为空', status: 100010 };
    }
    // 获取验证码
    const [captcha] = await getCaptcha(email);
    // 验证验证码是否正确
    if (!captcha) {
        return { message: '验证码不存在或已过期', status: 100010 };
    }
    if (captcha.code !== code) {
        return { message: '验证码错误', status: 100020 };
    }
    // 验证码验证成功，删除验证码
    await deleteCaptcha(email);
    return { message: 'success', status: 100000 };
}

export {
    verifyCodeService
}