import React from 'react';
import { useItemsContext } from '../Context/Context';
import { Card, Button } from 'antd';
import { Product } from '../Interfaces/Product';

const Basket: React.FC<{ products: Product[] }> = ({ products }) => {
  const { cart, handleIncrement, handleDecrement, handleAllDelete } = useItemsContext();

  // ایجاد یک لیست از آیتم‌های سبد خرید با اطلاعات محصول و تعداد
  const cartItems = Object.keys(cart).map((id) => {
    const product = products.find((item) => item.id === parseInt(id));
    return {
      ...product,
      quantity: cart[id],
    };
  });

  // محاسبه قیمت کل سبد خرید
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="basket">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <Card
            key={item.id}
            hoverable
            cover={<img alt={item.title} src={item.thumbnail} />}
            style={{ width: 300, marginBottom: 20, display:"flex", alignItems:"center" }}
          >
            <Card.Meta title={item.title} description={`$${item.price}`} />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
              <Button onClick={() => handleDecrement(item.id)}>-</Button>
              <span>{item.quantity}</span>
              <Button onClick={() => handleIncrement(item.id)}>+</Button>
            </div>
          </Card>
        ))
      ) : (
        <div>Your basket is empty</div>
      )}
      {cartItems.length > 0 && (
        <>
          <div style={{ fontSize: '1.5rem', marginTop: 20 }}>
            {`قیمت نهایی: $${totalPrice}`} {/* نمایش قیمت کل سبد خرید */}
          </div>
          <Button onClick={() => handleAllDelete()} style={{ marginTop: 20 }}>
            حذف کل سبد
          </Button>
        </>
      )}
    </div>
  );
};

export default Basket;
