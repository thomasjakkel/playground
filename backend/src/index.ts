import express from 'express'
import { json } from 'body-parser'
import { errorHandler } from './helper/errorHandler'

const app = express()
const port = 3000

// Middlewares
app.use(json())
app.use((req, res, next) => {
  console.log(`Received ${req.method} ${req.url}`)
  next()
})
app.use(errorHandler)

// Routes
app.get('/', (_req, res) => res.status(200).send(htmlContent))

app.get('/subPath', (_req, res) => {
  res.status(200).send('Hello, TypeScript with Express!')
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

// HTML Content for root route
const htmlContent: string = `
    <h1>Server</h1>
    <p>Listens on port ${port}</p>
    <br/>
    <p>Checkout following routes:</p>
    <ul>
        <li><a href="http://localhost:${port}/subPath" target="_blank">/subPath</a></li>
    </ul>
`
