import Page from '../styles/Page'
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
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

    const ITEMS = [
        {
          name: "Sachê Purina One Gatos Adultos e Filhotes Sabor Salmão Atum e Peixe Branco MultiProteínas Nestlé Purina 85g - 15 un",
          type: "Alimentos",
          for: "Gatos",
          about:
            "A Ração Úmida Nestlé Purina One Salmão, Atum e Peixe Branco para Gatos Adultos e Filhotes é um alimento super premium com multi proteínas que garantem nutrição na medida certa para o seu pet.",
          price: "80.29",
          brand: "Purina ONE, Nestlé Purina",
          image:
            "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/545/822/products/2hnawtsd4h5f52wffhbekkmg-7fa0090b833cc38f5f16472647273784-1024-1024.jpg",
        },
        {
          name: "Ração Seca Purina Gatsy Sabor Carne Para Gatos Nestlé Purina - 20kg",
          type: "Alimentos",
          for: "Gatos",
          about:
            "PURINA Gatsy é um alimento completo e balanceado que, além de saboroso, possui ingredientes que seu gato precisa para se manter saudável: carne, vitaminas e minerais.",
          price: "256.48",
          brand: "Gatsy",
          image:
            "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/545/822/products/j3dyhhxwiujvfexbfkwp4rvw-5074369238aef7884616424451668239-1024-1024.jpg",
        }
    ]

    function loadItems() {
        const promise = getItems(user.token);
        promise.then(answer => {
            setItems(answer.data);
        });

        promise.catch(answer => {
            alert(answer.response.data);
            navigate('/');
        });
    }

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

            <ItemsList>
                <List ITEMS={ITEMS} />
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

function Item({ info }) {
    return (
        <div>
            <img src={info.image} />
            <h5>{info.name}</h5>
            <span>
                <h4>{info.price}</h4>
                <ion-icon name='heart'></ion-icon>
            </span>
        </div>
    );
}

function List({ ITEMS }) {
    return (
        <>
            {ITEMS.lenght === 0 ? (
                <p>Não foi possível encontrar nenhum item disponível para a categoria selecionada.</p>
            ) : (
                ITEMS.map((item, index) => (
                    <Item 
                        key={index}
                        info={item} 
                    />
                )))}
        </>
    );
}

const OptionBar = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 5px 5px;
    overflow-x: scroll;
    border-color: #ffeed1;
    border-style: solid;
    border-width: 1px 0;
    background-color: white;
    width: inherit;
    position: fixed;
    left: 0;
    top: 90px;
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

const ItemsList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 140px;
    
    div {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
        margin: 20px 0;
        background-color: white;
    }

    span {
        display: flex;
        width: 100%;
        justify-content: space-between;
    }
`;