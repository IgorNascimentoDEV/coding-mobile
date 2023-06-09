import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
  receitas: [],
};

const ReceitasContext = createContext({});

const actions = {
  setReceitas(state, action) {
    const receitas = action.payload;
    return {
      ...state,
      receitas,
    };
  },

  createReceita(state, action) {
    const receita = action.payload;
    return {
      ...state,
      receitas: [...state.receitas, receita],
    };
  },

  updateReceita(state, action) {
    const updatedReceita = action.payload;
    const updatedReceitas = state.receitas.map((receita) =>
      receita.id === updatedReceita.id ? updatedReceita : receita
    );
    return {
      ...state,
      receitas: updatedReceitas,
    };
  },

  deleteReceita(state, action) {
    const deletedReceita = action.payload;
    const updatedReceitas = state.receitas.filter(
      (receita) => receita.id !== deletedReceita.id
    );
    return {
      ...state,
      receitas: updatedReceitas,
    };
  },
};

export const ReceitasProvider = (props) => {
  function reducer(state, action) {
    const fn = actions[action.type];
    return fn ? fn(state, action) : state;
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  // Função para carregar as receitas da API
  async function fetchReceitas() {
    try {
      const response = await fetch('http://localhost:3000/receita');
      const receitas = await response.json();
      dispatch({ type: 'setReceitas', payload: receitas });
    } catch (error) {
      console.error('Erro ao carregar as receitas:', error);
    }
  }

  useEffect(() => {
    fetchReceitas();
  }, []);

  // Função para criar uma nova receita
  async function createReceita(receita) {
    try {
      const response = await fetch('http://localhost:3000/receita', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receita),
      });
      const newReceita = await response.json();
      dispatch({ type: 'createReceita', payload: newReceita });
    } catch (error) {
      console.error('Erro ao criar a receita:', error);
    }
  }

  // Função para atualizar uma receita existente
  async function updateReceita(receita) {
    try {
      const response = await fetch(`http://localhost:3000/receita/${receita.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(receita),
      });
      const updatedReceita = await response.json();
      dispatch({ type: 'updateReceita', payload: updatedReceita });
    } catch (error) {
      console.error('Erro ao atualizar a receita:', error);
    }
  }

  // Função para excluir uma receita
  async function deleteReceita(receita) {
    try {
      await fetch(`http://localhost:3000/receita/${receita.id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'deleteReceita', payload: receita });
    } catch (error) {
      console.error('Erro ao excluir a receita:', error);
    }
  }

  return (
    <ReceitasContext.Provider
      value={{
        state,
        createReceita,
        updateReceita,
        deleteReceita,
      }}
    >
      {props.children}
    </ReceitasContext.Provider>
  );
};

export default ReceitasContext;
