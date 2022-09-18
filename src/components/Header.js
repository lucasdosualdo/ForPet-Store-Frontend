import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import { useContext } from 'react';
import { deleteLogout } from '../services/for-pets';
import { currentPage } from '../functions/globalFunctions';

export default function Header() {
    const path = useLocation().pathname;
    const search = useLocation().search;
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const title = currentPage(path);

    function logout() {
        /* if(window.confirm('Tem certeza que deseja sair?')) {
            deleteLogout(user.token).then(() => navigate('/'));
            localStorage.clear();
        } else return; */
        navigate('/order/243io?from=history');
    }

    function goBack() {
        if(path === '/home' && search === '') {
            return;
        }

        navigate(-1);
    }

    return (
        <>
            {(path !== '/' && path !== '/sign-up') && (
                <HeaderBar page={`${path}${search}`}>
                    <ion-icon name="chevron-back-outline" onClick={goBack}></ion-icon>
                    <h1>{title}</h1>
                    <ion-icon name="log-out-outline" onClick={logout}></ion-icon>
                </HeaderBar>
            )}
        </>
    );
}


const HeaderBar = styled.div`
    width: 100%;
    max-width: 800px;
    min-width: 300px;
    height: 80px;
    background-color: #15616D;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: fixed;
    left: 0;
    top: 0;
    padding: 0 15px;
    z-index: 2;
    
    h1 {
    font-size: 32px;
    font-weight: 700;
    color: white;
    text-align: left;
    font-family: 'Ubuntu Mono', monospace !important;
    }

    ion-icon[name='chevron-back-outline'] {
        opacity: ${props => props.page === '/home' ? '10%' : '100%'};
    }
`;