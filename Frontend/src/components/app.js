import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

import SignIn from './signin';
import SignUp from './signup';
import Main from './main';
import AddTransaction from './addTransaction';
import ModifyTransaction from './modifyTransaction';

export default function App() {
  const [user, setUser] = useState({ id: '', name: '', token: '' });
  const [transactions, setTransactions] = useState([]);
  const [token, setToken] = useState();
  const [transactionType, setTransactionType] = useState('+');

  return (
    <Page>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <SignIn user={user} setUser={setUser} setToken={setToken} />
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/main"
            element={
              <Main
                token={token}
                user={user}
                setUser={setUser}
                transactions={transactions}
                setTransactions={setTransactions}
                setTransactionType={setTransactionType}
              />
            }
          />
          <Route
            path="/addTransaction"
            element={<AddTransaction transactionType={transactionType} />}
          />
          <Route
            path="/modifyTransaction"
            element={
              <ModifyTransaction
                transactionType={transactionType}
                setTransactionType={setTransactionType}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Page>
  );
}

const Page = styled.div`
  background-color: #8c11be;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Raleway', sans-serif;
`;
