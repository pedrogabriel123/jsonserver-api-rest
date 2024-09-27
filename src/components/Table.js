// Importa o React para criar componentes.
import React from "react"

// Importa o componente Form de um arquivo local para reutilização.
import Form from "./Form"

// Define o componente funcional Table.
// Recebe as props 'users', 'postUser', 'updateUser' e 'deleteUser'.
const Table = ({ users, postUser, updateUser, deleteUser }) => {
  // Função para mostrar ou esconder o formulário de atualização de um usuário específico.
  const showUpdateUser = id => {
    // Seleciona os elementos do DOM com a classe específica do usuário.
    const form = document.getElementsByClassName(`show-form-${id}`)
    // Alterna a classe 'hide-form' para mostrar ou esconder o formulário.
    form[0].classList.toggle("hide-form")
  }

  // Componente interno Row que representa uma linha da tabela para um usuário.
  const Row = ({ user }) => {
    return (
      <>
        {/* Linha contendo os dados do usuário */}
        <div className='row'>
          {/* Exibe o nome do usuário */}
          <div>{user.name}</div>
          {/* Exibe o email do usuário */}
          <div>{user.email}</div>
          {/* Exibe o telefone do usuário */}
          <div>{user.phone}</div>
          {/* Exibe o nome da empresa associada ao usuário */}
          <div>{user.companies.name}</div>
          {/* Botões de ação para atualizar ou deletar o usuário */}
          <div className='buttons'>
            {/* Botão para exibir o formulário de atualização */}
            <button onClick={() => showUpdateUser(user.id)}>Update</button>
            {/* Botão para deletar o usuário */}
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        </div>
        {/* Formulário de atualização do usuário, inicialmente oculto */}
        <div className={`hide-form show-form-${user.id}`}>
          {/* Componente Form para editar os dados do usuário */}
          <Form userData={user} postUser={postUser} updateUser={updateUser} />
        </div>
      </>
    )
  }

  // Retorna a estrutura da tabela completa.
  return (
    <div className='table'>
      {/* Cabeçalho da tabela com os títulos das colunas */}
      <div className='titles'>
        <div>Name</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Company</div>
        <div>Actions</div>
      </div>
      {/* Corpo da tabela contendo as linhas de usuários */}
      <div className='rows'>
        {/* Se 'users' existe, mapeia cada usuário para um componente Row */}
        {users && users.map(u => <Row user={u} key={u.id} />)}
      </div>
    </div>
  )
}

// Exporta o componente Table como exportação padrão.
export default Table
