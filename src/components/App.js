import GlobalStyle from "../styles/GlobalStyle";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import { useState, useEffect } from "react";
import { getSession } from "../services/for-pets";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Home from "./Home";
import Header from "./Header";
import Menu from "./Menu";
import Favorites from "./Favorites";
import ItemPage from "./ItemPage";
import Cathegories from "./Cathegories";
import History from "./History";
import OrderDetails from "./OrderDetails";
import Cart from "./Cart";

export default function App() {
  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
}

function Root() {
  const [user, setUser] = useState({});
  const [itemsContext, setItemsContext] = useState([]);
  const [itemContext, setItemContext] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("for-pets"));
    console.log(local, "localStorage");

    if (local) {
      const promise = getSession(local.token);

      promise.then((answer) => {
        setUser(local);
        navigate("/home");
      });

      promise.catch((err) => {
        console.log(err);
        alert(err);
        navigate("/");
      });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        itemsContext,
        setItemsContext,
        itemContext,
        setItemContext,
      }}
    >
      <>
        <GlobalStyle />
        <Header />
        <Menu />
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home/" element={<Home />} />
          <Route path="/home/items/:itemId" element={<ItemPage />} />
          <Route path="/home/:for" element={<Home />} />
          <Route path="/cathegories/:for" element={<Cathegories />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </>
    </UserContext.Provider>
  );
}
