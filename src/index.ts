import { AppDataSource } from "./data-source";
import { port } from "./config";
import app from './app'

AppDataSource.initialize()
  .then(async () => {
    // start express server
    app.listen(port);
  })
  .catch((error) => console.log(error));
