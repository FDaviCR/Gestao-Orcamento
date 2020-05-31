import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import LogoUser from '../../assets/user.png'

import api from '../../services/api'
import './styles.css'

export default function Logon() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('')
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    // try {
    //   const response = await api.post('authenticate', { login })
    //   localStorage.setItem('loginId', login);
    //   localStorage.setItem('loginName', response.data.login)
      history.push('/menu')
    // } catch (err) {
    //   alert('Falha no login.');
    // }
  }

  return (
    <div className="logon-container">
      <section>
        <img src={LogoUser} className="logon-img" width="100" height="100" alt="User" />

        <h1>IMPRESSO.COM</h1>
        <form className="form-logon" onSubmit={handleLogin}>

          <div className="dados-logon">
            <input
              type="text" required
              value={login}
              onChange={e => setLogin(e.target.value)}
            />
            <label>E-mail</label>
          </div>

          <div className="dados-logon">
            <input
              type="password" required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <label>Senha</label>
          </div>

          <button className="btn-login" type="submit">Login</button>
          {/* <footer className="empresa">Vestra Tecnologia</footer> */}
        </form>
      </section>
    </div>
  );
}