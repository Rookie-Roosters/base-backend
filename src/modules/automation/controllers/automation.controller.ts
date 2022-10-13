import { Automation } from '@automation/blocks/automation';
import { AutomationResponseDto } from '@automation/dtos/automation-response.dto';
import { AutomationService } from '@automation/services/automation.service';
import { API_ENDPOINTS, API_VERSIONS, HttpResponse } from '@core/constants';
import { ValidateIdPipe } from '@core/pipes/validate-id.pipe';
import { Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ApiController } from '@shared/decorators';
import { DeleteResult } from 'typeorm';

@ApiController(API_ENDPOINTS.AUTOMATION.BASE_PATH, API_VERSIONS.V1)
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @Post(`${API_ENDPOINTS.AUTOMATION.EXECUTE}`)
  @ApiBody({})
  @ApiCreatedResponse()
  async rawExecute(@Body() automation: Automation): Promise<HttpResponse<any>> {
    return {
      data: await this.automationService.rawExecute(automation),
    };
  }

  @Get(
    `${API_ENDPOINTS.AUTOMATION.EXECUTE}/:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
  )
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number })
  @ApiOkResponse()
  async execute(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
  ): Promise<HttpResponse<any>> {
    return {
      data: await this.automationService.execute(company, id),
    };
  }

  @Post(`:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}`)
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number })
  @ApiBody({})
  @ApiCreatedResponse({ type: AutomationResponseDto })
  async create(
    @Body() automation: Automation,
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
  ): Promise<HttpResponse<AutomationResponseDto>> {
    return {
      data: await this.automationService.create(automation, company),
    };
  }

  @Get(`:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}`)
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number })
  @ApiOkResponse({ type: [AutomationResponseDto] })
  async findAll(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
  ): Promise<HttpResponse<AutomationResponseDto[]>> {
    return {
      data: await this.automationService.findAll(company),
    };
  }

  @Get(`:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`)
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number })
  @ApiOkResponse({ type: AutomationResponseDto })
  async findOne(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
  ): Promise<HttpResponse<AutomationResponseDto>> {
    return {
      data: await this.automationService.findOne(company, id),
    };
  }

  @Patch(`:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`)
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number })
  @ApiBody({})
  @ApiOkResponse({ type: AutomationResponseDto })
  async updateAutomation(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
    @Body() automation: Automation,
  ): Promise<HttpResponse<AutomationResponseDto>> {
    return {
      data: await this.automationService.updateAutomation(company, id, automation),
    };
  }

  @Delete(`:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`)
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number })
  @ApiOkResponse({ type: DeleteResult })
  async delete(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
  ): Promise<HttpResponse<DeleteResult>> {
    return {
      data: await this.automationService.delete(company, id),
    };
  }
}
