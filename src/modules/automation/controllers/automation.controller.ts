import { Automation } from '@automation/classes/automation';
import { AutomationService } from '@automation/services/automation.service';
import { API_ENDPOINTS, API_VERSIONS } from '@core/constants';
import { Get, Post, Body } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { ApiController } from '@shared/decorators';

@ApiController(API_ENDPOINTS.AUTOMATION.BASE_PATH, API_VERSIONS.V1)
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post()
  @ApiBody({})
  async create(@Body() automation: Automation) {
    return await this.automationService.create(automation);
  }
}
