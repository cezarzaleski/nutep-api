import mongoose from "mongoose";


export const makeTestDb = async (): Promise<any> => {
  await mongoose.connect(process.env.MONGO_URL);
}
