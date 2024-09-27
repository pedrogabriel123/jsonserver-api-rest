// Importa React e os hooks useState e useEffect.
import React, { useState, useEffect } from "react"

// Importa o helper httpHelper de um módulo auxiliar.
import { httpHelper } from "../helpers/httpHelper"

// Define o componente funcional DropCompanies.
// Recebe as props 'companiesId' e 'handleValue'.
const DropCompanies = ({ companiesId, handleValue }) => {
  // Declara o estado 'companies' inicializado como null.
  const [companies, setCompanies] = useState(null)
  // Declara o estado 'company' inicializado com o valor de 'companiesId'.
  const [company, setCompany] = useState(companiesId)

  // Define a URL para fazer a requisição das empresas.
  const url = "http://localhost:5000/companies"
  // Cria uma instância da API usando o httpHelper.
  const api = httpHelper()

  // useEffect para buscar a lista de empresas quando o componente é montado.
  useEffect(() => {
    // Faz uma requisição GET para obter as empresas.
    api
      .get(url)
      .then(res => {
        // Atualiza o estado 'companies' com as empresas recebidas,
        // adicionando um objeto inicial para opção 'Select Company'.
        setCompanies([{ id: 0, name: "Select Company" }, ...res])
      })
      .catch(err => console.log(err)) // Trata erros, se ocorrerem.
  }, []) // Array de dependências vazio para executar apenas na montagem.

  // Se 'companies' ainda não foi carregado, retorna null para não renderizar nada.
  if (!companies) return null

  // Retorna o elemento JSX do componente.
  return (
    // Elemento 'select' para criar um dropdown.
    <select
      name='companiesId'    // Nome do campo para identificação no formulário.
      value={company}       // Valor selecionado, controlado pelo estado 'company'.
      onChange={e => {      // Função para lidar com mudanças na seleção.
        setCompany(e.target.value) // Atualiza o estado 'company' com o valor selecionado.
        handleValue(e)             // Chama a função 'handleValue' passada por prop.
      }}
    >
      {/* Mapeia o array de 'companies' para criar opções no dropdown. */}
      {companies.map(c => (
        // Cada opção do dropdown.
        <option value={c.id} key={c.id}>
          {c.name}  // Exibe o nome da empresa.
        </option>
      ))}
    </select>
  )
}

// Exporta o componente DropCompanies como padrão.
export default DropCompanies
