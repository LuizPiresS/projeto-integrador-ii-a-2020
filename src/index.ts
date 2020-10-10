import App from './server' // Importa a classe App do servidor

// Arrow function para dar o start no servidor node
((): void => {
  try {
    App.server.listen(3003) // Seta a porta do servidor e starta
  } catch (error) {
    console.log(error) // se der qualquer erro no start do servidor imprime o erro no console
  }
})()
