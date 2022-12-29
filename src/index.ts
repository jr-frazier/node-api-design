import app from "./server";
import * as dotenv from "dotenv";
import config from "./config";
dotenv.config();

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}...`);
});
