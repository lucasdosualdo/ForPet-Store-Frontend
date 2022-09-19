import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { deleteItem, decrementItem } from "../services/for-pets";
import { useNavigate } from "react-router-dom";

export default function CartList({ item, key, index }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function decrement() {
    if (!user.token) {
      alert("Sessão expirada. Faça o login novamente");
      return;
    }
    if (item.quantify === 1) {
      const promise = deleteItem(user.token, item.itemId);
      promise.then((answer) => {
        console.log(answer.data);
      });
      promise.catch((error) => {
        console.log(error);
        alert("Não foi possível remover o item do carrinho.");
      });
      return;
    }
    const body = {
      itemId: item.itemId
    }
    const promise = decrementItem(user.token, body);
    promise.then((answer) => {
      console.log(answer.data);
    });
    promise.catch((error) => {
      console.log(error);
      alert("não foi possível diminuir a quantidade do item.");
    });
  }

  return (
    <CartItem>
      <div>
        <img src={item.image} />
      </div>

      <InfoContainer>
        <h5>{item.name}</h5>
        <PriceBox>
          <h4>{`R$ ${item.price.replace(".", ",")}`}</h4>
          <QuantItems>
            <span>
              <h5 onClick={decrement}>-</h5>
            </span>
            <span>
              <h5>{item.quantify}</h5>
            </span>
            <span>
              <h4>+</h4>
            </span>
          </QuantItems>
        </PriceBox>
      </InfoContainer>
    </CartItem>
  );
}

const InfoContainer = styled.div`
  margin-left: 5px;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h5 {
    color: #a6a6a6;
    font-size: 18px;
    line-height: 20px;
    text-align: left;
    width: 100%;
    word-wrap: break-word;
  }

  h4 {
    color: #e8713c;
    font-size: 24px;
    font-weight: 700;
  }
`;

const CartItem = styled.div`
  width: 100%;
  background-color: white;
  height: auto;
  display: flex;
  justify-content: space-between;
  max-height: 220px;
  padding: 15px 15px 20px 15px;
  margin-bottom: 3px;
  div {
    &:first-child {
      width: 30%;
      display: flex;
      justify-content: start;
      height: 100%;
    }
  }
  img {
    max-width: 110px;
    max-height: 70%;
  }
`;

const PriceBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const QuantItems = styled.div`
  border: 2px solid #cacaca;
  width: 90px;
  height: 30px;
  display: flex;
  justify-content: space-between;
  border-radius: 6px;
  align-items: center;
  text-align: center;
  bottom: 15px;
  right: 20px;
  padding: 0 5px;
  h4 {
    color: #15616d;
    font-weight: 500;
  }
  p {
    color: #a6a6a6;
    font-size: 20px;
  }
`;
