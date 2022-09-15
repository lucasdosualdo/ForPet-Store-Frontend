import Page from '../styles/Page'
import UserContext from "../contexts/UserContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

export default function Home () {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [items, setItems] = useState([]);

    return (
        <Page page='home'></Page>
    )
}
