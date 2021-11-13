/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const fs = require('fs')
const { MongoMemoryServer } = require('mongodb-memory-server')
const globalConfigPath = path.join(__dirname, 'globalConfig.json')

const mongod = new MongoMemoryServer({ binary: { version: '4.2.6' } })

module.exports = async () => {
  const mongoConfig = {
    mongoDBName: 'test',
    mongoUri: await mongod.getConnectionString(),
  }

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig))
  console.log('Config is written')

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod
  process.env.MONGO_URL = mongoConfig.mongoUri
}
