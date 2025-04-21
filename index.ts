import express, { Application, Request, Response } from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cors from 'cors'
import compression from 'compression'
import dotenv from 'dotenv'
import { PORT } from './src/config'
import { sequelize } from './src/database/models/index';
import swaggerUi from 'swagger-ui-express';
import 'express-async-errors';
import specs from './src/utils/swagger';
import { ErrorHandler } from './src/utils/errorHandler'



dotenv.config()

const app: Application = express()

app.use(cors({ credentials: true }))
app.use(compression())
app.use(bodyParser.json())
app.use(express.static('public'))
// app.use(notFoundHandler)
 app.use(ErrorHandler)

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
// Routes
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to Quora-bn' })
})



const server = http.createServer(app)


server.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('server started');
    console.log(`Database Connection status: Success\nRunning Port: ${PORT}`);
  } catch (e) {
    console.log(e);
  }
});

export { app, server }
