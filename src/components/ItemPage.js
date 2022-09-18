import { useParams } from "react-router-dom";
import Page from "../styles/Page";
import { useContext, useState } from "react";
import UserContext from "../contexts/UserContext";
import dayjs from "dayjs";
import {
  PurchaseBox,
  PriceBox,
  ImageWrap,
  TitleWrap,
  AboutBox,
  SelectedItem,
} from "../styles/ItemPageStyle";
import { postPurchase } from "../services/for-pets";

export default function ItemPage() {
  const { items } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [counter, setCounter] = useState(1);
  const { itemId } = useParams();
  const clickedItem = items.find((item) => item._id === itemId);

  function decrementQuantify() {
    if (counter === 1) return;
    setCounter(counter - 1);
  }

  function purchaseItem() {
    if (!user.token) {
      alert("Sessão expirada. Faça o login novamente");
      return;
    }
    const multipliedPrice = counter * Number(clickedItem.price);
    const body = {
      userId: user.userId,
      date: dayjs().format("DD/MM/YYYY"),
      items: [
        {
          itemId,
          quantify: counter,
          value: multipliedPrice,
        },
      ],
      totalValue: counter * Number(clickedItem.price),
    };
    const promise = postPurchase(user.token, body);
    promise.then((answer) => {
      const orderId = answer.data;
    });
    promise.catch((answer) => {
      alert(answer.response.data);
    });
  }

  return (
    <>
      <Page page="items">
        <SelectedItem>
          <TitleWrap>
            <h5>{clickedItem.name}</h5>
            <p>{clickedItem.brand}</p>
          </TitleWrap>
          <ImageWrap>
            <ion-icon name="heart"></ion-icon>
            <img src={clickedItem.image} />
          </ImageWrap>
          <PriceBox>
            <h4>{`R$ ${clickedItem.price.replace(".", ",")}`}</h4>
            <div>
              <h6 onClick={decrementQuantify}>-</h6>
              <h6>{counter}</h6>
              <h4 onClick={() => setCounter(counter + 1)}>+</h4>
            </div>
          </PriceBox>
          <PurchaseBox>
            <div>
              <h3>Adicionar ao carrinho</h3>
            </div>
            <div onClick={purchaseItem}>
              <h3>Comprar agora</h3>
            </div>
          </PurchaseBox>
          <AboutBox>
            <h5>Sobre</h5>
            <p>{clickedItem.about}</p>
          </AboutBox>
        </SelectedItem>
      </Page>
    </>
  );
}
