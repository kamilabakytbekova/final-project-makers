import { Pagination } from "@mui/material";
import React, { useContext } from "react";
import { ClientContext } from "../contexts/ClientProvider";

const ProductsPagination = () => {
  const { totalProductsCount, productPerPage, setCurrentPage } =
    useContext(ClientContext);
  const count = Math.ceil(totalProductsCount / productPerPage);
  return (
    <div className="products-pagination">
      <Pagination
        onChange={(_, value) => setCurrentPage(value)}
        count={count}
        color="primary"
      />
    </div>
  );
};

export default ProductsPagination;
