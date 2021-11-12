import mongoose from 'mongoose';
import { DatabaseConnection } from '@/shared/infra/database/database-connection';

export class ConnectionAdapter implements DatabaseConnection {
  async connect() {
    console.log(process.env.MONGODB_URL)
    return await mongoose.connect(process.env.MONGODB_URL)
  }
}
