import axios from "axios";
import React, { createContext, useReducer } from "react";
import { API } from "../helpers/const";

export const AdminContext = createContext();

const INIT_STATE = { products: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, products: action.payload };
    case "GET_PRODUCT_TO_EDIT":
      return { ...state, productsToEdit: action.payload };
    default:
      return state;
  }
};

const AdminProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  // !Добавляем - POST запрос
  const addProduct = async (newProduct) => {
    try {
      await axios.post(API, newProduct);
    } catch (error) {
      console.log(error);
    }
  };
  // !Получаем - GET запрос
  const getProduct = async () => {
    try {
      const response = await axios(API);
      let action = {
        type: "GET_PRODUCTS",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //   !Удаляем - DELETE запрос
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };

  //   !Получаем данные для изменения - GET запрос
  const getProductToEdit = async (id) => {
    try {
      const response = await axios(`${API}/${id}`);
      let action = {
        type: "GET_PRODUCT_TO_EDIT",
        payload: response.data,
      };
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  //   !Сохраняем измененные данные - PATCH запрос
  const saveEditedProduct = async (productEdit) => {
    try {
      await axios.patch(`${API}/${productEdit.id}`, productEdit);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AdminContext.Provider
      value={{
        addProduct,
        getProduct,
        deleteProduct,
        getProductToEdit,
        saveEditedProduct,
        products: state.products,
        productsToEdit: state.productsToEdit,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
