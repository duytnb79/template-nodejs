import app from './app';
import { ENV } from './config/env';
import { Logger } from './config/logger';

const startServer = async () => {
  try {
    app.listen(ENV.PORT, () => {
      Logger.info(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    Logger.error(`Error starting server: ${error}`);
  }
};

startServer();
