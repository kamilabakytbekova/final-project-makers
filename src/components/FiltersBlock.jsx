import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";

const FiltersBlock = () => {
  const search = new URLSearchParams(window.location.search);
  const navigate = useNavigate();
  const { getProducts } = useContext(ClientContext);
  const [searchValue, setSearchValue] = useState(search.get("q") || "");
  const [colorValue, setColorValue] = useState(search.get("color") || "");
  const [priceValue, setPriceValue] = useState(search.get("price_lte") || "");

  const filterProducts = (key, value) => {
    search.set(key, value);
    let newPath = `${window.location.pathname}?${search.toString()}`;
    navigate(newPath);
    setSearchValue(search.get("q") || "");
    setColorValue(search.get("color") || "");
    setPriceValue(search.get("price_lte") || "");
    getProducts();
  };

  const resetFilter = () => {
    navigate("/");
    setSearchValue("");
    setColorValue("");
    setPriceValue("");
    getProducts();
  };
  return (
    <div className="filters-block">
      <div>
        <TextField
          value={searchValue}
          onChange={(e) => filterProducts("q", e.target.value)}
          variant="outlined"
          label="Живой поиск..."
        ></TextField>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id="color-select">Цвет</InputLabel>
          <Select
            value={colorValue}
            onChange={(e) => filterProducts("color", e.target.value)}
            label="Выберите цвет"
            labelId="color-select"
          >
            <MenuItem value="black">Черный</MenuItem>
            <MenuItem value="white">Белый</MenuItem>
            <MenuItem value="grey">Серый</MenuItem>
            <MenuItem value="space-grey">Темно-серый</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
        <Slider
          onChange={(e) => filterProducts("price_lte", e.target.value)}
          valuedisplay="auto"
          max={200000}
          step={100}
        />
      </div>
      <div>
        <Button onClick={resetFilter} variant="contained" color="success">
          Сбросить
        </Button>
      </div>
    </div>
  );
};

export default FiltersBlock;
