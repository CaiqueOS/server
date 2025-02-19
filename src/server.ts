import { fastify } from 'fastify'
// import { fastifyCors } from '@fastify/cors'

const app = fastify()

// app.register(fastifyCors, {
//     origin: 'http://localhost:3000'
// })

// Quando acessar a rota /hello, vai mostrar 'Hello World'
app.get('/hello', ()=> {
    console.log('Hello world!')
})

// Quando o servidor estiver rodando, vai dar o log
app.listen({ port: 3333 }).then(()=> {
    console.log('Server running!')
})