import { Automation } from '@automation/blocks/automation';
import { AutomationResponseDto } from '@automation/dtos/automation-response.dto';
import { AutomationService } from '@automation/services/automation.service';
import { API_ENDPOINTS, API_VERSIONS, HttpResponse } from '@core/constants';
import { ValidateIdPipe } from '@core/pipes/validate-id.pipe';
import { Delete, Body, Param } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ApiController, ApiDelete, ApiGet, ApiPatch, ApiPost } from '@shared/decorators';
import { DeleteResult } from 'typeorm';
import { Type } from '@nestjs/common';

@ApiController(API_ENDPOINTS.AUTOMATION.BASE_PATH, API_VERSIONS.V1)
export class AutomationController {
  constructor(private readonly automationService: AutomationService) {}

  @ApiPost({
    path: `${API_ENDPOINTS.AUTOMATION.EXECUTE}`,
    summary: 'Execute an `Automation`',
    description: 'Executes an `Automation` and returns the result',
    responseDescription: 'The result of the executed `Automation`',
  })
  @ApiBody({ type: Object })
  async rawExecute(@Body() automation: Automation): Promise<HttpResponse<any>> {
    return {
      data: await this.automationService.rawExecute(automation),
    };
  }

  @ApiGet({
    path: `${API_ENDPOINTS.AUTOMATION.EXECUTE}/:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Execute an `Automation` by Id',
    description: 'Executes an `Automation` by Id and returns the result',
    responseDescription: 'The result of the executed `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  async execute(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
  ): Promise<HttpResponse<any>> {
    return {
      data: await this.automationService.execute(company, id),
    };
  }

  @ApiPost({
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}`,
    summary: 'Add a new `Automation` to a Company',
    description: 'Creates a new `Automation`, adds it to a company and returns the `Automation`',
    responseType: AutomationResponseDto,
    responseDescription: 'The created `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiBody({ type: Object })
  async create(
    @Body() automation: Automation,
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
  ): Promise<HttpResponse<AutomationResponseDto>> {
    return {
      data: await this.automationService.create(automation, company),
    };
  }

  @ApiGet({
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}`,
    summary: 'Find all the `Automations of a Company`',
    description: 'Finds all the `Automations` of a Company',
    responseType: [AutomationResponseDto],
    responseDescription: 'The found `Automations`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  async findAll(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
  ): Promise<HttpResponse<AutomationResponseDto[]>> {
    return {
      data: await this.automationService.findAll(company),
    };
  }

  @ApiGet({
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Find an `Automation` by Id',
    description: 'Finds a `Automation` of a Company by Id',
    responseType: AutomationResponseDto,
    responseDescription: 'The found `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  async findOne(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
  ): Promise<HttpResponse<AutomationResponseDto>> {
    return {
      data: await this.automationService.findOne(company, id),
    };
  }

  @ApiPatch({
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Update an `Automation` by Id',
    description: 'Updates an `Automation` and returns the `Automation`',
    responseType: AutomationResponseDto,
    responseDescription: 'The updated `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  @ApiBody({ type: Object })
  async updateAutomation(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
    @Body() automation: Automation,
  ): Promise<HttpResponse<AutomationResponseDto>> {
    return {
      data: await this.automationService.updateAutomation(company, id, automation),
    };
  }

  @ApiDelete({
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Delete an `Automation` by Id',
    description: 'Deletes an `Automation` by Id',
    responseType: DeleteResult,
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  async delete(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
  ): Promise<HttpResponse<DeleteResult>> {
    return {
      data: await this.automationService.delete(company, id),
    };
  }
}
