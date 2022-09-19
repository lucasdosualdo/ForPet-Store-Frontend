import Page from "../styles/Page";
import { useContext, useEffect, useState } from "react";
import UserContext from "../contexts/UserContext";
import { getCart } from "../services/for-pets";
import { useNavigate } from "react-router-dom";
import CartList from "./CartList";

export default function Cart() {
  //const { itemContext } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [cartItemsArray, setCartItemsArray] = useState([]);
  const navigate = useNavigate();

  function showtCartItems() {
    if (!user.token) {
      alert("Sessão expirada. Faça o login novamente");
      return;
    }
    const promise = getCart(user.token);
    promise.then((answer) => {
      setCartItemsArray(answer.data);
    });
    promise.catch((error) => {
      alert("Algo deu errado.");
      navigate("/home");
    });
  }

  useEffect(() => {
    showtCartItems();
  }, []);

  return (
    // <Page page="cart">
    //   <CartItem>
    //     <img src={itemContext.image} />
    //     <InfoContainer>
    //       <h5>{itemContext.name}</h5>
    //       <PriceBox>
    //         <h4>{`R$ ${itemContext.price.replace(".", ",")}`}</h4>
    //         <QuantItems>
    //           <span>
    //             <h5>-</h5>
    //           </span>
    //           <span>
    //             <h5>2</h5>
    //           </span>
    //           <span>
    //             <h4>+</h4>
    //           </span>
    //         </QuantItems>
    //       </PriceBox>
    //     </InfoContainer>
    //   </CartItem>
    // </Page>

    <Page page="cart">
      {cartItemsArray.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        cartItemsArray.map((item, index) => (
          <CartList item={item} key={index} index={index} />
        ))
      )}
    </Page>
  );
}
