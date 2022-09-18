import Page from "../styles/Page";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { getHistory } from "../services/for-pets";

export default function History() {
    const [history, setHistory] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const promise = getHistory(user.token);

        promise.then(answer => {
            setHistory(answer.data);
        });

        promise.catch(answer => {
            alert(answer.response.data);
        });
    }, []);

    return (
        <Page>
            <HistoryList>
                {history.length === 0 ? (
                    <p>Você ainda não fez nenhum pedido.</p>
                ) : (
                    
                    <PastOrders history={history} />   
                )}
            </HistoryList>
        </Page>
    );
}

function PastOrders({ history }) {
    return (
        <>
            {history.map((order, index) => (
                <PastOrder 
                    key={index}
                    date={order.date}
                    price={order.price}
                    id={order.id}
                />
            ))}
        </>
    );
}

function PastOrder({ date, price, id }) {
    return (
        <Link to={`/order/${id}?from=history`}>
            <div>
                <h4>{date}</h4>
                <h5>{`R$ ${price.toString().replace('.', ',')}`}</h5>
            </div>
        </Link>
    );
}

const HistoryList = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-direction: column;
justify-content: start;

div {
    width: 100wh;
    height: 50px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ffeed1;
    background-color: white;
    margin: 2px -15px;
}

h4 {
    color: #A6A6A6;
    font-size: 20px;
}

h5 {
    color: #E8713C;
    font-size: 20px;
    font-weight: 700;
}

a {
    text-decoration: none;
}

p {
        font-size: 20px;
        line-height: 28px;
        color: #A6A6A6;
        margin-top: 20px;
}
`;