"use client";
import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleSendCode = async () => {
    if (!email) {
      setMessage("请输入邮箱和验证码");
      return;
    }

    setLoading(true);
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
        setMessage("验证码验证成功");
      } else {
        setMessage(data.message || "验证失败");
      }
    } catch (error) {
      console.error(error);
      setMessage("网络错误，请稍后再试");
    } finally {
      setLoading(false);
    }
  };
  // 验证验证码
  const handleVerifyCode = async () => {
    if (!email || !code) {
      setMessage("请输入邮箱和验证码");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, code }),
      });
      const data = await response.json();
      if (data.status === 200) {
        setMessage("验证码验证成功");
      } else {
        setMessage( data.message || "验证失败");
      }
    } catch (error) {
      console.log(error);
      setMessage("网络错误，请稍后再试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>验证验证码</h2>
      <input
        type="email"
        placeholder="请输入邮箱"
        value={email}
        onChange={handleEmailChange}
      />
      <input
        type="text"
        placeholder="请输入验证码"
        value={code}
        onChange={handleCodeChange}
      />
      <button onClick={handleSendCode} disabled={loading}>
        {loading ? "发送中..." : "发送验证码"}
      </button>
      <button onClick={handleVerifyCode} disabled={loading}>
        {loading ? "验证中..." : "验证验证码"}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
