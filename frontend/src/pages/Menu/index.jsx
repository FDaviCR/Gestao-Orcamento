import React from 'react';
import './styles.css'
import Orcamento from '../Orcamento/index'

export default function Menu() {
  return (
    <div className="menu">
      <input type="checkbox" id="botao-menu" />
      <label for="botao-menu">&#9776;</label>
      <nav>
        <ul>
          <li><a href="/financeiro">Financeiro</a></li>
          <li><a href="/orcamentos">Orçamentos</a></li>
          <li><a href="/clientes">Clientes</a></li>
          <li><a href="/fornecedores">Fornecedores</a></li>
          <li><a href="/produtos">Produtos</a></li>
          <li><a href="/estoque">Estoque</a></li>
          <li><a href="/movimentacoesEstoque">Movimentações</a></li>
          <li><a href="/compras">Compras</a></li>
        </ul>
      </nav>
    </div>
  )
}