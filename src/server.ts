import express from 'express' // Importa o express
import { createServer, Server } from 'http' // Importa o módulo http
import SocketIO from 'socket.io'// importa a lib socket.io

class App { // Declaração da classe App
  constructor () { // Construtor da classe
    this.execute() // Quando a classe é instanciada o método construtor da classe irá "chamar" o método execute que irá startar o servidor
  }

  public app!: express.Application // Atributo do tipo express.Application. Com o ponto de interrogação garanto que o atributo não será nullo
  private io!: SocketIO.Server // Atributo do tipo SocketIO.Server Com o ponto de interrogação garanto que o atributo não será nullo
  public server!: Server // Atributo do tipo Server Com o ponto de interrogação garanto que o atributo não será nullo

  public execute (): void { // Método publico que será responsável por chamar todos os métodos privados para que o servidor fique on
    this.routes()
    this.sockets()
    this.chatListen()
  }

  private sockets (): void { // Método privado (só pode ser acessado de dentro da própria classe) que não retorna nada ou tem como retorno o tipo void
    console.log('Inicializando sockets ...')

    this.server = createServer(this.app)
    this.io = SocketIO(this.server)
  }

  private routes () { // Método responsável por configurar as rotas do express neste caso a rota irá apenas servir um arquivo estático
    console.log('Inicializando rotas ...')

    this.app = express()
    this.app.route('/').get((_, res) => {
      res.sendFile(`${__dirname}/index.html`)
    })
  }

  private chatListen (): void {
    console.log('Inicializando chatListen...')

    this.io.on('connection', (socket: any) => {
      console.log('Usuário conectado')

      socket.on('chat message', (m: any) => { // tanto os eventos aqui quanto no index.html devem ter o mesmo nome
        this.io.emit('chat message', m)
      })

      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  }
}
export default new App()
