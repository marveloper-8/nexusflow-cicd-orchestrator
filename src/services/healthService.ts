export interface HealthStatus {
  status: string;
  timestamp: string;
}

export const getHealthStatus = (): HealthStatus => {
  return {
    status: 'OK',
    timestamp: new Date().toISOString(),
  };
};