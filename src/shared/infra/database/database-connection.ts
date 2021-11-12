export interface DatabaseConnection<T = any> {
  connect: () => Promise<T>
}
