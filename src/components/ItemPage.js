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
      <Page page="home"></Page>
    </>
  );
}
