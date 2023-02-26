import styled from 'styled-components';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

import RenderReportSum from './renderReportSum';

export default function Main({ setTransactionType }) {
  const userName = localStorage.getItem('userName') || 'Fulano';
  const token = localStorage.getItem('token');
  const headers = { Authorization: `Bearer ${token}` };
  const navigate = useNavigate();
  const [report, setReport] = useState([]);

  async function getUserTransactions() {
    try {
      const transactions = await axios.get(
        'http://localhost:5000/transactions',
        { headers }
      );
      setReport([...transactions.data]);
    } catch (err) {
      navigate('/');
    }
  }

  async function getUserInfo() {
    try {
      const userInfo = await axios.get('http://localhost:5000/userInfo', {
        headers
      });
      localStorage.setItem('userName', userInfo.data);
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      alert('Erro ao carregar! Consulte os logs.'); // eslint-disable-line no-alert
      navigate('/');
    }
  }

  async function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    try {
      await axios.delete('http://localhost:5000/session', {
        headers
      });
      navigate('/');
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
      alert('Erro ao encerrar sessão! Consulte os logs.'); // eslint-disable-line no-alert
    }
  }

  function handleClick(transaction) {
    localStorage.setItem('transactionId', transaction._id.toString()); // eslint-disable-line no-underscore-dangle
    localStorage.setItem('transactionDescription', transaction.description);
    localStorage.setItem('transactionValue', transaction.value);
    localStorage.setItem('transactionType', transaction.type);
    navigate('/modifyTransaction');
  }

  useEffect(() => {
    getUserTransactions();
    getUserInfo();
  }, []);

  return (
    <Centralize>
      <Title>
        Olá, {userName}
        <ion-icon name="exit-outline" onClick={logout} />
      </Title>
      <Report>
        <ReportTransactions>
          {report.length === 0 ? (
            <ReportDefault>
              <h6>Não há registros de entrada ou saída</h6>
            </ReportDefault>
          ) : (
            report.map((transaction, index) => (
              <Transaction key={index} onClick={() => handleClick(transaction)}>
                <div className="date">
                  {dayjs(transaction.date).format('DD/MM')}
                </div>
                <div className="description">{transaction.description}</div>
                {transaction.type === '+' ? (
                  <div className="valuePos">
                    {(transaction.value / 100)
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                  </div>
                ) : (
                  <div className="valueNeg">
                    {(transaction.value / 100)
                      .toFixed(2)
                      .toString()
                      .replace('.', ',')}
                  </div>
                )}
              </Transaction>
            ))
          )}
        </ReportTransactions>
        <ReportSum>
          <RenderReportSum report={report} />
        </ReportSum>
      </Report>
      <Botoes>
        <Link to="/addTransaction">
          <Botao onClick={() => setTransactionType('+')}>
            <ion-icon name="add-circle-outline" />
            <h1>Nova entrada</h1>
          </Botao>
        </Link>
        <Link to="/addTransaction">
          <Botao onClick={() => setTransactionType('-')}>
            <ion-icon name="remove-circle-outline" />
            <h1>Nova saida</h1>
          </Botao>
        </Link>
      </Botoes>
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

  a:-webkit-any-link {
    text-decoration: none;
    color: white;
    cursor: pointer;
  }
`;

const Botoes = styled.div`
  width: 326px;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
  font-size: 20px;
  font-weight: 700;
`;

const Botao = styled.div`
  width: 155px;
  height: 114px;
  background-color: #a328d6;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  color: #ffffff;
  font-size: 17px;
  font-weight: 700;
  box-sizing: border-box;
  padding: 10px;

  h1 {
    text-align: left;
    width: 65px;
  }

  ion-icon {
    width: 25px;
    height: 25px;
  }
`;

const Report = styled.div`
  width: 326px;
  height: 446px;
  background-color: #ffffff;
  border-radius: 5px;
  margin-bottom: 13px;
  margin-top: 22px;
  color: #868686;
  display: flex;
  flex-direction: column;
  font-size: 20px;
  font-weight: 400;
  box-sizing: border-box;
  padding: 12px;
  padding-top: 15px;
  cursor: default;
  position: relative;

  h6 {
    text-align: center;
    width: 200px;
  }
`;

const ReportTransactions = styled.div`
  width: 100%;
  height: 90%;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 0;
  overflow: auto;
`;

const ReportSum = styled.div`
  width: 100%;
  height: 10%;
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ReportDefault = styled.div`
  border-radius: 5px;
  margin-bottom: 13px;
  margin-top: 22px;
  color: #868686;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 400;
  text-align: center;
  box-sizing: border-box;
  padding: 12px;
  padding-top: 150px;
  cursor: default;

  h6 {
    text-align: center;
    width: 200px;
  }
`;

const Transaction = styled.div`
  width: 100%;
  display: flex;
  margin-top: 15px;
  cursor: pointer;

  .date {
    text-align: left;
    width: 50px;
    margin-right: 5px;
    font-size: 16px;
    color: #c6c6c6;
  }

  .description {
    text-align: left;
    width: 200px;
    margin-right: 5px;
    font-size: 16px;
    color: #000000;
    display: flex;
    overflow: hidden;
  }

  .valuePos {
    text-align: right;
    width: 70px;
    font-size: 16px;
    color: #03ac00;
  }

  .valueNeg {
    text-align: right;
    width: 70px;
    font-size: 16px;
    color: #c70000;
  }
`;
