import Pizza from "./Pizza";
import { useState, useEffect } from "react";

const intl = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const Order = () => {
  const [pizzaType, setPizzaType] = useState("pepperoni");
  const [pizzaSize, setPizzaSize] = useState("M");
  const [pizzaTypes, setPizzaTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  // derivative state
  let price, selectedPizza;

  if (!loading) {
    selectedPizza = pizzaTypes.find((p) => p.id === pizzaType);
    price = intl.format(selectedPizza.sizes[pizzaSize]);
  }

  const getPizzas = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const response = await fetch("/api/pizzas");
    const json = await response.json();
    setPizzaTypes(json);
    setLoading(false);
  };

  useEffect(() => {
    getPizzas();
  }, []);

  return (
    <div className="order">
      <h2>Create Order</h2>
      <form>
        <div>
          <div>
            <label htmlFor="pizza-type">Pizza Type</label>
            <select name="pizza-type" value={pizzaType} onChange={(e) => setPizzaType(e.target.value)}>
              {pizzaTypes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pizza-size">Pizza Size</label>
            <div>
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
              <p>{price}</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Order;
