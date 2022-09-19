import { postFavorite, getFavorites } from "../services/for-pets";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

function Item({ info, loadItems, favorites, loadFavorites }) {
  const { user } = useContext(UserContext);
  let isFavorite = false;
  const path = useLocation().pathname;

  function toggleFavorite() {
    if (path === "/favorites") {
      return;
    }

    const promise = postFavorite(user.token, { id: info._id });

    promise.then((answer) => {
      loadFavorites();
      loadItems();
    });

    promise.catch((answer) => {
      alert(answer.response.data);
    });
  }

  if (
    favorites.filter((favorite) => favorite.itemId === info._id).length > 0 ||
    path === "/favorites"
  ) {
    isFavorite = true;
  }

  return (
    <div>
      <Link to={`/home/items/${info._id}`}>
        <img src={info.image} />
      </Link>
      <h5>{info.name}</h5>
      <span>
        <h4>{`R$ ${info.price.replace(".", ",")}`}</h4>
        <Heart isFavorite={isFavorite} onClick={toggleFavorite}>
          <ion-icon name="heart"></ion-icon>
        </Heart>
      </span>
    </div>
  );
}

function List({ items, loadItems }) {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);

  function loadFavorites() {
    const promise = getFavorites(user.token);

    promise.then((answer) => {
      setFavorites(answer.data);
      console.log(answer.data);
    });

    promise.catch((answer) => {
      alert(answer.response.data);
    });
  }

  useEffect(() => {
    loadFavorites();
  }, []);

  return (
    <>
      {items.length === 0 ? (
        <p>
          Não foi possível encontrar nenhum item disponível para a categoria
          selecionada.
        </p>
      ) : (
        items.map((item, index) => (
          <Item
            key={index}
            info={item}
            loadItems={loadItems}
            favorites={favorites}
            loadFavorites={loadFavorites}
          />
        ))
      )}
    </>
  );
}

const Heart = styled.span`
  width: 28px !important;
  justify-content: right !important;
  margin: 0 !important;

  ion-icon {
    color: ${(props) => (props.isFavorite === true ? "#E8713C" : "#cacaca")};
  }
`;

export { List };
