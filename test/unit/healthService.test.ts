import { getHealthStatus } from '../../src/services/healthService';

describe('Health Service', () => {
  it('should return health status', () => {
    const healthStatus = getHealthStatus();
    
    expect(healthStatus).toHaveProperty('status', 'OK');
    expect(healthStatus).toHaveProperty('timestamp');
    expect(new Date(healthStatus.timestamp).getTime()).toBeLessThanOrEqual(new Date().getTime());
  });
});