import { Button, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import "../Style/Login.scss";
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const Login: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useLocalStorage("login-number", "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // بعد از رفرش . اینپوت خالی میشه
    setMobileNumber("");
  }, [setMobileNumber]);

  function handleClick() {
    if (mobileNumber === "") {
      setMessage("لطفا شماره موبایل را وارد کنید");
      return;
    }

    setLoading(true); // Show the spinner
    setMessage(null);

    setTimeout(() => {
      if (mobileNumber === "09356919922") {
        setMessage("خوش آمدید");
      } else {
        setMessage("شماره موبایل اشتباه است");
      }
      setLoading(false); // Hide the spinner

      if (mobileNumber === "09356919922") {
        setTimeout(() => {
          navigate('/home'); 
        }, 1000); 
      }
    }, 1200); 
  }

  function keyEnter(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleClick();
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobileNumber(value);
    }
  }

  return (
    <div className="login-container">
      <div className="sh">
        <h1>ورود به حساب کاربری</h1>
        <p>:سلام! لطفا جهت ورود شماره موبایل خود را وارد کنید</p>

        <Input
          type="text"
          placeholder="شماره موبایل"
          value={mobileNumber}
          onChange={handleInputChange}
          onKeyUp={keyEnter}
        />

        <Button
          style={{ marginTop: 20 }}
          onClick={handleClick}
        >
          ثبت
        </Button>

        
      </div>
      {loading && <Spin size="large" style={{ marginTop: 20 }} />}
      {message  && <p style={{ marginTop: 20, color: message === "خوش آمدید" ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default Login;
