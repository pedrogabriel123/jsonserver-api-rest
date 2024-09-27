// Importa React e o hook useState.
import React, { useState } from "react"

// Importa o componente DropCompanies de um arquivo local.
import DropCompanies from "./DropCompanies"

// Define o componente funcional Form.
// Recebe as props 'userData', 'postUser' e 'updateUser'.
const Form = ({ userData = {}, postUser, updateUser }) => {
  // Declara o estado 'user' inicializado com os dados do usuário ou valores padrão.
  const [user, setUser] = useState({
    name: userData.name ?? "",                   // Nome do usuário ou string vazia.
    username: userData.username ?? "",           // Nome de usuário ou string vazia.
    email: userData.email ?? "",                 // Email do usuário ou string vazia.
    phone: userData.phone ?? "",                 // Telefone do usuário ou string vazia.
    companiesId: userData.companiesId ?? "0",    // ID da empresa ou "0".
  })

  // Função para lidar com as mudanças nos campos do formulário.
  const handleValue = e => {
    // Atualiza o estado 'user' com o novo valor do campo alterado.
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  // Função para manipular o envio do formulário.
  const submitUser = e => {
    e.preventDefault() // Previne o comportamento padrão do formulário.

    // Se nenhuma empresa foi selecionada, interrompe a execução.
    if (user.companiesId === "0") return

    // Se 'userData.id' existe, atualiza o usuário existente.
    if (userData.id) {
      updateUser(userData.id, user)
    } else {
      // Caso contrário, cria um novo usuário.
      postUser(user)
    }
  }

  // Retorna o formulário JSX.
  return (
    <form onSubmit={submitUser} className='row'>
      {/* Campo de entrada para o nome do usuário */}
      <input
        type='text'
        name='name'
        value={user.name}
        placeholder='Name'
        onChange={e => handleValue(e)}
      />
      {/* Campo de entrada para o email do usuário */}
      <input
        type='email'
        name='email'
        value={user.email}
        placeholder='Email'
        onChange={e => handleValue(e)}
      />
      {/* Campo de entrada para o telefone do usuário */}
      <input
        type='tel'
        name='phone'
        value={user.phone}
        placeholder='Phone (10)'
        pattern='[0-9]{10}' // Padrão de validação para 10 dígitos numéricos.
        onChange={e => handleValue(e)}
      />
      {/* Componente DropCompanies para seleção da empresa */}
      <DropCompanies companiesId={user.companiesId} handleValue={handleValue} />
      {/* Botão de submissão do formulário */}
      <input
        className='btn-submit'
        type='submit'
        value={`${!userData.id ? "Add new user" : "Save user"}`}
      />
    </form>
  )
}

// Exporta o componente Form como padrão.
export default Form
