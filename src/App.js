import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect(() =>{
    api.get('repositories').then((response) => {
      setRepository(response.data)
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo repositório ${Date.now()}`,
    })

    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    const filteredRepository = await repository.filter((repositories) => repositories.id !== id);

    setRepository(filteredRepository);
  }

  return (
    <div>

      <ul data-testid="repository-list">
        {repository.map(repositories => (
        <div key={repositories.id}>

          <li>{repositories.title}</li>
          <button className="remove" onClick={() => handleRemoveRepository(repositories.id)}>
            Remover
          </button>

        </div>))}
      </ul>

      <button className="add" onClick={handleAddRepository}>Adicionar</button>

    </div>
  );
}

export default App;
