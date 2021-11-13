import { DatabaseConnection } from './database-connection';
import mongoose from 'mongoose';

export class ConnectionAdapter implements DatabaseConnection {
  async connect() {
    return await mongoose.connect(process.env.MONGODB_URL)
  }
}
