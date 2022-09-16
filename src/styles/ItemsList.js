import styled from "styled-components";

const ItemsList = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: ${props => props.page === 'home' ? '140px 0 80px 0' : '30px 0 80px 0'};
    
    div {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 15px;
        margin: 10px 0;
        background-color: white;
        border-radius: 10px;
        border: 1px solid #ffeed1;
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.15);
    }

    span {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-top: 20px;
    }

    img {
        width: inherit;
        margin-bottom: 15px;
    }

    h5 {
        color: #A6A6A6;
        font-size: 14px;
        line-height: 18px;
        text-align: left;
        width: 100%;
        word-wrap: break-word
    }

    h4 {
        color: #A6A6A6;
        font-size: 18px;
        font-weight: 700;
    }
`;

export default ItemsList;