import Pizza from "../components/Pizza";
import Cart from "../components/Cart";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../contexts";
import { intl } from "../utils";

const Order = () => {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(true);

  // derivative state
  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((p) => p.id === pizzaType);
    price = selectedPizza.sizes[pizzaSize];
  }

  const getPizzas = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch("/api/pizzas");
    const json = await response.json();
    setPizzaTypes(json);
    setLoading(false);
  };

  const checkout = async () => {
    setLoading(true);
    const response = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });
    const json = await response.json();
    console.log("Order created:", json);
    setCart([]);
    setLoading(false);
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <div className="order-page">
      <div className="order">
        <h2>Create Order</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCart([...cart, { pizza: selectedPizza, size: pizzaSize, price }]);
          }}
        >
          <div>
            <div>
              <label htmlFor="pizza-type">Pizza Type</label>
              <select
                name="pizza-type"
                id="pizza-type"
                value={pizzaType}
                onChange={(e) => setPizzaType(e.target.value)}
              >
                {pizzaTypes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="pizza-size">Pizza Size</label>
              <div id="pizza-size">
                {["Small", "Medium", "Large"].map((s) => (
                  <span key={s}>
                    <input
                      checked={pizzaSize === s[0]}
                      type="radio"
                      name="pizza-size"
                      value={s[0]}
                      id={`pizza-${s[0].toLowerCase()}`}
                      onChange={(e) => setPizzaSize(e.target.value)}
                    />
                    <label htmlFor={`pizza-${s[0].toLowerCase()}`}>{s}</label>
                  </span>
                ))}
              </div>
            </div>
            <button type="submit">Add to Cart</button>
          </div>
          <div className="order-pizza">
            {loading ? (
              <h3>Loading...</h3>
            ) : (
              <>
                <Pizza
                  key={selectedPizza.id}
                  name={selectedPizza.name}
                  description={selectedPizza.description}
                  image={`/public/pizzas/${selectedPizza.id}.webp`}
                />
                <p>{intl.format(price)}</p>
              </>
            )}
          </div>
        </form>
      </div>
      {loading ? <h3>Loading...</h3> : <Cart cart={cart} checkout={checkout} />}
    </div>
  );
};

export const Route = createFileRoute("/order")({
  component: Order,
});
