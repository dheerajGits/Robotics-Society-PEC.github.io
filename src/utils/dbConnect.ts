import mongoose from 'mongoose';

if (!process.env.MONGO_URI) {
    throw new Error('Please define the MONGO_URI environment variable');
}
const MONGO_URI = process.env.MONGO_URI;

let cached_connection: mongoose.Mongoose | undefined = undefined
const getDbConnection = async () => {
    if (!cached_connection)
        cached_connection = await mongoose.connect(MONGO_URI)
    return cached_connection
}
export default getDbConnection