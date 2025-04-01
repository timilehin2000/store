import app from "./app";
import { serverEnv } from "./config";
import { connectDb } from "./database";

const startServer = async () => {
    try {
        await connectDb();

        app.listen(serverEnv.PORT, () => {
            console.log("App is listening on port", serverEnv.PORT);
        });
    } catch (error: any) {
        console.error(`An error occurred: ${error.message}`);
        process.exit(1);
    }
};

startServer();
