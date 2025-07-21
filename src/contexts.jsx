import { createContext } from "react";

// useful to initialize it with the shape of the data you expect
// it will be holding a useState hook which will be an array of: the cart (an array), and a function to update it
const CartContext = createContext([[], () => {}]);

export { CartContext };
