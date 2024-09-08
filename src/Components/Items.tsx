import {
  DeleteOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Badge, Button, Card, Input } from "antd";
import React, { useState } from "react";
import "../Style/Items.scss";
import { Product } from "../Interfaces/Product";
import { useNavigate } from "react-router";
import { useItemsContext } from "../Context/Context";


const fetchApi = async (): Promise<{ products: Product[] }> => {
  const res = await fetch("https://dummyjson.com/products");
  return res.json();
};

const Items: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchApi,
  });

  const [search, setSearch] = useState("");

  const {
    cart,
    loading,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleAllDelete,
  } = useItemsContext();

  const navigate = useNavigate();

  if (isLoading) {
    return <div style={{ fontSize: "1.8rem", padding: 10 }}>Loading...</div>;
  }

  const filteredProducts = data?.products?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.price.toString().includes(search)
  );

  //شمارش روی ایکون سبد خرید
  const totalItemsInCart = Object.values(cart).reduce(
    (acc, curr) => acc + curr,
    0
  );

  return (
    <div className="items">
      <Badge count={totalItemsInCart} style={{ marginTop: 30 }}>
        <ShoppingCartOutlined
          onClick={() => navigate("/basket")}
          style={{ fontSize: 50, cursor: "pointer", margin: 20 }}
        />
      </Badge>

      <Input
        style={{
          marginTop: 30,
          marginBottom: 50,
          height: "8vh",
          fontSize: "1rem",
        }}
        type="text"
        placeholder="Search..."
        prefix={<SearchOutlined />}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {filteredProducts?.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{ width: 240 }}
            cover={<img alt={item.title} src={item.thumbnail} />}
          >
            <Card.Meta title={item.title} description={`$${item.price}`} />

            {cart[item.id] ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {cart[item.id] === 1 ? (
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDecrement(item.id)}
                  />
                ) : (
                  <Button onClick={() => handleDecrement(item.id)}>-</Button>
                )}
                <span style={{ color: "white", marginTop: 20 }}>
                  {cart[item.id]}
                </span>
                <Button onClick={() => handleIncrement(item.id)}>+</Button>
                <div>
                  <Button onClick={() => handleAllDelete()}>حذف</Button>
                </div>
              </div>
            ) : (
              <Button
                loading={loading === item.id}
                style={{ marginTop: "10px" }}
                onClick={() => handleAddToCart(item.id)}
              >
                افزودن به سبد خرید
              </Button>
            )}
          </Card>
        ))}
      </div>
      
    </div>
  );
};

export default Items;
