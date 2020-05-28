import React from 'react';
import './styles.css'

export default function Menu() {
  return (
    <div>
      <input type="checkbox" id="botao-menu" />
      <label for="botao-menu">&#9776;</label>
      <nav className="menu">
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