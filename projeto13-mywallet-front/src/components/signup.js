import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React from 'react';

export default function SignUp() {
  const navigate = useNavigate();

  async function enviarFormulario(e) {
    e.preventDefault();

    /*eslint-disable */
    if (e.target.password.value !== e.target.passwordVerification.value) {
      alert(
        'A senha digitada e a confirmação são diferentes. Tente novamente!'
      );
      return;
    }
    /* eslint-enable */

    const inputUser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    };

    try {
      await axios.post('http://localhost:5000/signUp', inputUser);

      navigate('/');
    } catch (err) {
      /* eslint-disable */
      if (err.response.status === 409) {
        alert(
          'O usuário que você está tentando criar já existe. Por favor, crie um novo usuário ou utilize esse mesmo e-mail para fazer login.'
        );
        return;
      }
      /* eslint-enable */

      console.error(err); // eslint-disable-line no-console
      alert('Erro ao fazer login! Consulte os logs.'); // eslint-disable-line no-alert
    }
  }

  return (
    <Centralize>
      <Title>MyWallet</Title>
      <Formulario onSubmit={enviarFormulario}>
        <input placeholder="Nome" type="text" name="name" required />
        <input placeholder="E-mail" type="email" name="email" required />
        <input placeholder="Senha" type="password" name="password" required />
        <input
          placeholder="Confirme a senha"
          type="password"
          name="passwordVerification"
          required
        />
        <Botao>Entrar</Botao>
      </Formulario>
      <Link to="/">
        <p>Já tem uma conta? Entre agora!</p>
      </Link>
    </Centralize>
  );
}

const Title = styled.div`
  font-family: 'Saira Stencil One', cursive;
  font-size: 32px;
  font-weight: 400;
  color: #ffffff;
  margin-bottom: 30px;
  cursor: default;
`;

const Centralize = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;

  a:-webkit-any-link {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
`;

const Formulario = styled.form`
  input {
    width: 326px;
    height: 60px;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 13px;
    color: #000000;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    box-sizing: border-box;
    padding: 15px;
    justify-content: flex-start;
    align-items: center;
    border: 0px;
  }

  input::placeholder {
    color: #000000;
  }
`;

const Botao = styled.button`
  width: 326px;
  height: 46px;
  background-color: #a328d6;
  border-radius: 5px;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
  border: 0px;
  cursor: pointer;
`;
