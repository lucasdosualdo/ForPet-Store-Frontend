import { useContext } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { toDelete } from "../services/for-pets";
import { useNavigate } from "react-router-dom";

export default function CartList({ item, key, index }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  function deleteItem() {
    if (!user.token) {
      alert("Sessão expirada. Faça o login novamente");
      return;
    }
   
      const promise = toDelete(user.token, item.itemId);
      promise.then((answer) => {
        navigate('/home')
        console.log(answer.data);
      });
      promise.catch((error) => {
        console.log(error);
        alert("Não foi possível remover o item do carrinho.");
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
          <h4>{`R$ ${item.totalValue}`}</h4>

          <div>
            <h6>{item.quantify}</h6>

            <ion-icon name="trash" onClick = {deleteItem}></ion-icon>
          </div>
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
  h6 {
    color: #15616d;
    font-size: 24px;
    font-weight: 700;
  }
  h4 {
    color: #e8713c;
    font-size: 24px;
    font-weight: 700;
  }
`;

const CartItem = styled.div`
  width: auto;
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
  align-items: flex-end;
  ion-icon {
    color: #a6a6a6;
    margin-left: 10px;
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const QuantItems = styled.div`
  border: 2px solid #cacaca;

  height: 30px;
  display: flex;
  justify-content: center;
  border-radius: 6px;
  align-items: center;
  text-align: center;
  bottom: 15px;
  right: 20px;
  padding: 0 5px;

  p {
    color: #a6a6a6;
    font-size: 20px;
  }
  span {
    display: flex;
    justify-content: center;
  }
`;
