import { Button, Container } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ClientContext } from "../contexts/ClientProvider";

const DetailPage = () => {
  const params = useParams();
  const {
    getDetail,
    detail,
    checkProductInCart,
    deleteProductFromCart,
    addProductToCart,
  } = useContext(ClientContext);

  const navigate = useNavigate();

  useEffect(() => {
    getDetail(params.id);
  }, []);

  if (!detail) {
    return <h2>Loading...</h2>;
  }
  return (
    <div>
      <Container>
        <Button onClick={() => navigate(-1)} variant="text">
          Назад
        </Button>
        <h2>Detail page</h2>
        <div className="detail-page">
          <div className="detail-left">
            <img src={detail.image} alt="detail-img" />
          </div>
          <div className="detail-right">
            <h3>{detail.name}</h3>
            <ul>
              <li>
                Бренд: <strong>{detail.brand}</strong>
              </li>
              <li>
                Цвет: <strong>{detail.color}</strong>
              </li>
              <li>
                Цена: <strong>{detail.price}</strong>
              </li>
              <li>
                Описание: <strong>{detail.description}</strong>
              </li>
            </ul>
            <div>
              {checkProductInCart(detail.id) ? (
                <Button
                  onClick={() => deleteProductFromCart(detail.id)}
                  size="small"
                  variant="contained"
                  color="warning"
                >
                  В корзине
                </Button>
              ) : (
                <Button
                  onClick={() => addProductToCart(detail)}
                  size="small"
                  variant="contained"
                >
                  В корзину
                </Button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DetailPage;
