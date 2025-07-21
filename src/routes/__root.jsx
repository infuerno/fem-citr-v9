import { useState } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { CartContext } from "../contexts";
import Header from "../components/Header";
import PizzaOfTheDay from "../components/PizzaOfTheDay";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => {
    const cartHook = useState([]);
    return (
      <>
        <CartContext value={cartHook}>
          <div>
            <Header />
            <Outlet />
            <PizzaOfTheDay />
          </div>
        </CartContext>
        <TanStackRouterDevtools />
      </>
    );
  },
});
