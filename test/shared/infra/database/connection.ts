import mongoose from 'mongoose'

export const makeTestDb = async (): Promise<any> => {
  // @ts-expect-error
  await mongoose.connect(process?.env?.MONGO_URL)
}
