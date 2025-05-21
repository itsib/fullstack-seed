import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { ApiTags } from '@nestjs/swagger';
import { HealthStatusDto } from './dto/health-status.dto';
import { Public } from '@app/common/decorators';

@Public()
@ApiTags('Health Check')
@Controller()
export class HealthController {
  constructor(private readonly health: HealthCheckService) {}

  /**
   * Check server status
   *
   * @remarks Returns the ok status if the server is running and listening on port 3000
   *
   * @throws {503} Server status is unhealthy
   */
  @Get()
  @HealthCheck()
  async check(): Promise<HealthStatusDto> {
    const result = await this.health.check([]);
    if (result.status !== 'ok') {
      throw new HttpException({ status: 'error' }, HttpStatus.SERVICE_UNAVAILABLE);
    }
    return { status: 'ok' };
  }
}
