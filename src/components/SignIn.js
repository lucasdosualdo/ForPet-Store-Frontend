import Form from "../styles/Form";
import Page from "../styles/Page";
import logo from "../assets/logo.png";
import Logo from "../styles/Logo";
import UserContext from "../contexts/UserContext";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { postSignIn } from "../services/my-pets";

export default function SignIn() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleForm({ name, value }) {
    setForm({ ...form, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const body = {
      email: form.email,
      password: form.password,
    };

    const promise = postSignIn(body);

    promise.then((answer) => {
      setUser({
        name: answer.data.name,
        token: answer.data.token,
      });

      localStorage.setItem(
        "for-pets",
        JSON.stringify({
          name: answer.data.name,
          token: answer.data.token,
        }));

      navigate("/home");
    });

    promise.catch((answer) => {
      alert(answer.response.data);
    });
  }

  return (
    <Page page="SignIn">
      <Logo src={logo} alt="logo" />

      <Form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          required
          value={form.email}
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Senha"
          name="password"
          required
          value={form.password}
          onChange={(e) =>
            handleForm({
              name: e.target.name,
              value: e.target.value,
            })
          }
        />

        <input type="submit" value="Entrar" />
      </Form>

      <Link to="/sign-up">Primeira vez? Cadastre-se!</Link>
    </Page>
  );
}
