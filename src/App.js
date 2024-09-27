// Importa o componente LogoIcon do arquivo "./assets/icons".
import { LogoIcon } from "./assets/icons"

// Importa o componente CrudUser do caminho "./components/CrudUser".
import CrudUser from "./components/CrudUser"

// Importa o arquivo de estilos CSS principal da aplicação.
import "./styles/App.css"

// Define a função componente App, que é o componente principal da aplicação.
function App() {
  // Retorna o JSX que representa a interface do aplicativo.
  return (
    <>
      {/* Cabeçalho da aplicação */}
      <header>
        <div className='header__content'>
          <div className='logo'>
            {/* Renderiza o ícone do logo */}
            <LogoIcon />
            {/* Exibe o título em negrito */}
            <strong>JSON SERVER API</strong>
          </div>
        </div>
      </header>
      {/* Conteúdo principal da aplicação */}
      <main>
        {/* Renderiza o componente CrudUser, que gerencia as operações de CRUD de usuários */}
        <CrudUser />
      </main>
    </>
  )
}

// Exporta o componente App como a exportação padrão do módulo.
// Isso permite que ele seja importado e utilizado em outros arquivos.
export default App
