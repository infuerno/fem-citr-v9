import { createContext } from "react";

// useful to initialize it with the shape of the data you expect
// it will be holding a hook which is the cart, plus the return type of a hook
const CartContext = createContext([], () => {});

export { CartContext };
