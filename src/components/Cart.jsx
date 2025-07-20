import { intl } from "../utils";

const Cart = ({ cart, checkout }) => {
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
  });

  return (
    <div className="cart">
      <h2>Cart</h2>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <span className="size">{item.size}</span> - <span className="type">{item.pizza.name}</span> -{" "}
            <span className="price">{intl.format(item.price)}</span>
          </li>
        ))}
      </ul>
      <p>Total: {intl.format(total)}</p>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
};

export default Cart;
