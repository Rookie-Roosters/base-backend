import { AuthRole } from '@authentication/constants';
import { CurrentAuth } from '@authentication/decorators';
import { Automation } from '@automation/blocks/automation';
import { AutomationResponseDto } from '@automation/dtos/automation-response.dto';
import { AutomationService } from '@automation/services/automation.service';
import { CompaniesService } from '@companies/services';
import { API_ENDPOINTS, IHttpResponse } from '@core/constants';
import { ValidateIdPipe } from '@core/pipes/validate-id.pipe';
import { Body, Param } from '@nestjs/common';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { ApiController, ApiDelete, ApiGet, ApiPatch, ApiPost } from '@shared/decorators';
import { UseSessionGuard } from '@users/decorators';
import { User } from '@users/entities';
import { DeleteResult } from 'typeorm';

@ApiController(API_ENDPOINTS.AUTOMATION.BASE_PATH)
export class AutomationController {
  constructor(
    private readonly automationService: AutomationService,
    private readonly companiesService: CompaniesService,
  ) {}

  @ApiPost({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `${API_ENDPOINTS.AUTOMATION.EXECUTE}`,
    summary: 'Execute an `Automation`',
    description: 'Executes an `Automation` and returns the result',
    responseDescription: 'The result of the executed `Automation`',
  })
  @UseSessionGuard()
  async rawExecute(@Body() automation: Automation, @CurrentAuth() user: User): Promise<IHttpResponse<any>> {
    return {
      data: await this.automationService.rawExecute(automation),
    };
  }

  @ApiGet({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `${API_ENDPOINTS.AUTOMATION.EXECUTE}/:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Execute an `Automation` by Id',
    description: 'Executes an `Automation` by Id and returns the result',
    responseDescription: 'The result of the executed `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  @UseSessionGuard()
  async execute(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
    @CurrentAuth() user: User,
  ): Promise<IHttpResponse<any>> {
    await this.companiesService.validateOwnerAndManager(user, company);
    return {
      data: await this.automationService.execute(company, id),
    };
  }

  @ApiPost({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `${API_ENDPOINTS.AUTOMATION.DRAFT}/:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}`,
    summary: 'Save a `Automation` draft',
    description: 'Saves a new `Automation` draft and returns the `Automation`',
    responseType: AutomationResponseDto,
    responseDescription: 'The `Automation` draft',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiBody({ type: Object })
  @UseSessionGuard()
  async saveDraft(
    @Body() automation: Automation,
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @CurrentAuth() user: User,
  ): Promise<IHttpResponse<AutomationResponseDto>> {
    await this.companiesService.validateOwnerAndManager(user, company);
    return {
      data: await this.automationService.saveDraft(automation, company),
    };
  }

  @ApiPost({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}`,
    summary: 'Add a new `Automation` to a Company',
    description: 'Creates a new `Automation`, adds it to a company and returns the `Automation`',
    responseType: AutomationResponseDto,
    responseDescription: 'The created `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiBody({ type: Object })
  @UseSessionGuard()
  async create(
    @Body() automation: Automation,
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @CurrentAuth() user: User,
  ): Promise<IHttpResponse<AutomationResponseDto>> {
    await this.companiesService.validateOwnerAndManager(user, company);
    return {
      data: await this.automationService.create(automation, company),
    };
  }

  @ApiGet({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}`,
    summary: 'Find all the `Automations of a Company`',
    description: 'Finds all the `Automations` of a Company',
    responseType: [AutomationResponseDto],
    responseDescription: 'The found `Automations`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @UseSessionGuard()
  async findAll(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @CurrentAuth() user: User,
  ): Promise<IHttpResponse<AutomationResponseDto[]>> {
    await this.companiesService.validateOwnerAndManager(user, company);
    return {
      data: await this.automationService.findAll(company),
    };
  }

  @ApiGet({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Find an `Automation` by Id',
    description: 'Finds a `Automation` of a Company by Id',
    responseType: AutomationResponseDto,
    responseDescription: 'The found `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  @UseSessionGuard()
  async findOne(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
    @CurrentAuth() user: User,
  ): Promise<IHttpResponse<AutomationResponseDto>> {
    await this.companiesService.validateOwnerAndManager(user, company);
    return {
      data: await this.automationService.findOne(company, id),
    };
  }

  @ApiPatch({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Update an `Automation` by Id',
    description: 'Updates an `Automation` and returns the `Automation`',
    responseType: AutomationResponseDto,
    responseDescription: 'The updated `Automation`',
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  @ApiBody({ type: Object })
  @UseSessionGuard()
  async updateAutomation(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
    @Body() automation: Automation,
    @CurrentAuth() user: User,
  ): Promise<IHttpResponse<AutomationResponseDto>> {
    await this.companiesService.validateOwnerAndManager(user, company);
    return {
      data: await this.automationService.updateAutomation(company, id, automation),
    };
  }

  @ApiDelete({
    roles: [AuthRole.OWNER, AuthRole.MANAGER],
    path: `:${API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID}/:${API_ENDPOINTS.AUTOMATION.BY_ID}`,
    summary: 'Delete an `Automation` by Id',
    description: 'Deletes an `Automation` by Id',
    responseType: DeleteResult,
  })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, type: Number, description: "Company's Id" })
  @ApiParam({ name: API_ENDPOINTS.AUTOMATION.BY_ID, type: Number, description: "`Automation's` Id" })
  @UseSessionGuard()
  async delete(
    @Param(API_ENDPOINTS.AUTOMATION.BY_COMPANY_ID, ValidateIdPipe) company: number,
    @Param(API_ENDPOINTS.AUTOMATION.BY_ID) id: number,
    @CurrentAuth() user: User,
  ): Promise<IHttpResponse<DeleteResult>> {
    await this.companiesService.validateOwnerAndManager(user, company);
    return {
      data: await this.automationService.delete(company, id),
    };
  }
}
