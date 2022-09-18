import Page from "../styles/Page";
import ItemsList from "../styles/ItemsList";
import { getFavorites } from "../services/for-pets";
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List } from "./Items";

export default function Favorites() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const { setItemsContext } = useContext(UserContext);

  function loadItems() {
    const promise = getFavorites(user.token, "");

    promise.then((answer) => {
      setItems(answer.data);
      setItemsContext(answer.data);
    });

    promise.catch((answer) => {
      alert(answer.response.data);
      navigate("/");
    });
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <Page page="favorites">
      <ItemsList page="favorites">
        <List items={items} loadItems={loadItems} />
      </ItemsList>
    </Page>
  );
}
