import Page from '../styles/Page'
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useLocation, Link } from 'react-router-dom';
import { getCathegories } from '../services/for-pets';
import styled from 'styled-components';

export default function Cathegories() {
    const [list, setList] = useState([]);
    const { user } = useContext(UserContext);
    const path = useLocation().pathname.replace('/cathegories/','');

    useEffect(() => {
        const promise = getCathegories(user.token, path);

        promise.then(answer => {
            setList(answer.data);
        });

        promise.catch(answer => {
            alert(answer.response.data);
        });
    }, []);
    
    return (
        <Page page="cathegories">
            <CathegoriesList>    
                {list.map((cathegory, index) => (
                    <Cathegory 
                        key={index}
                        cathegory={cathegory}
                        pet={path}
                    />
                ))}
            </CathegoriesList>
        </Page>
    );
}

function Cathegory({ cathegory, pet }) {
    return (
        <Link to={`/home?pet=${pet}&type=${cathegory.replaceAll(' ', '-')}`}>  
            <div>
                <h5>{cathegory}</h5>
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
        </Link>  
    );
}

const CathegoriesList = styled.div`
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
        margin: 0 -15px;
    }

    h5 {
        color: #A6A6A6;
    }

    ion-icon {
        color: #E8713C;
        font-size: 20px;
    }
`;