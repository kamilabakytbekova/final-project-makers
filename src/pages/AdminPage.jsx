import { Container } from "@mui/material";
import React from "react";
import AdminTable from "../components/AdminTable";

const AdminPage = () => {
  return (
    <div>
      <Container>
        <h2>Admin page</h2>
        <AdminTable />
      </Container>
    </div>
  );
};

export default AdminPage;
