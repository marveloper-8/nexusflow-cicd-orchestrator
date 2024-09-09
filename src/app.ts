import express from 'express';
import helmet from 'helmet';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import config from './config/config';
import logger from './utils/logger';


const app = express();

app.use(helmet());
app.use(express.json());

app.use('/api',routes);

app.use(errorHandler);

const PORT = config.port || 3000;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

export default app;