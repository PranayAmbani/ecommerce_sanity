import React, {
    useContext,
    useState,
    createContext,
  } from "react";
  
  import { toast } from "react-hot-toast";
  
  const Context = createContext();
  
  export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);
  
    let foundProduct;
    let index;
    const onAdd = (product, quantity) => {
      // check if product in the cart
      const checkProductInCart = cartItems.find((item) => item.id === product.id);
      foundProduct = cartItems.find((item) => item.id === product.id);
      let newCartItems = cartItems.filter((items) => items.id !== product.id);
  
  
      // update total quantity and total price when user click in add to cart
      setTotalQuantities((prevQuantities) => prevQuantities + quantity);
      setTotalPrice((prevPrice) => prevPrice + product.price * quantity);
      if (checkProductInCart) {
        const updateCartItems = cartItems.map((cardProduct,i,arr) => {
          if (cardProduct.id === product.id)
            return [
              ...newCartItems,
              { ...cardProduct, quantity: cardProduct.quantity + quantity },
            ];
        });
        setCartItems(updateCartItems[newCartItems.length]);
      } else {
  
        // copy product from props because we can't use it directly
        var copyProduct = JSON.parse(JSON.stringify(product));
        copyProduct.quantity = quantity;
  
        setCartItems([...cartItems, { ...copyProduct }]);
      }
      toast.success(
        `${qty} ${product.title.substring(0, 18)} added to the cart.`
      );
      setQty(1);
    };
  
    const onRemove = (product) => {
      const newCartItems = cartItems.filter((item) => (item._id !== product._id));
  
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice - product.price * product.quantity
      );
  
      setTotalQuantities(
        (prevTotalQuantities) => prevTotalQuantities - product.quantity
      );
  
      setCartItems(newCartItems);
    };
  
    const toggleCartItemQuantity = (id, value) => {
      if (value === "inc") {
        const newCartItems = cartItems.map((product) => {
          if (product._id === id) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
            product.quantity += 1;
          }
          return product;
        });
  
        setCartItems(newCartItems);
      } else if (value === "dec") {
        const newCartItems = cartItems.map((product) => {
          if (product._id === id && product.quantity > 1) {
            setTotalPrice((prevTotalPrice) => prevTotalPrice - product.price);
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
            product.quantity -= 1;
          }
          return product;
        });
  
        setCartItems(newCartItems);
      }
    };
  
    const incQty = () => {
      setQty((prevQty) => prevQty + 1);
    };
  
    const decQty = () => {
      setQty((prevQty) => {
        if (prevQty - 1 < 1) return 1;
        return prevQty - 1;
      });
    };
  
    return (
      <Context.Provider
        value={{
          showCart,
          cartItems,
          totalPrice,
          totalQuantities,
          qty,
          incQty,
          decQty,
          onAdd,
          showCart,
          setShowCart,
          toggleCartItemQuantity,
          onRemove,
          setCartItems,
          setTotalPrice,
          setTotalQuantities,

        }}
      >
        {children}
      </Context.Provider>
    );
  };
  
  export const useStateContext = () => useContext(Context);