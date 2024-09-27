// Importa React e os hooks useState e useEffect.
import React, { useState, useEffect } from "react"

// Importa os componentes Form e Table de arquivos locais.
import Form from "./Form"
import Table from "./Table"

// Importa o helper httpHelper de um módulo auxiliar.
import { httpHelper } from "../helpers/httpHelper"

// Define o componente funcional CrudUser.
const CrudUser = () => {
  // Declara o estado 'users' inicializado como null.
  const [users, setUsers] = useState(null)

  // Define a URL base para as requisições à API.
  const url = "http://localhost:5000/users"
  // Cria uma instância da API usando o httpHelper.
  const api = httpHelper()

  // useEffect para buscar os usuários ao montar o componente.
  useEffect(() => {
    getUsers()
  }, []) // Array de dependências vazio para executar apenas uma vez.

  // Função para buscar a lista de usuários.
  const getUsers = () => {
    api
      .get(`${url}?_expand=companies`) // Faz uma requisição GET à API.
      .then(res => {
        setUsers(res) // Atualiza o estado 'users' com os dados recebidos.
      })
      .catch(err => console.log(err)) // Trata erros, se ocorrerem.
  }

  // Função para criar um novo usuário.
  const postUser = user => {
    api
      .post(`${url}`, { body: user }) // Faz uma requisição POST com os dados do novo usuário.
      .then(res => getUsers()) // Atualiza a lista de usuários após a criação.
      .catch(err => console.log(err))
  }

  // Função para atualizar um usuário existente.
  const updateUser = (id, user) => {
    api
      .put(`${url}/${id}`, { body: user }) // Faz uma requisição PUT com os dados atualizados.
      .then(res => getUsers()) // Atualiza a lista de usuários após a atualização.
      .catch(err => console.log(err))
  }

  // Função para deletar um usuário.
  const deleteUser = id => {
    api
      .del(`${url}/${id}`, {}) // Faz uma requisição DELETE para remover o usuário.
      .then(res => getUsers()) // Atualiza a lista de usuários após a deleção.
      .catch(err => console.log(err))
  }

  // Se 'users' ainda não foi carregado, retorna null para não renderizar nada.
  if (!users) return null

  // Retorna a interface do componente.
  return (
    <>
      {/* Título para criação de novo usuário */}
      <h3>New user</h3>
      {/* Componente Form para adicionar um novo usuário, passando a função postUser */}
      <Form postUser={postUser} />
      <div className='all-users'>
        {/* Título para a lista de todos os usuários */}
        <h3>All users</h3>
        {/* Componente Table para exibir e gerenciar os usuários */}
        <Table
          users={users}             // Lista de usuários atual
          setUsers={setUsers}       // Função para atualizar o estado 'users'
          postUser={postUser}       // Função para criar usuário
          updateUser={updateUser}   // Função para atualizar usuário
          deleteUser={deleteUser}   // Função para deletar usuário
        />
      </div>
    </>
  )
}

// Exporta o componente CrudUser como padrão.
export default CrudUser
