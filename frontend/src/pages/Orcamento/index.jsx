import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './styles.css'

export default function Orcamento() {

  const [] = useState('');
  const history = useHistory();

  async function handleOrcamento() {

    history.push('/orcamentos')

  }

  return (
    <div className="orc-container">
      <h1>Orçamentos</h1>
      <fieldset>Orc</fieldset>
    </div>
  );
}