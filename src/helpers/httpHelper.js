// Exporta uma função chamada 'httpHelper'.
export const httpHelper = () => {
  // Função assíncrona 'customFetch' para realizar requisições HTTP personalizadas.
  const customFetch = async (url, options = {}) => {
    // Define o método padrão como 'GET'.
    const defaultMethod = "GET"
    // Define os cabeçalhos padrão para as requisições.
    const defaultHeaders = {
      "Content-Type": "application/json", // Indica que o conteúdo é JSON.
      Accept: "application/json",         // Espera receber JSON como resposta.
    }
    // Cria um controlador para permitir o cancelamento da requisição.
    const controller = new AbortController()
    // Adiciona o sinal do controlador às opções da requisição.
    options.signal = controller.signal

    // Define o método da requisição, usando o método fornecido ou o padrão.
    options.method = options.method || defaultMethod
    // Configura os cabeçalhos da requisição, combinando os padrão e os fornecidos.
    options.headers = options.headers
      ? { ...defaultHeaders, ...options.headers }
      : defaultHeaders

    // Converte o corpo da requisição em JSON, se existir.
    options.body = JSON.stringify(options.body) || false
    // Remove o corpo da requisição se não houver conteúdo.
    if (!options.body) delete options.body

    // Configura um temporizador para abortar a requisição após 3 segundos.
    setTimeout(() => {
      controller.abort()
    }, 3000)

    try {
      // Realiza a requisição usando fetch com a URL e opções fornecidas.
      const response = await fetch(url, options)
      // Retorna a resposta convertida em JSON.
      return await response.json()
    } catch (err) {
      // Retorna o erro caso a requisição falhe.
      return err
    }
  }

  // Função para realizar requisições GET.
  const get = (url, options = {}) => customFetch(url, options)

  // Função para realizar requisições POST.
  const post = (url, options) => {
    options.method = "POST"         // Define o método como 'POST'.
    return customFetch(url, options) // Chama 'customFetch' com as opções atualizadas.
  }

  // Função para realizar requisições PUT.
  const put = (url, options) => {
    options.method = "PUT"          // Define o método como 'PUT'.
    return customFetch(url, options) // Chama 'customFetch' com as opções atualizadas.
  }

  // Função para realizar requisições DELETE.
  const del = (url, options) => {
    options.method = "DELETE"       // Define o método como 'DELETE'.
    return customFetch(url, options) // Chama 'customFetch' com as opções atualizadas.
  }

  // Retorna um objeto com as funções de requisição HTTP.
  return {
    get,
    post,
    put,
    del,
  }
}
