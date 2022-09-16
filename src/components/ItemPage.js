import { useParams } from "react-router-dom";
import styled from "styled-components";
import Page from "../styles/Page";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";

export default function ItemPage() {
  const { items } = useContext(UserContext);
  const { itemId } = useParams();
  const clickedItem = items.find((item) => item._id === itemId);
  console.log(clickedItem);

  return (
    <>
      <Page page="items">
        <SelectedItem>
          <div>
            <h5>{clickedItem.name}</h5>
            <img src={clickedItem.image} />

            <span>
              <h4>{`R$ ${clickedItem.price.replace(".", ",")}`}</h4>
              <ion-icon name="heart"></ion-icon>
            </span>
          </div>
        </SelectedItem>
      </Page>
    </>
  );
}

const SelectedItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  div {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border-radius: 10px;
    border: 1px solid #ffeed1;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
  img {
    width: 80%;
  }
  span {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  ion-icon {
    color: #cacaca;
  }

  h5 {
    color: #a6a6a6;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
    width: 100%;
    word-wrap: break-word;
  }

  h4 {
    color: #a6a6a6;
    font-size: 18px;
    font-weight: 700;
  }
`;
