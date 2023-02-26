import styled from 'styled-components';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function AddTransaction({ transactionType }) {
  const type = transactionType;

  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };

  const navigate = useNavigate();

  function handleValueChanges(e) {
    let { value } = e.target;
    const { key } = e;

    if (Number.isNaN(key) && key !== 'Backspace') {
      e.target.value = `${value.substring(0, value.length - 1)}`;
    } else if (value.length > 0) {
      value = value.replace(',', '');
      value = value.replace('.', '');
      value = Number(value);
      value /= 100;
      value = value.toFixed(2);
      value = value.toString();
      value = value.replace('.', ',');
      if (value.length > 6) {
        value = `${value.slice(0, value.length - 6)}.${value.slice(
          value.length - 6
        )}`;
      }
      if (value.length > 10) {
        value = `${value.slice(0, value.length - 10)}.${value.slice(
          value.length - 10
        )}`;
      }
      e.target.value = value;
    }
  }

  async function enviarFormulario(e) {
    e.preventDefault();

    let priceValue = e.target.value.value;
    priceValue = priceValue.replace(',', '');
    priceValue = priceValue.replace('.', '');
    priceValue = Number(priceValue);

    const newTransaction = {
      description: e.target.description.value,
      value: priceValue,
      type
    };

    try {
      await axios.post('http://localhost:5000/transaction', newTransaction, {
        headers
      });
      navigate('/main');
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      alert('Erro ao adicionar a transação! Consulte os logs.'); // eslint-disable-line no-alert
    }
  }

  return (
    <Centralize>
      <Title>
        {type === '+' ? 'Nova Entrada' : 'Nova Saída'}
        <Link to="/main">
          <ion-icon name="arrow-back-outline" />
        </Link>
      </Title>
      <Formulario onSubmit={enviarFormulario}>
        <input
          placeholder="Valor"
          name="value"
          maxLength="10"
          required
          onKeyUp={handleValueChanges}
        />
        <input
          placeholder="Descrição"
          type="text"
          name="description"
          maxLength="30"
          required
        />
        <Botao>{type === '+' ? 'Salvar entrada' : 'Salvar saída'}</Botao>
      </Formulario>
    </Centralize>
  );
}

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  width: 326px;
  cursor: default;

  ion-icon {
    width: 30px;
    height: 30px;
    cursor: pointer;
    margin-bottom: 20px;
    color: #ffffff;
  }
`;

const Centralize = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  box-sizing: border-box;
  padding: 25px;
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
