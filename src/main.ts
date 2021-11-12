import { ConnectionAdapter } from '@/shared/infra/database/connection-adapter';
import * as dotenv from 'dotenv'

dotenv.config()


const chooseFramework = () => {
  return import('@/shared/infra/http/nestjs/index').then((framework) => framework.nestApp())
}

const chooseDatabase = () => {
  return new ConnectionAdapter();
}

const startServer = async () => {
  const database = chooseDatabase()
  const app = await chooseFramework()
  const port = process.env.PORT
  database
    .connect()
    .then(async () => {
      await app.listen(port, () => console.log(`server running at: http://localhost:${port}/api`))
    })
    .catch((error) => {
      console.log(`database connection problem: ${error}`)
    })
}

startServer()
