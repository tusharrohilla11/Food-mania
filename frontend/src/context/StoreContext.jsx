import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  // const url = "https://foodmania-1gtj.onrender.com";
  // const url = "http://localhost:8000";
  const url = "https://food-mania-backend-livid.vercel.app";

  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    // if the user adding for the first time in the cart.
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    }
    // if food already added and quantity is one, then increase the count
    else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    // when user logged in then token gets generated and when item added in the cart then product will be added in the cart data also.
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  // Logic to retun the cart total
  const getTotalCartAmount = () => {
    let totalAmount = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  // Fetching the food list from the DB.
  const fetchFoodList = useCallback(async () => {
    try {
      console.log("Fetching food list from:", url + "/api/food/list");
      const response = await axios.get(url + "/api/food/list");
      console.log("Food list response:", response.data);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
      console.error("Error details:", error.response?.data);
    }
  }, [url]);

  // Load Cart Data fetches data from particular users data which displays the actual quantity has been added of every item.
  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );

      // saving the cart data in cartItems variable
      setCartItems(response.data.cartData);
    } catch (error) {
      console.error("Error loading cart data:", error);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList(); // calling fetchFoodList() func.

      // Saving the local storage data in the token state when we reload the webpage, so that when page gets reloaded the user cannot gets logged out automatically and display added quantity of every items.
      if (localStorage.getItem("token")) {
        // saving
        setToken(localStorage.getItem("token"));

        // loading the func when getting the token from localStorage
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, [fetchFoodList]);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    fetchFoodList,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
