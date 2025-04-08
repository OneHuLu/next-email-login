"use client";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 获取验证码
  const handleSendCode = async () => {
    if (!email) {
      setMessage("请输入邮箱");
      return;
    }
    setMessage("");
    try {
      const response = await fetch("/api/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("验证码已发送，请查收邮箱");
      } else {
        setMessage(data.message || "验证码发送失败");
      }
    } catch (error) {
      console.error(error);
      setMessage("网络错误，请稍后再试");
    }
  };
  // 登录
  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !code || !password) {
      setMessage("请输入邮箱、验证码和密码");
      return;
    }
    setMessage("");
    try {
      const response = await fetch("/api/user-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code, password }),
      });

      const data = await response.json();
      console.log("Login response", data);

      if (data.status === 100000) {
        setMessage("登录成功");
      } else {
        setMessage(data.message || "登录失败");
      }
    } catch (error) {
      console.error(error);
      setMessage("网络错误，请稍后再试");
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" onChange={handleEmailChange} />
        <div>
          <input
            type="text"
            placeholder="Captcha"
            onChange={handleCodeChange}
          />
          <button type="button" onClick={handleSendCode}>Get Captcha</button>
        </div>
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
      <div>{message}</div>
    </div>
  );
}
