import * as dotenv from 'dotenv'
import { ConnectionAdapter } from 'src/shared/infra/database/connection-adapter'
dotenv.config()

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const chooseFramework = async () => {
  return import('./shared/infra/http/nestjs/index').then(async (framework) => framework.nestApp())
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const chooseDatabase = () => {
  return new ConnectionAdapter()
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const startServer = async () => {
  const database = chooseDatabase()
  const app = await chooseFramework()
  const port = process.env.PORT
  database
    .connect()
    .then(async () => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      await app.listen(port, () => console.log(`server running at: http://localhost:${port}/api`))
    })
    .catch((error) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.error(`database connection problem: ${error}`)
    })
}

void startServer().then(() => console.info('start'))
