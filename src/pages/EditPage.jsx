import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

const EditPage = () => {
  const params = useParams();

  const { productsToEdit, getProductToEdit, saveEditedProduct } =
    useContext(AdminContext);

  const [productEdit, setProductEdit] = useState(productsToEdit);

  const navigate = useNavigate();

  useEffect(() => {
    setProductEdit(productsToEdit);
  }, [productsToEdit]);

  useEffect(() => {
    getProductToEdit(params.id);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    for (const key in productEdit) {
      if (!productEdit[key]) {
        alert("Заполните все поля!");
        return;
      }
    }
    saveEditedProduct(productEdit);
    navigate("/admin-panel");
  };

  if (!productEdit) {
    return <h2>Loading...</h2>;
  }
  return (
    <div className="add-edit-page">
      <Container>
        <h2>Edit page</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              setProductEdit({ ...productEdit, name: e.target.value })
            }
            value={productEdit.name}
            label="Введите название"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setProductEdit({ ...productEdit, brand: e.target.value })
            }
            value={productEdit.brand}
            label="Введите бренд"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setProductEdit({ ...productEdit, price: e.target.value })
            }
            value={productEdit.price}
            label="Введите цену"
            variant="standard"
          />
          <TextareaAutosize
            onChange={(e) =>
              setProductEdit({ ...productEdit, description: e.target.value })
            }
            value={productEdit.description}
            placeholder="Введите описание"
            minRows={3}
          />
          <TextField
            onChange={(e) =>
              setProductEdit({ ...productEdit, image: e.target.value })
            }
            value={productEdit.image}
            label="Введите фото"
            variant="standard"
          />

          <FormControl fullWidth>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              onChange={(e) =>
                setProductEdit({ ...productEdit, color: e.target.value })
              }
              value={productEdit.color}
              label="Выберите цвет"
              labelId="color-select"
            >
              <MenuItem value="black">Черный</MenuItem>
              <MenuItem value="white">Белый</MenuItem>
              <MenuItem value="grey">Серый</MenuItem>
              <MenuItem value="space-grey">Темно-серый</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="success">
            Save changes
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default EditPage;
