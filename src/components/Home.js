import Page from '../styles/Page'
import ItemsList from '../styles/ItemsList';
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { List } from './Items';
import { getItems } from '../services/for-pets';
import Cachorros from '../assets/Cachorros.png';
import Gatos from '../assets/Gatos.png';
import Pássaros from '../assets/Pássaros.png';
import Peixes from '../assets/Peixes.png';
import Répteis from '../assets/Répteis.png';
import Roedores from '../assets/Roedores.png';

export default function Home () {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    function loadItems() {
        const promise = getItems(user.token, "");
        promise.then(answer => {
            setItems(answer.data);
        });

        promise.catch(answer => {
            alert(answer.response.data);
            navigate('/');
        });
    }

    useEffect(() => {
        loadItems();
    }, []);

    return (
        <Page page='home'>
            <OptionBar>
                <PetOption pet={{name: 'Cachorros', img: Cachorros}}/>
                <PetOption pet={{name: 'Gatos', img: Gatos}}/>
                <PetOption pet={{name: 'Pássaros', img: Pássaros}}/>
                <PetOption pet={{name: 'Peixes', img: Peixes}}/>
                <PetOption pet={{name: 'Répteis', img: Répteis}}/>
                <PetOption pet={{name: 'Roedores', img: Roedores}}/>
            </OptionBar>

            <ItemsList page='home'>
                <List items={items} loadItems={loadItems} />
            </ItemsList>
        </Page>
    )
}

function PetOption({ pet }) {
    return (
        <div>
            <span><img src={pet.img} alt={pet} /></span>
            <h6>{pet.name}</h6>
        </div>
    );
}

const OptionBar = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px 5px;
    overflow-x: scroll;
    border-color: #ffeed1;
    border-style: solid;
    border-width: 1px 0;
    background-color: white;
    width: inherit;
    position: fixed;
    left: 0;
    top: 80px;
    z-index: 1;

    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        height: 94px;
        width:100px;
        margin: 0 5px;
    }

    img {
        width: 66px;
        height: 66px;
        border-radius: 50%;
    }

    span {
        width: 74px;
        height: 74px;
        border-radius: 50%;
        background-color: white;
        border: 2px solid #15616d;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    h6 {
        color: #15616d;
    }
`;