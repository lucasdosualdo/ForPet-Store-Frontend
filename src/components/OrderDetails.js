import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { getOrder } from "../services/for-pets";
import styled from "styled-components";
import { numberOfItems } from "../functions/globalFunctions";
import Page from "../styles/Page";

export default function OrderDetails() {
  const { orderId } = useParams();
  const checkout = useLocation().search;
  const navigate = useNavigate();
  const [order, setOrder] = useState({ items: [] });
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(orderId);
    const promise = getOrder(user.token, orderId);

    promise.then((answer) => {
      setOrder(answer.data);
    });

    promise.catch((answer) => {
      alert(answer.response.data);
      navigate("/home");
    });
  }, []);
  let numItems;
  if (order.items) {
    numItems = numberOfItems(order.items);
  } else {
    console.log(order);
    alert("Por favor refaça o pedido");
  }

  return (
    <Page page="order">
      <>
        {!checkout && <h2>Pedido realizado com sucesso!</h2>}

        <GeneralInfo>
          <h4>{`Número do Pedido: ${order._id}`}</h4>
          <h3>{`Total de Itens: ${numItems}`}</h3>
          <h3>{`Valor Final: ${order.totalValue}`}</h3>
        </GeneralInfo>

        <Details>
          <h4>Resumo do Pedido:</h4>
          <List items={order.items} />
        </Details>
      </>
    </Page>
  );
}

function List({ items }) {
  return (
    <>
      {items.map((item, index) => (
        <Item
          key={index}
          id={item.itemId}
          quantify={item.quantify}
          value={item.totalValue}
        />
      ))}
    </>
  );
}

function Item({ id, quantify, value }) {
  const [item, setItem] = useState({});
  const { itemsContext } = useContext(UserContext);
  useEffect(() => {
    setItem(itemsContext.find((e) => e._id === id));
  }, []);

  return (
    <div>
      <img src={item.image} alt={item.name} />
      <p>{item.name}</p>
      <span>
        <h6>{`Qtd: ${quantify}`}</h6>
        <h5>{`R$ ${value?.toString().replace(".", ",")}`}</h5>
      </span>
    </div>
  );
}

const GeneralInfo = styled.div`
  width: 100%;
  margin: 10px -15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  line-height: 24px;

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: #e8713c;
    margin-bottom: 10px;
  }

  h3 {
    color: #a6a6a6;
  }
`;

const Details = styled.div`
  width: 100%;
  margin: 2px -15px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin-bottom: 50vh;
  background-color: white;
  padding: 15px;
  line-height: 24px;

  div {
    border-top: 1px solid #cacaca;
    padding: 5px 0;
    margin-top: 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100px;
  }

  img {
    height: 70px;
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: #e8713c;
    margin-bottom: 10px;
  }

  h3 {
    color: #a6a6a6;
  }

  p {
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 12px;
    color: #a6a6a6;
    width: 50%;
    max-height: 80%;
    margin: 0 10px;
  }

  span {
    width: 80px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 80%;
    color: #15616d;
    font-size: 14px;
    font-weight: 700;
  }
`;
