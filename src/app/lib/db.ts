import mongoose from "mongoose";

const mongodbUri = process.env.MONGODB_URI

if (!mongodbUri) {
    throw new Error("db error")
}

let cache = global.mongoose

if (!cache) {
    cache = global.mongoose = { conn: null, promise: null }
}

const connectDb = async () => {
    if (cache.conn) {
        return cache.conn
    }
    if (!cache.promise) {
        cache.promise = mongoose
            .connect(mongodbUri)
            .then((conn) => conn.connection)
    }
    try {
        const conn = await cache.promise
        return conn
    } catch (error) {
        cache.promise = null;
        throw error;
    }


}

export default connectDb