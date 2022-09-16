import styled from "styled-components";

const Page = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  margin: ${(props) =>
    props.page === "SignIn" || props.page === "SignUp" ? "0" : "80px 0 60px 0"};
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: ${(props) =>
    props.page === "SignIn" || props.page === "SignUp" ? "center" : "start"};
  background-color: ${(props) =>
    props.page === "SignIn" || props.page === "SignUp" ? "#15616d" : "#F8F5F0"};
  overflow: scroll;

  a {
    color: white;
    text-align: center;
    font-weight: 700;
    font-size: 15px;
    text-decoration: none;
  }
`;

export default Page;
