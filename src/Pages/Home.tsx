import React from "react";
import "../Style/Home.scss";
import { Button } from "antd";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import NavBar from "./NavBar";

const Home: React.FC = () => {
  const navigate = useNavigate();
  //یوز کویری رو بزار که اولش لودینگ باشه بعد صفحه رو بیاره

  const fetchData = () => {
    return new Promise<string>((resolve) => {
      setTimeout(() => {
        resolve("data loaded");
      }, 700);
    });
  };

  const { isLoading } = useQuery({ queryKey: ["newhome"], queryFn: fetchData });

  if (isLoading) {
    return <div style={{ fontSize: "1.8rem", padding: 10 }}>Loading... </div>;
  }

  return (
    <>
      <NavBar onClick={() => navigate("./")} />

      <div className="home">
        <div className="welcome">به اسنپ شات خوش آمدید</div>

        <div className="btn">
          <Button onClick={() => navigate("./items")}>آیتم ها</Button>
          <Button onClick={() => navigate("./basket")}>سبد خرید</Button>
        </div>
      </div>
    </>
  );
};

export default Home;
