import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import { API } from "../helpers/const";

export const ClientContext = createContext();

const INIT_STATE = {
  products: null,
  cartCount: JSON.parse(localStorage.getItem("cart"))
    ? JSON.parse(localStorage.getItem("cart")).products.length
    : 0,
  cart: null,
  detail: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_PRODUCT_TO_CART":
      return { ...state, cartCount: action.payload };
    case "DELETE_PRODUCT_FROM_CART":
      return { ...state, cartCount: action.payload };
    case "GET_CART":
      return { ...state, cart: action.payload };
    case "GET_DETAIL":
      return { ...state, detail: action.payload };
    default:
      return state;
  }
};

const ClientProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const getProducts = async () => {
    try {
      const response = await axios(`${API}/${window.location.search}`);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data, //то,что нужно сохранить в состоянии
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //   !Pagination
  const productPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state.products) {
      setPosts(state.products);
    }
  }, [state.products]);

  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = posts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalProductsCount = posts.length;

  // !CART
  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let productCart = {
      product: product,
      count: 1,
      subPrice: product.price,
    };
    cart.products.push(productCart);
    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + +item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "ADD_PRODUCT_TO_CART",
      payload: cart.products.length,
    };
    dispatch(action);
    console.log(cart);
  };

  const checkProductInCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
      };
    }
    let check = cart.products.find((item) => {
      return item.product.id === id;
    });
    if (!check) {
      return false;
    } else {
      return true;
    }
  };
  const deleteProductFromCart = (id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.filter((item) => {
      return item.product.id !== id;
    });
    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + +item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    let action = {
      type: "DELETE_PRODUCT_FROM_CART",
      payload: cart.products.lenght,
    };
    dispatch(action);
  };

  const getCarts = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart) {
      cart = {
        products: [],
        totalPrice: 0,
      };
    }
    let action = {
      type: "GET_CART",
      payload: cart,
    };
    dispatch(action);
  };
  const changeCount = (count, id) => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart.products = cart.products.map((item) => {
      if (item.product.id === id) {
        item.count = count;
        item.subPrice = item.count * item.product.price;
        return item;
      } else {
        return item;
      }
    });
    cart.totalPrice = cart.products.reduce((prev, item) => {
      return prev + +item.subPrice;
    }, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    getCarts();
  };

  // !Detail page
  const getDetail = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_DETAIL",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ClientContext.Provider
      value={{
        getProducts,
        setCurrentPage,
        addProductToCart,
        checkProductInCart,
        deleteProductFromCart,
        getCarts,
        changeCount,
        getDetail,
        totalProductsCount,
        productPerPage,
        currentPage,
        products: currentProduct,
        cartCount: state.cartCount,
        cart: state.cart,
        detail: state.detail,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};

export default ClientProvider;
