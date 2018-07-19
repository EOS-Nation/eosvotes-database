import dotenv from "dotenv";

dotenv.config();
export const user = process.env.MONGO_INITDB_ROOT_USERNAME;
export const pass = process.env.MONGO_INITDB_ROOT_PASSWORD;
export const dbName = process.env.MONGO_INITDB_DATABASE;

export default {
    db: {
        mongo: {
            uri: `mongodb://localhost:27017`,
            options: {
                dbName,
                pass,
                user,
            },
        },
    },
    env: "development",
};
