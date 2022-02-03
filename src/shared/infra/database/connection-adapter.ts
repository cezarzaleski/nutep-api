import { DatabaseConnection } from './database-connection'
import mongoose from 'mongoose'

export class ConnectionAdapter implements DatabaseConnection {
  async connect (): Promise<any> {
    // @ts-expect-error
    return mongoose.connect(process.env.MONGODB_URL)
  }
}
