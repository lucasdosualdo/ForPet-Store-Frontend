import styled from "styled-components";

const PurchaseBox = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: white;
  padding: 0 15px 40px 15px;
  margin-bottom: 3px;
  cursor: pointer;
  div {
    border-radius: 20px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 250px;
    background-color: #15616d;
    &:first-child {
      background-color: #e8713c;
      margin-right: 20px;
    }
  }
`;

const PriceBox = styled.span`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 0 40px;
  div {
    border: 2px solid #cacaca;
    width: 120px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 8px;
    padding: 0 5px;
    h6 {
      color: #a6a6a6;
      font-size: 30px;
      font-weight: 700;
      cursor: pointer;
    }
    h4 {
      color: #15616d;
      cursor: pointer;
    }
  }
`;

const ImageWrap = styled.div`
  height: auto;
  width: 100%;
  margin-bottom: 3px;
  padding: 20px 0;
  background-color: white;
  display: flex;
  justify-content: center;
  position: relative;
  ion-icon {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`;

const TitleWrap = styled.div`
  min-height: 180px;
  height: auto;
  width: 100%;
  margin-bottom: 3px;
  background-color: white;
  padding: 10px 20px 2px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AboutBox = styled.div`
  padding: 10px 20px 10px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 100%;
  min-height: 170px;
  height: auto;
  p {
    line-height: 25px !important;
  }
`;

const SelectedItem = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  img {
    width: 50%;
  }
  ion-icon {
    color: #cacaca;
  }
  h5 {
    color: #a6a6a6;
    font-size: 22px;
    line-height: 30px;
    text-align: left;
    width: 100%;
    word-wrap: break-word;
  }
  h4 {
    color: #a6a6a6;
    font-size: 26px;
    font-weight: 700;
  }
  h3 {
    font-size: 18px;
    font-weight: 700;
    color: white;
    font-family: "Ubuntu Mono";
  }
  p {
    color: #a6a6a6;
    font-size: 16px;
    line-height: 30px;
    text-align: left;
    width: 100%;
    word-wrap: break-word;
  }
`;

export { PurchaseBox, PriceBox, ImageWrap, TitleWrap, AboutBox, SelectedItem };
