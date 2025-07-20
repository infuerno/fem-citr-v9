import { useState, useEffect, useDebugValue } from "react";
const usePizzaOfTheDay = () => {
  const [pizzaOfTheDay, setPizzaOfTheDay] = useState(null);
  // For debugging purposes, we can use useDebugValue to show the current state of pizzaOfTheDay in the React DevTools
  useDebugValue(pizzaOfTheDay ? `${pizzaOfTheDay.id}` : "Loading...");

  useEffect(() => {
    const fetchPizzaOfTheDay = async () => {
      const response = await fetch("/api/pizza-of-the-day");
      const json = await response.json();
      setPizzaOfTheDay(json);
    };
    fetchPizzaOfTheDay();
  }, []);

  return pizzaOfTheDay;
};

export default usePizzaOfTheDay;
