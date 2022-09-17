import { useParams } from "react-router-dom";
import Page from "../styles/Page";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import {
  PurchaseBox,
  PriceBox,
  ImageWrap,
  TitleWrap,
  AboutBox,
  SelectedItem,
} from "../styles/ItemPageStyle";

export default function ItemPage() {
  const { items } = useContext(UserContext);
  const [counter, setCounter] = useState(1);
  const { itemId } = useParams();
  const clickedItem = items.find((item) => item._id === itemId);
  console.log(clickedItem);

  function decrementQuantify() {
    if (counter === 1) return;
    setCounter(counter - 1);
  }

  function incrementQuantify() {}

  return (
    <>
      <Page page="items">
        <SelectedItem>
          <TitleWrap>
            <h5>{clickedItem.name}</h5>
            <p>{clickedItem.brand}</p>
          </TitleWrap>
          <ImageWrap>
            <img src={clickedItem.image} />
          </ImageWrap>

          <PriceBox>
            <h4>{`R$ ${clickedItem.price.replace(".", ",")}`}</h4>
            {/* <ion-icon name="heart"></ion-icon> */}
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
            <div>
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
