import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
    })

  }, [])

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Texto ${Date.now()}`,
      url: 'www.google.com',
      techs: ["node", "react", "react-native"]
    })

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(itemId) {
    setRepositories(repositories.filter(({ id }) => id !== itemId));
    const response = await api.delete(`/repositories/${itemId}`);
    console.log(response);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
