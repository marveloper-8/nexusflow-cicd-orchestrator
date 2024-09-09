import { Request, Response } from 'express';
import { getHealthStatus } from '../services/healthService';

export const healthCheck = (req: Request, res: Response) => {
  const healthStatus = getHealthStatus();
  res.send('OK');
};