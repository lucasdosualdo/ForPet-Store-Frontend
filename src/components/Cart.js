import Page from "../styles/Page";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { getCart, postPurchase, toDelete } from "../services/for-pets";
import { useNavigate } from "react-router-dom";
import CartList from "./CartList";
import styled from "styled-components";
import dayjs from "dayjs";

export default function Cart() {
  //const { itemContext } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const [totalCounter, setTotalCounter] = useState(0);
  const navigate = useNavigate();

  function showtCartItems() {
    if (!user.token) {
      alert("Sessão expirada. Faça o login novamente");
      return;
    }
    const promise = getCart(user.token);
    promise.then((answer) => {
      setCartItemsArray(answer.data);
      let teste = 0;
      answer.data.forEach((item) => {
        teste = Number(teste) + Number(item.totalValue);
      });
      teste = Number(teste);
      console.log(teste, typeof teste);

      setTotalCounter(teste);
    });
    promise.catch((error) => {
      alert("Algo deu errado.");
      navigate("/home");
    });
  }

  useEffect(() => {
    showtCartItems();
  }, []);

  function purchaseItem() {
    if (!user.token) {
      alert("Sessão expirada. Faça o login novamente");
      return;
    }
    if (cartItemsArray.length === 0) {
      alert("Você precisa adicionar pelo menos um item ao carrinho.");
      return;
    }
    const purchaseItemsArray = cartItemsArray.map((item) => ({
      itemId: item.itemId,
      quantify: item.quantify,
      totalValue: item.totalValue,
    }));

    const body = {
      userId: user.userId, //nao achado
      date: dayjs().format("DD/MM/YYYY"),
      email: user.email,
      items: purchaseItemsArray,
      totalValue: totalCounter,
    };
    const promise = postPurchase(user.token, body);
    promise.then((answer) => {
      toDelete(user.token, "checkout");
      navigate(`/order/${answer.data.insertedId}`);
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  }

  return (
    <Page page="cart">
      <EmptyMessage>
        {cartItemsArray.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          cartItemsArray.map((item, index) => (
            <CartList item={item} key={index} index={index} />
          ))
        )}
      </EmptyMessage>
      <OrderBox>
        <div>
          <h6>Total: </h6>
          <h4>R$ {totalCounter.toFixed(2)}</h4>
        </div>

        <div>
          <h5 onClick={purchaseItem}>Fechar pedido</h5>
        </div>
      </OrderBox>
    </Page>
  );
}

const EmptyMessage = styled.div`
  p {
    font-size: 22px;
    line-height: 28px;
    color: #a6a6a6;
    margin-top: 20px;
    margin-left: 30px;
  }
`;

const OrderBox = styled.div`
  width: 100%;
  background-color: white;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  position: fixed;
  bottom: 63px;
  margin-top: 100px;
  div {
    display: flex;
    align-items: center;
    &:last-child {
      width: 150px;
      height: 30px;
      border-radius: 12px;
      background-color: #15616d;
      justify-content: center;
    }
  }

  h5 {
    color: white;
    font-size: 18px;
    font-weight: 700;
  }
  h4 {
    color: #e8713c;
    font-size: 20px;
    font-weight: 700;
  }

  h6 {
    color: #a6a6a6;
    font-size: 20px;
    font-weight: 700;
  }
`;
