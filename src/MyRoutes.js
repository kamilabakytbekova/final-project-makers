import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import AdminPage from "./pages/AdminPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import Navbar from "./components/Navbar";
import AdminProvider from "./contexts/AdminProvider";
import ClientProvider from "./contexts/ClientProvider";
import AuthProvider from "./contexts/AuthProvider";

const MyRoutes = () => {
  return (
    <AuthProvider>
      <ClientProvider>
        <AdminProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/admin-panel" element={<AdminPage />} />
              <Route path="/admin-panel/add" element={<AddPage />} />
              <Route path="/admin-panel/edit/:id" element={<EditPage />} />
              <Route path="/product-detail/:id" element={<DetailPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </ClientProvider>
    </AuthProvider>
  );
};

export default MyRoutes;
