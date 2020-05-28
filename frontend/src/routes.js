import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon'
import Clientes from './pages/Clientes'
import Compras from './pages/Compras'
import ComprasItens from './pages/ComprasItens'
import EstoqueItens from './pages/EstoqueItens'
import Estoques from './pages/Estoques'
import EstoqueMovimentacoes from './pages/EstoqueMovimentacoes'
import Faturamento from './pages/Faturamento'
import Financeiro from './pages/Financeiro'
import Fornecedores from './pages/Fornecedores'
import Orcamento from './pages/Orcamento'
import OrcamentoItens from './pages/OrcamentoItens'
import Produtos from './pages/Produtos'
import Users from './pages/Users'
import Menu from './pages/Menu'

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon}/>
        <Route path="/menu" component={Menu}/>
        {/* <Route path="/" component={}/>-
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/>
        <Route path="/" component={}/> */}
      </Switch>
    </BrowserRouter>
  )
}