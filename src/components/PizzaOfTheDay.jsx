import { usePizzaOfTheDay } from "../hooks/usePizzaOfTheDay";

const intl = Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const PizzaOfTheDay = () => {
  const pizzaOfTheDay = usePizzaOfTheDay();

  if (!pizzaOfTheDay) return <h3>Loading...</h3>;

  return (
    <div className="pizza-of-the-day">
      <h2>Pizza of the Day</h2>
      <div>
        <div className="pizza-of-the-day-info">
          <h3>{pizzaOfTheDay.name}</h3>
          <p>{pizzaOfTheDay.description}</p>
          <p className="pizza-of-the-day-price">From: {intl.format(pizzaOfTheDay.sizes.S)}</p>
        </div>
        <img className="pizza-of-the-day-image" src={pizzaOfTheDay.image} alt={pizzaOfTheDay.name} />
      </div>
    </div>
  );
};

export default PizzaOfTheDay;
