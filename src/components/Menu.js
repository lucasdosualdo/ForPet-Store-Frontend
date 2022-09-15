import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import currentPage from '../functions/currentPage';

export default function Menu() {
    const path = useLocation().pathname;
    const navigate = useNavigate();
    let page = currentPage(path);

    if(page === 'ForPets') {
        page = 'Início';
    }

    function goTo(destination) {
        let route;
        if(destination === 'Favoritos') {
            route = '/favorites';
        }
        
        if(destination === 'Histórico') {
            route = '/history';
        }
        
        if(destination === 'Carrinho') {
            route = '/cart';
        } 
        
        if(destination === 'Início') {
            route = '/home';
        }

        if(destination !== page) {
            navigate(route);
        }
    }

    return (
        <MenuBar>
            <Icon name='Início' page={page} onClic={() => goTo('Início')} />
            <Icon name='Favoritos' page={page} onClic={() => goTo('Favoritos')} />
            <Icon name='Histórico' page={page} onClic={() => goTo('Histórico')} />
            <Icon name='Carrinho' page={page} onClic={() => goTo('Carrinho')} />
        </MenuBar>
    );
}

function Icon({ name, page }) {
    let icon;

    if(name === 'Favoritos') {
        icon = 'heart';
    }
    
    if(name === 'Histórico') {
        icon = 'time';
    }
    
    if(name === 'Carrinho') {
        icon = 'cart';
    } 
    
    if(name === 'Início') {
        icon = 'home';
    }
    
    return (
        <IconStyle name={name} page={page}>
            <ion-icon name={icon}></ion-icon>
            <h6>{name}</h6>
        </IconStyle>
    );
}

const MenuBar = styled.div`
    display: flex;
    width: 100%;
    height: 60px;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    border-top: 1px solid #ffeed1;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    padding: 5px 15px;
`;

const IconStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    ion-icon, h6 {
        color: ${props => props.page === props.name ? '#15616D' : '#cacaca'};
        font-size: 32px;
    }

    h6 {
        font-size: 12px;
        font-weight: 700;
    }
`;