import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
    })

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const filteredRepository = await repositories.filter((repository) => repository.id !== id);

    setRepositories(filteredRepository);
  }

  return (
    <div>

      <ul data-testid="repository-list">
        {repositories.map(repository => (
        <div key={repository.id}>

          <li>{repository.title}</li>
          <button className="remove" onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>

        </div>))}
      </ul>

      <button className="add" onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
