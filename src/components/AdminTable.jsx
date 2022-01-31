import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

const AdminTable = () => {
  const { getProduct, products, deleteProduct } = useContext(AdminContext);
  useEffect(() => {
    getProduct();
  }, []);

  if (!products) {
    return <h2>Loading...</h2>;
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>
                <Button
                  onClick={() => deleteProduct(item.id)}
                  color="error"
                  variant="contained"
                >
                  DELETE
                </Button>
              </TableCell>

              <TableCell>
                <Link to={`/admin-panel/edit/${item.id}`}>
                  <Button color="warning" variant="contained">
                    EDIT
                  </Button>
                </Link>
              </TableCell>

              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>

              <TableCell align="right">
                <img width={80} src={item.image} alt="product-img" />
              </TableCell>

              <TableCell align="right">{item.brand}</TableCell>
              <TableCell align="right">{item.price}</TableCell>
              <TableCell align="right">{item.color}</TableCell>
              <TableCell align="right">{item.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
