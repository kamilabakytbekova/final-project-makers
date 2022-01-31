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
import React, { useContext, useState } from "react";
import { AdminContext } from "../contexts/AdminProvider";

const AddPage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    brand: "",
    price: "",
    description: "",
    image: "",
    color: "",
  });

  const { addProduct } = useContext(AdminContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // !Проверка на пустоту
    for (const key in newProduct) {
      if (!newProduct[key]) {
        alert("Заполните все поля!");
        return;
      }
    }
    addProduct(newProduct);
    // !Очищаем инпуты
    setNewProduct({
      name: "",
      brand: "",
      price: "",
      description: "",
      image: "",
      color: "",
    });
  };

  return (
    <div className="add-edit-page">
      <Container>
        <h2>Add page</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
            value={newProduct.name}
            label="Введите название"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
            value={newProduct.brand}
            label="Введите бренд"
            variant="standard"
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
            value={newProduct.price}
            label="Введите цену"
            variant="standard"
          />
          <TextareaAutosize
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
            value={newProduct.description}
            placeholder="Введите описание"
            minRows={3}
          />
          <TextField
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
            value={newProduct.image}
            label="Введите фото"
            variant="standard"
          />

          <FormControl fullWidth>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              onChange={(e) =>
                setNewProduct({ ...newProduct, color: e.target.value })
              }
              value={newProduct.color}
              label="Выберите цвет"
              labelId="color-select"
            >
              <MenuItem value="black">Черный</MenuItem>
              <MenuItem value="white">Белый</MenuItem>
              <MenuItem value="grey">Серый</MenuItem>
              <MenuItem value="space-grey">Темно-серый</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Добавить
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default AddPage;
