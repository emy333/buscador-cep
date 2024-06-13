import { useState } from 'react';
import './App.css';
import api from './services/api';
import { FiSearch } from 'react-icons/fi'
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');


  async function handleSearch() {
    if (input === '') {
      alert("Digite um CEP...");
      return;
    }

    const response = await api.get(`${input}/json/`)
      .then(response => {
        setResult(response.data)
        setInput('')
      })

      .catch(err => {
        alert('Erro ao buscar o cep.')
        setInput('')
      });

  }
  return (
    <div className="container">
    <h1 className='title'>Buscar CEP</h1>
      <div className='container-input'>
        <input
          id='cep'
          placeholder='Digite o CEP'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={handleSearch}>
          <FiSearch />
        </button>
      </div>

      {Object.keys(result).length > 0 && (
        <main className="result" >
          <h3 className='text-result'>CEP: {result.cep}</h3>
          <span className='text-result text-span'>Logradouro: {result.logradouro}</span>
          <span className='text-result text-span'>Complemento: {result.complemento}</span>
          <span className='text-result text-span'>Bairro: {result.bairro}</span>
          <span className='text-result text-span'>Cidade: {result.localidade}</span>
          <span className='text-result text-span'>Estado: {result.uf}</span>
        </main>
      )}

    </div>
  );
}

export default App;
