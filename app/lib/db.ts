import { MongoClient } from 'mongodb'

// Connection URL
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const dbName = process.env.MONGODB_DB || 'african_ai_research'

let cachedClient: MongoClient | null = null
let cachedDb: any = null

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedDb) {
    return cachedDb
  }

  // If no connection, create a new one
  if (!cachedClient) {
    cachedClient = new MongoClient(url)
    await cachedClient.connect()
  }

  // Get the database
  const db = cachedClient.db(dbName)
  cachedDb = db
  
  return db
}

// Function to close the database connection when needed
export async function closeDatabaseConnection() {
  if (cachedClient) {
    await cachedClient.close()
    cachedClient = null
    cachedDb = null
  }
}